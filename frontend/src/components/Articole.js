import { useState, useEffect } from 'react';
import { get, getQuery, remove } from '../Calls.js';
import { useNavigate } from 'react-router-dom';
import { routeGetArticole, routeGetArticoleFilter, routeGetArticoleSortate, routeExportArticoleFull, routeDeleteArticol } from '../ApiRoutes';

import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Grid, TextField, Button, Paper, Table, TableBody, TableCell, TableRow, TableContainer, TableHead, IconButton } from "@material-ui/core";

export default function TabelArticole() {

    const navigate = useNavigate();

    const [rows, setRows] = useState([]);
    const [needToUpdate, setNeedToUpdate] = useState(false)
    const [filtrare, setFiltrare] = useState({
        ArticolTitlu: "",
        ArticolAbstract: ""
    })


    useEffect(async () => {
        let data = await get(routeGetArticole);
        setRows(data);
    }, [needToUpdate]);
    useEffect(async () => {
        sessionStorage.clear();
    }, [])


    const onChangeFiltrare = e => {
        setFiltrare({ ...filtrare, [e.target.name]: e.target.value });
    }
    const filtrareArticole = async () => {
        let data = await getQuery(routeGetArticoleFilter, filtrare.ArticolTitlu, filtrare.ArticolAbstract);
        setRows(data);
    }
    const goToFormularModificareArticol = (id) => {
        sessionStorage.setItem("putScreen", true);
        sessionStorage.setItem("idArticol", id);
        navigate('/formularArticol');
    }
    const goToFormularAdaugareArticol = () => {
        sessionStorage.setItem("putScreen", "false");
        navigate('/formularArticol');
    }


    const exporta = async () => {
        await get(routeExportArticoleFull);
    }
    const deleteArticol = async (id, index) => {
        await remove(routeDeleteArticol, id);

        rows.splice(index, 1);
        setRows(rows);
        setNeedToUpdate(!needToUpdate);
    }
    const sortare = async () => {
        let data = await get(routeGetArticoleSortate);
        setRows(data);
    }

    const goToFormularAdaugareReferinta = (idArticol) => {
        sessionStorage.setItem("putScreen", "false");
        sessionStorage.setItem("idArticol", idArticol);
        navigate('/formularReferinta');
    }

    const goToTabelReferinte = (idArticol) => {
        sessionStorage.setItem("idArticol", idArticol);
        navigate('/referinte')
    }

    return (
        <div>
            <Grid container spacing={2}
                direction="row"
                justifyContent="space-evenly"
                alignItems="center">

                <Grid container item spacing={1} xs={3}
                    direction="column"
                    justifyContent="center"
                    alignItems="center">

                    <TextField
                        margin="dense"
                        id="ArticolTitlu"
                        name="ArticolTitlu"
                        label="Filtrare dupa titlu"
                        fullWidth
                        value={filtrare.ArticolTitlu}
                        onChange={e => onChangeFiltrare(e)}
                    />
                    <TextField
                        margin="dense"
                        id="ArticolAbstract"
                        name="ArticolAbstract"
                        label="Filtrare dupa rezumat"
                        fullWidth
                        value={filtrare.ArticolAbstract}
                        onChange={e => onChangeFiltrare(e)}
                    />
                    <Button color="primary" variant='contained' onClick={() => filtrareArticole()}>
                        Filtrare
                    </Button>

                </Grid>

                <Grid item xs={2}>
                    <Button color="secondary" variant='contained' startIcon={<AddIcon />} onClick={() => goToFormularAdaugareArticol()}>
                        Adauga articol
                    </Button >
                </Grid>

                <Grid item xs={2}>
                    <Button color="secondary" variant='contained' onClick={() => sortare()}>
                        Sorteaza dupa data
                    </Button >
                </Grid>

                <Grid item xs={2}>
                    <Button color="secondary" variant='contained' onClick={() => exporta()}>
                        Exporta articole
                    </Button >
                </Grid>
            </Grid>

            <br />

            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID Articol</TableCell>
                            <TableCell align="center">Titlu articol</TableCell>
                            <TableCell align="center">Rezumat articol</TableCell>
                            <TableCell align="center">Data articol</TableCell>
                            <TableCell align="center">Referinte</TableCell>
                            <TableCell align="center">Actiuni articol</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow key={row.ArticolId}>
                                <TableCell component="th" scope="row">
                                    {row.ArticolId}
                                </TableCell>
                                <TableCell align="center">{row.ArticolTitlu}</TableCell>
                                <TableCell align="center">{row.ArticolAbstract}</TableCell>
                                <TableCell align="center">{row.ArticolData}</TableCell>
                                <TableCell align="center">
                                    <Button color="secondary" variant='contained' startIcon={<AddIcon />} onClick={() => goToFormularAdaugareReferinta(row.ArticolId)}>
                                        Adauga referinta
                                    </Button>
                                    <br /> <br />
                                    <Button color="primary" variant='contained' onClick={() => goToTabelReferinte(row.ArticolId)}>
                                        Vezi referinte
                                    </Button>
                                </TableCell>
                                <TableCell align="center">
                                    <IconButton onClick={() => goToFormularModificareArticol(row.ArticolId)}>
                                        <EditIcon color="primary" />
                                    </IconButton>
                                    <IconButton onClick={() => deleteArticol(row.ArticolId, index)}>
                                        <DeleteIcon color="secondary" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div >
    )
}
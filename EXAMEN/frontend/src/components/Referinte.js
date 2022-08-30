import { useState, useEffect } from 'react';
import { get, remove } from '../Calls.js';
import { useNavigate } from 'react-router-dom';
import { routeGetReferinteByArticol, routeDeleteReferinta } from '../ApiRoutes';

import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Button, Paper, Table, TableBody, TableCell, TableRow, TableContainer, TableHead, IconButton } from "@material-ui/core";

export default function TabelArticole() {

    const navigate = useNavigate();

    const [rows, setRows] = useState([]);
    const [needToUpdate, setNeedToUpdate] = useState(false)

    useEffect(async () => {
        let data = await get(routeGetReferinteByArticol, JSON.parse(sessionStorage.getItem("idArticol")));
        setRows(data);
    }, [needToUpdate]);
    useEffect(async () => {
        sessionStorage.setItem("putScreen", "");
        sessionStorage.setItem("idReferinta", "");
    }, [])

    const goToFormularModificareReferinta = (idRef) => {
        sessionStorage.setItem("putScreen", true);
        sessionStorage.setItem("idReferinta", idRef);
        navigate('/formularReferinta');
    }

    const deleteReferinta = async (idRef, index) => {
        await remove(routeDeleteReferinta, JSON.parse(sessionStorage.getItem("idArticol")), idRef);

        rows.splice(index, 1);
        setRows(rows);
        setNeedToUpdate(!needToUpdate);
    }

    const goToFormularAdaugareReferinta = () => {
        sessionStorage.setItem("putScreen", "false");
        navigate('/formularReferinta');
    }

    return (
        <div>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID Referinta</TableCell>
                            <TableCell align="center">Titlu referinta</TableCell>
                            <TableCell align="center">Data referinta</TableCell>
                            <TableCell align="center">Lista autori referinta</TableCell>
                            <TableCell align="center">Id articol de care apartine</TableCell>
                            <TableCell align="center">Actiuni referinta</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow key={row.ReferintaId}>
                                <TableCell component="th" scope="row">
                                    {row.ReferintaId}
                                </TableCell>
                                <TableCell align="center">{row.ReferintaTitlu}</TableCell>
                                <TableCell align="center">{row.ReferintaData}</TableCell>
                                <TableCell align="center">{row.ReferintaListaAutori}</TableCell>
                                <TableCell align="center">{row.ArticolId}</TableCell>
                                <TableCell align="center">
                                    <IconButton onClick={() => goToFormularModificareReferinta(row.ReferintaId)}>
                                        <EditIcon color="primary" />
                                    </IconButton>
                                    <IconButton onClick={() => deleteReferinta(row.ReferintaId, index)}>
                                        <DeleteIcon color="secondary" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <br />
            <Button color="primary" variant='contained' startIcon={<AddIcon />} onClick={() => goToFormularAdaugareReferinta()}>
                Adauga referinta
            </Button>
            <br />
            <br />
            <Button color="primary" variant='contained' onClick={() => navigate('/')}>
                Inapoi la articole
            </Button>
        </div >
    )
}
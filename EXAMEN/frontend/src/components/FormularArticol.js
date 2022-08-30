import { useState, useEffect } from 'react';
import { get, put, post } from '../Calls.js';
import { useNavigate } from 'react-router-dom';
import { routePostArticol, routeGetArticolById, routePutArticol } from '../ApiRoutes';

import SaveIcon from '@material-ui/icons/Save'
import { Grid, TextField, Button } from '@material-ui/core';

export default function FormularArticol() {

    const navigate = useNavigate();

    const [articol, setArticol] = useState({
        ArticolId: 0,
        ArticolTitlu: "",
        ArticolAbstract: "",
        ArticolData: ""
    })

    const onChangeArticol = e => {
        setArticol({ ...articol, [e.target.name]: e.target.value });
    }

    const saveArticol = async () => {
        if (!JSON.parse(sessionStorage.getItem("putScreen")))
            await post(routePostArticol, articol);
        else
            await put(routePutArticol, articol, articol.ArticolId);

        navigate('/');
    }

    useEffect(async () => {
        if (JSON.parse(sessionStorage.getItem('putScreen'))) {
            let data = await get(routeGetArticolById, JSON.parse(sessionStorage.getItem("idArticol")));
            setArticol(data);
        }
    }, [])

    return (
        <div>
            <Grid container
                spacing={2}
                direction="row"
                justifyContent="flex-start">

                <Grid item xs={2}>
                    <TextField
                        margin="dense"
                        id="ArticolId"
                        name="ArticolId"
                        label="Id-ul articolului"
                        fullWidth
                        disabled={true}
                        value={articol.ArticolId}
                        onChange={e => onChangeArticol(e)} />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        margin="dense"
                        id="ArticolTitlu"
                        name="ArticolTitlu"
                        label="Titlul articolului"
                        fullWidth
                        value={articol.ArticolTitlu}
                        onChange={e => onChangeArticol(e)} />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        margin="dense"
                        id="ArticolAbstract"
                        name="ArticolAbstract"
                        label="Rezumatul articolului"
                        fullWidth
                        value={articol.ArticolAbstract}
                        onChange={e => onChangeArticol(e)} />
                </Grid>
                <Grid item xs={2}>
                    <TextField
                        margin="dense"
                        id="ArticolData"
                        name="ArticolData"
                        label="Data articolului"
                        fullWidth
                        value={articol.ArticolData}
                        onChange={e => onChangeArticol(e)} />
                </Grid>
            </Grid>

            <br />

            <Button color="primary" variant='contained' startIcon={<SaveIcon />} onClick={() => saveArticol()}>
                Save
            </Button>
        </div>
    )
}
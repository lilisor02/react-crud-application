import { useState, useEffect } from 'react';
import { get, put, post } from '../Calls.js';
import { useNavigate } from 'react-router-dom';
import { routePostReferinta, routePutReferinta, routeGetReferintaByArticol } from '../ApiRoutes';

import SaveIcon from '@material-ui/icons/Save'
import { Grid, TextField, Button } from '@material-ui/core';

export default function FormularReferinta() {

    const navigate = useNavigate();

    const [referinta, setReferinta] = useState({
        ReferintaId: 0,
        ReferintaTitlu: "",
        ReferintaData: "",
        ReferintaListaAutori: "",
        ArticolId: JSON.parse(sessionStorage.getItem("idArticol"))
    })

    const onChangeReferinta = e => {
        setReferinta({ ...referinta, [e.target.name]: e.target.value });
    }

    const saveReferinta = async () => {
        if (!JSON.parse(sessionStorage.getItem("putScreen")))
            await post(routePostReferinta, referinta, JSON.parse(sessionStorage.getItem("idArticol")));
        else
            await put(routePutReferinta, referinta, referinta.ArticolId, referinta.ReferintaId);

        navigate('/referinte');
    }

    useEffect(async () => {
        if (JSON.parse(sessionStorage.getItem('putScreen'))) {
            let data = await get(routeGetReferintaByArticol, JSON.parse(sessionStorage.getItem("idArticol")), JSON.parse(sessionStorage.getItem("idReferinta")));
            setReferinta(data);
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
                        id="ReferintaId"
                        name="ReferintaId"
                        label="Id-ul referintei"
                        fullWidth
                        disabled={true}
                        value={referinta.ReferintaId}
                        onChange={e => onChangeReferinta(e)} />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        margin="dense"
                        id="ReferintaTitlu"
                        name="ReferintaTitlu"
                        label="Titlul referintei"
                        fullWidth
                        value={referinta.ReferintaTitlu}
                        onChange={e => onChangeReferinta(e)} />
                </Grid>
                <Grid item xs={2}>
                    <TextField
                        margin="dense"
                        id="ReferintaData"
                        name="ReferintaData"
                        label="Data referintei"
                        fullWidth
                        value={referinta.ReferintaData}
                        onChange={e => onChangeReferinta(e)} />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        margin="dense"
                        id="ReferintaListaAutori"
                        name="ReferintaListaAutori"
                        label="Lista autori referinta"
                        fullWidth
                        value={referinta.ReferintaListaAutori}
                        onChange={e => onChangeReferinta(e)} />
                </Grid>
                <Grid item xs={2}>
                    <TextField
                        margin="dense"
                        id="ArticolId"
                        name="ArticolId"
                        label="Id-ul articolului de care apartine"
                        fullWidth
                        disabled={true}
                        value={referinta.ArticolId}
                        onChange={e => onChangeReferinta(e)} />
                </Grid>
            </Grid>

            <br />

            <Button color="primary" variant='contained' startIcon={<SaveIcon />} onClick={() => saveReferinta()}>
                Save
            </Button>
        </div>
    )
}
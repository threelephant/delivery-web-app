import React, { useState, useEffect } from "react";
import { Typography, Grid, TextField, Button, IconButton } from "@material-ui/core";
import { Close } from '@material-ui/icons';
import { AddressFormState } from './addressFormState';
import addressService from "../../services/user/addresses";

const addAddress = ({ setAddressFormState, getAddressesList }) => {
    const [ newAddress, setNewAddress ] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewAddress(previousItem => ({
            ...previousItem,
            [name]: value
        }));
    }

    const onAddClick = (e) => {
        e.preventDefault();

        addressService
        .addAddress(newAddress)
        .then(res => {
            getAddressesList();
            setAddressFormState(AddressFormState.Closed);
        })
        .catch(err => console.error(err));
    }

    return (
        <div>
            <Grid container justify="space-between">
                <Grid item>
                    <Typography style={{ paddingBottom: 20 }} variant="h3">
                        Добавление адреса
                    </Typography>
                </Grid>
                <Grid item>
                    <IconButton edge="end" aria-label="close" onClick={() => setAddressFormState(AddressFormState.Closed)}>
                        <Close />
                    </IconButton>
                </Grid>
            </Grid>
            <form>
                <Grid container direction="column">
                    <Grid item>
                        <Grid style={{ paddingBottom: 20 }} container>
                            <Grid item xs={6}>
                                <TextField
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    label="Улица"
                                    name="street"
                                    size="small"
                                    type="text"
                                    variant="outlined" />
                            </Grid>
                            <Grid item xs />
                            <Grid item xs={5}>
                                <TextField
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    label="Номер"
                                    name="building"
                                    size="small"
                                    type="text"
                                    variant="outlined" />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item style={{ paddingBottom: 20 }}>
                        <Grid container>
                            <Grid item xs={4}>
                                <TextField
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    label="Квартира"
                                    name="apartment"
                                    size="small"
                                    type="text"
                                    variant="outlined" />
                            </Grid>
                            <Grid item xs />
                            <Grid item xs={4}>
                                <TextField
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    label="Подъезд"
                                    name="entrance"
                                    size="small"
                                    type="text"
                                    variant="outlined" />
                            </Grid>
                            <Grid item xs />
                            <Grid item xs={2}>
                                <TextField
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    label="Этаж"
                                    name="level"
                                    size="small"
                                    type="text"
                                    variant="outlined" />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="primary" onClick={onAddClick}>
                            Добавить адрес
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};

export default addAddress;
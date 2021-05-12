import React, { useState, useEffect } from "react";
import { Typography, Grid, TextField, Button, IconButton } from "@material-ui/core";
import { Close } from '@material-ui/icons';
import { AddressFormState } from './addressFormState';
import { Address } from './addressInterface';

interface AddressItemProps {
    address: Address,
    setAddressFormState: any,
}

const changeAddress: React.FC<AddressItemProps> = ({ address, setAddressFormState }) => {
    return (
        <div>
            <Grid container justify="space-between">
                <Grid item>
                    <Typography style={{ paddingBottom: 20 }} variant="h3">
                        Изменение адреса
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
                                    // onChange={handleChange}
                                    value={address.street}
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
                                    // onChange={handsleChange}
                                    value={address.building}
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
                                    // onChange={handleChange}
                                    value={address.apartment}
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
                                    // onChange={handleChange}
                                    value={address.entrance}
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
                                    // onChange={handleChange}
                                    value={address.level}
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
                        <Button variant="contained" color="primary">
                            Добавить адрес
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};

export default changeAddress;
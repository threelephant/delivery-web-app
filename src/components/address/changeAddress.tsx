import React, { useState, useEffect } from "react";
import { Typography, Grid, TextField, Button, IconButton } from "@material-ui/core";
import { Close } from '@material-ui/icons';
import { AddressFormState } from './addressFormState';
import { Address } from './addressInterface';
import addressService from "../../services/user/addresses";

interface AddressItemProps {
    address: Address,
    setAddressFormState: any,
    getAddressesList: any,
}

const changeAddress: React.FC<AddressItemProps> = ({ address, setAddressFormState, getAddressesList }) => {
    const [ changedAddress, setChangedAddress ] = useState<Address>({});

    useEffect(() => {
        setChangedAddress(address);
    }, [address])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setChangedAddress(previousItem => ({
            ...previousItem,
            [name]: value
        }));
    }

    const onChangeClick = (e) => {
        e.preventDefault();

        const addressRequest = Object.keys(changedAddress).filter(key => 
            key !== 'id').reduce((obj, key) => {
                obj[key] = changedAddress[key];
                return obj;
            }, {}
        );
        
        addressService
            .changeAddress(addressRequest, address.id)
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
                                    onChange={handleChange}
                                    value={changedAddress.street}
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
                                    value={changedAddress.building}
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
                                    value={changedAddress.apartment}
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
                                    value={changedAddress.entrance}
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
                                    value={changedAddress.level}
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
                        <Button variant="contained" color="primary" onClick={onChangeClick}>
                            Изменить адрес
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};

export default changeAddress;
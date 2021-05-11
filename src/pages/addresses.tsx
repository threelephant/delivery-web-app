import React, { useState, useEffect } from "react";
import { Container, List, ListItem, ListItemText, Typography, 
    ListItemSecondaryAction, IconButton, Grid, TextField, Button } from "@material-ui/core";
import { Delete } from '@material-ui/icons';
import addressService from '../services/user/addresses'

interface AddressItemProps {
    address: Address,
}

interface Address {
    id?: number,
    locality?: string,
    street?: string,
    building?: string,
    apartment?: string,
    entrance?: string,
    level?: string,
}

const AddressItem: React.FC<AddressItemProps> = ({ address }): JSX.Element => {
    const getAddressString = (address: Address) => {
        return `ул. ${address.street}, д. ${address.building}, кв. ${address.apartment}, п. ${address.entrance}, эт. ${address.level}`;
    }

    return (
        <ListItem button>
            <ListItemText 
                primary={getAddressString(address)} 
            />
            <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete">
                    <Delete />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
}

const NewOrder = () => {
    const [ addresses, setAddresses ] = useState([]);

    useEffect(() => {
        addressService
        .getAddresses()
        .then(res => {
            setAddresses(res);
        })
        .catch(err => console.error(err))
    });

    const generateAddressesList = () => {
        return addresses.map(value => <AddressItem address={value} />)
    }
    
    return (
        <Container>
            <Typography style={{ paddingTop: 20 }} variant="h2">
                Адреса
            </Typography>
            <Grid container justify="space-between">
                <Grid item xs={5}>
                    <List>
                        {generateAddressesList()}
                    </List>
                </Grid>
                <Grid item xs />
                <Grid item xs={6}>
                    <Typography style={{ paddingBottom: 20 }} variant="h3">
                        Добавление адреса
                    </Typography>
                    <form>
                        <Grid container direction="column">
                            <Grid item>
                                <Grid style={{ paddingBottom: 20 }} container>
                                    <Grid item xs={6}>
                                        <TextField
                                            // onChange={handleChange}
                                            fullWidth
                                            required
                                            label="Улица"
                                            name="street"
                                            size="small"
                                            type="text"
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs />
                                    <Grid item xs={5}>
                                        <TextField
                                            // onChange={handsleChange}
                                            fullWidth
                                            required
                                            label="Номер"
                                            name="building"
                                            size="small"
                                            type="text"
                                            variant="outlined"
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item style={{ paddingBottom: 20 }}>
                                <Grid container>
                                    <Grid item xs={4}>
                                        <TextField
                                            // onChange={handleChange}
                                            fullWidth
                                            required
                                            label="Квартира"
                                            name="building"
                                            size="small"
                                            type="text"
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs />
                                    <Grid item xs={4}>
                                        <TextField
                                            // onChange={handleChange}
                                            fullWidth
                                            required
                                            label="Подъезд"
                                            name="entrance"
                                            size="small"
                                            type="text"
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs />
                                    <Grid item xs={2}>
                                        <TextField
                                            // onChange={handleChange}
                                            fullWidth
                                            required
                                            label="Этаж"
                                            name="level"
                                            size="small"
                                            type="text"
                                            variant="outlined"
                                        />
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
                </Grid>
            </Grid>
            <Button variant="contained" color="primary">
                Добавить адрес
            </Button>
        </Container>
    );
}

export default NewOrder;

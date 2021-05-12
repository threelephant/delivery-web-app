import React, { useState, useEffect } from "react";
import { Container, List, ListItem, ListItemText, Typography, 
    ListItemSecondaryAction, IconButton, Grid, TextField, Button } from "@material-ui/core";
import { Delete } from '@material-ui/icons';
import addressService from '../services/user/addresses';
import AddAddress from '../components/address/addAddress';
import ChangeAddress from '../components/address/changeAddress';
import { AddressFormState } from '../components/address/addressFormState';
import { Address } from '../components/address/addressInterface';

interface AddressItemProps {
    address: Address,
    chooseAddress: any,
}

const AddressItem: React.FC<AddressItemProps> = ({ address, chooseAddress }): JSX.Element => {
    const getAddressString = (address: Address) => {
        return `ул. ${address.street}, д. ${address.building}, кв. ${address.apartment}, п. ${address.entrance}, эт. ${address.level}`;
    }

    return (
        <ListItem button onClick={() => chooseAddress(address)}>
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
    const [ addressFormState, setAddressFormState ] = useState<AddressFormState>(AddressFormState.Closed);
    const [ chosenAddress, setChosenAddress ] = useState<Address>(null);

    const chooseAddress = (address: Address) => {
        setAddressFormState(AddressFormState.ChangeAddress);
        setChosenAddress(address);
    }


    const getFormState = () => {
        if (addressFormState === AddressFormState.Closed) {
            return (<div></div>);
        } else if (addressFormState === AddressFormState.NewAddress) {
            return (<AddAddress setAddressFormState={setAddressFormState} />);
        } else {
            return (<ChangeAddress address={chosenAddress} setAddressFormState={setAddressFormState} />);
        }
    }
    useEffect(() => {
        addressService
        .getAddresses()
        .then(res => {
            setAddresses(res);
        })
        .catch(err => console.error(err))
    }, []);

    const generateAddressesList = () => {
        return addresses.map(value => <AddressItem address={value} chooseAddress={chooseAddress} />)
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
                    {getFormState()}
                </Grid>
            </Grid>
            <Button variant="contained" color="primary" onClick={() => setAddressFormState(AddressFormState.NewAddress)}>
                Добавить адрес
            </Button>
        </Container>
    );
}

export default NewOrder;

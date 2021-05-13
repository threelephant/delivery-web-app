import React, { useState, useEffect } from "react";
import { Container, List, ListItem, ListItemText, Typography, 
    ListItemSecondaryAction, IconButton, Grid, Button, Dialog, 
    DialogTitle, DialogContent, DialogContentText, DialogActions } from "@material-ui/core";
import { Delete } from '@material-ui/icons';
import addressService from '../services/user/addresses';
import AddAddress from '../components/address/addAddress';
import ChangeAddress from '../components/address/changeAddress';
import { AddressFormState } from '../components/address/addressFormState';
import { Address } from '../components/address/addressInterface';

const DialogDelete = ({ open, handleClose, addressString, id, getAddressesList, setAddressFormState }) => {
    const onDelete = () => {
        addressService
            .deleteAddress(id)
            .then(res => {
                setAddressFormState(AddressFormState.Closed);
                getAddressesList();
                handleClose();
            })
            .catch(err => console.error(err));
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"Вы действительно хотите удалить адрес?"}</DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                {addressString}
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button 
                onClick={onDelete} 
                color="primary"
            >
                Да
            </Button>
            <Button 
                onClick={handleClose} 
                color="primary" 
                autoFocus
            >
                Нет
            </Button>
            </DialogActions>
        </Dialog>
    );
}

interface AddressItemProps {
    address: Address,
    chooseAddress: any,
    getAddressesList: any,
    setAddressFormState: any,
}

const AddressItem: React.FC<AddressItemProps> = ({ address, chooseAddress, getAddressesList, setAddressFormState }): JSX.Element => {
    const [ open, setOpen ] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const getAddressString = (address: Address) => {
        return `ул. ${address.street}, д. ${address.building}, кв. ${address.apartment}, п. ${address.entrance}, эт. ${address.level}`;
    }

    return (
        <ListItem key={address.id} button onClick={() => chooseAddress(address)}>
            <ListItemText 
                primary={getAddressString(address)} 
            />
            <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={handleClickOpen}>
                    <Delete />
                </IconButton>
                <DialogDelete 
                    open={open} 
                    handleClose={handleClose} 
                    addressString={getAddressString(address)} 
                    id={address.id} 
                    getAddressesList={getAddressesList}
                    setAddressFormState={setAddressFormState}
                />
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
            return (<AddAddress setAddressFormState={setAddressFormState} getAddressesList={getAddressesList} />);
        } else {
            return (<ChangeAddress address={chosenAddress} setAddressFormState={setAddressFormState} getAddressesList={getAddressesList} />);
        }
    }

    const getAddressesList = () => {
        addressService
            .getAddresses()
            .then(res => {
                setAddresses(res);
            })
            .catch(err => console.error(err));
    }

    useEffect(() => {
        getAddressesList();
    }, []);

    const generateAddressesList = () => {
        return addresses.map(value => <AddressItem 
                                        address={value} 
                                        chooseAddress={chooseAddress} 
                                        getAddressesList={getAddressesList}
                                        setAddressFormState={setAddressFormState} 
                                        />)
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
                    <Button variant="contained" color="primary" onClick={() => setAddressFormState(AddressFormState.NewAddress)}>
                        Добавить адрес
                    </Button>
                </Grid>
                <Grid item xs />
                <Grid item xs={6}>
                    {getFormState()}
                </Grid>
            </Grid>
        </Container>
    );
}

export default NewOrder;

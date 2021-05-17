import React, { useState, useEffect } from 'react';
import { Container, List, ListItem, ListItemText, Typography, 
    ListItemSecondaryAction, Grid, Select, MenuItem, FormControl,
    Button, Dialog, DialogTitle, DialogContent, DialogContentText, 
    DialogActions } from "@material-ui/core";
import { Link } from 'gatsby';
import getUserInfo from "../../services/user/info";
import DialogDeleteAccount from "../../components/settings/dialogDeleteAccount";

interface Address {
    locality?: string,
    street?: string,
    building?: string,
    apartment?: string,
    entrance?: string,
    level?: string,
}

interface Name {
    first_name?: string,
    last_name?: string,
    middle_name?: string,
}

interface UserInfo {
    name?: Name,
    phone?: string,
    addresses?: Array<Address>,
}

const AddressItem = ({ address }) => {
    const getAddressString = (address: Address) => {
        return `ул. ${address.street}, д. ${address.building}, кв. ${address.apartment}, п. ${address.entrance}, эт. ${address.level}`;
    }

    return (
        <ListItem key={address.street}>
            <ListItem>
                <ListItemText primary={getAddressString(address)} />
            </ListItem>
        </ListItem>
    );
}

const Settings = () => {
    const [ open, setOpen ] = useState(false);
    const [ userInfo, setUserInfo ] = useState<UserInfo>({
        name: {},
        addresses: [],
    });

    useEffect(() => {
        getUserInfo()
        .then(res => {
            setUserInfo(res);
        })
        .catch(err => console.error(err));  
    }, []);

    const getName = (name: Name) => {
        return `${name.last_name} ${name.first_name} ${name.middle_name}`
    }

    const generateAddressList = () => {
        return userInfo.addresses.map(address => <AddressItem address={address} />)
    }

    return (
        <Container>
            <Typography style={{ paddingTop: 20 }} variant="h2">
                Настройки
            </Typography>
            <Typography variant="h4">
                {getName(userInfo.name)}
            </Typography>
            <Typography variant="subtitle1">
                {userInfo.phone}
            </Typography>
            <Typography style={{ paddingTop: 20 }} variant="h5">
                Адреса
            </Typography>
            <List>
                {generateAddressList()}
            </List>
            <Grid container direction="column" xs={4} style={{ paddingBottom: 20 }}>
                <Grid item>
                    <Button variant="contained" color="primary" fullWidth component={ Link } to="/addresses">
                        Изменить адреса
                    </Button>
                </Grid>
                <Grid item style={{ paddingTop: 15 }}>
                    <Button variant="contained" color="primary" fullWidth component={ Link } to="/settings/profile">
                        Изменить профиль
                    </Button>
                </Grid>
                <Grid item style={{ paddingTop: 15 }}>
                    <Button variant="contained" color="primary" fullWidth component={ Link } to="/settings/password">
                        Изменить пароль
                    </Button>
                </Grid>
                <Grid item style={{ paddingTop: 15 }}>
                    <Button variant="contained" color="secondary" fullWidth onClick={() => setOpen(true)}>
                        Удалить аккаунт
                    </Button>
                    <DialogDeleteAccount open={open} handleClose={() => setOpen(false)} />
                </Grid>
            </Grid>
        </Container>
    );
}

export default Settings;
import React, { useState, useEffect } from "react";
import { Container, Tabs, Tab, List, ListItemText, ListItem,
    Typography, Grid, AppBar, ListItemSecondaryAction,
    Fab } from "@material-ui/core";
import { Add, Remove, Done, Close } from '@material-ui/icons';
import { Link } from 'gatsby';
import TabPanel from "../../components/tabPanel";
import courierServcice from "../../services/admin/actionCourier";
import storeService from "../../services/admin/actionStores";

const CourierItem = ({ courier, getCouriers }) => {
    const onAccept = () => {
        courierServcice
            .acceptCourier(courier.login)
            .then(res => {
                getCouriers();
            })
            .catch(err => console.error(err));
    }

    const onDeny = () => {
        courierServcice
            .denyCourier(courier.login)
            .then(res => {
                getCouriers();
            })
            .catch(err => console.error(err));
    }

    return (
        <ListItem>
            <ListItemText
                primary={`${courier.last_name} ${courier.first_name} ${courier.middle_name}`}
                secondary={`Паспорт: ${courier.passport.number}, Дата рождения: ${courier.passport.birth.substr(0, 10)}`}
            />
            <ListItemSecondaryAction>
                <Grid container direction="row" alignItems="center">
                    <Grid item>
                        <Fab size="small" color="primary" aria-label="remove"
                            style={{ marginRight: 6 }}
                            onClick={onAccept}
                        >
                            <Done />
                        </Fab>
                    </Grid>
                    <Grid item>
                        <Fab size="small" color="secondary" aria-label="add" 
                            onClick={onDeny}
                        >
                            <Close />
                        </Fab>
                    </Grid>
                </Grid>
            </ListItemSecondaryAction>
        </ListItem>
    );
}

const StoreItem = ({ store, getStores }) => {
    const onAccept = () => {
        storeService
            .acceptStore(store.id)
            .then(res => {
                getStores();
            })
            .catch(err => console.error(err));
    }

    const onDeny = () => {
        storeService
            .denyStore(store.id)
            .then(res => {
                getStores();
            })
            .catch(err => console.error(err));
    }

    const getAddressString = (address) => {
        return `ул. ${address.street}, д. ${address.building}, кв. ${address.apartment}, п. ${address.entrance}, эт. ${address.level}`;
    }

    return (
        <ListItem button>
            <ListItemText
                primary={`${store.title}`}
                secondary={`Адрес: ${getAddressString(store.address)} Время работы: ${store.working_hours.begin.substr(0, 5)} - ${store.working_hours.end.substr(0, 5)}`}
            />
            <ListItemSecondaryAction>
                <Grid container direction="row" alignItems="center">
                    <Grid item>
                        <Fab size="small" color="primary" aria-label="remove"
                            style={{ marginRight: 6 }}
                            onClick={onAccept}
                        >
                            <Done />
                        </Fab>
                    </Grid>
                    <Grid item>
                        <Fab size="small" color="secondary" aria-label="add" 
                            onClick={onDeny}
                        >
                            <Close />
                        </Fab>
                    </Grid>
                </Grid>
            </ListItemSecondaryAction>
        </ListItem>
    );
}

const Roles = () => {
    const [ value, setValue ] = useState(0);
    const [ couriersCandidate, setCouriersCandidate ] = useState([]);
    const [ storesCandidate, setStoresCandidate ] = useState([]);

    const getCouriers = () => {
        courierServcice
            .getCouriersCandidate()
            .then(res => {
                setCouriersCandidate(res);
            })
            .catch(err => console.error(err));
    }

    const getStores = () => {
        storeService
            .getStoreCandidate()
            .then(res => {
                setStoresCandidate(res);
            })
            .catch(err => console.error(err));
    }

    useEffect(() => {
        getCouriers();
    }, []);

    useEffect(() => {
        getStores();
    }, []);

    return (
        <Container>
            <Typography style={{ paddingTop: 20 }} variant="h2">
                Управление ролями
            </Typography>
            <Grid container>
                <Grid item xs={7}>
                    <AppBar position="static">
                        <Tabs
                            value={value}
                            onChange={(e, num) => setValue(num)}
                        >
                            <Tab label="Курьеры" />
                            <Tab label="Предприятия" />
                        </Tabs>
                    </AppBar>
                    <TabPanel value={value} index={0}>
                        <List>
                            {couriersCandidate.map(courier => <CourierItem courier={courier} getCouriers={getCouriers} />)}
                        </List>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <List>
                            {storesCandidate.map(store => <StoreItem store={store} getStores={getStores} />)}
                        </List>
                    </TabPanel>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Roles;
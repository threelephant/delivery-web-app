import React, { useState, useEffect } from "react";
import { Container, Tabs, Tab, List, ListItemText, ListItem,
    Typography, Grid, AppBar, } from "@material-ui/core";
import getOrders from "../../../services/owner/getOrders";
import getStore from "../../../services/store/store";
import { Link } from 'gatsby';
import TabPanel from "../../../components/tabPanel";

const NewOrdersStatus = () => {
    return [
        "Пользователь подал заказ",
    ];
};

const CurrentOrdersStatus = () => {
    return [
        "Предприятие приняло заказ",
        "Курьер принял заказ",
        "Заказ готов",
    ];
};

const OldOrdersStatus = () => {
    return [
        "Предприятие отказалось от заказа",
        "Курьер взял заказ",
        "Курьер отказался от заказа",
        "Заказ доставлен",
        "Пользователь отказался от заказа",
    ];
};

const OrderItem = ({ order }) => {
    const getSecondaryString = () => {
        if (NewOrdersStatus().includes(order.status)) {
            return `Покупатель: ${order.first_name}`
        } else {
            return `Статус: ${order.status}`;
        }
    }

    return (
        <Link 
            style={{ color: "inherit", textDecoration: "inherit" }} 
            to={`/owner/action/orders/${order.id}`}
        >
            <ListItem button>
                <ListItemText
                    primary={`Заказ от ${order.date_order.substr(0, 16).replace('T', ' ')}`}
                    secondary={`Цена: ${order.sum}, ${getSecondaryString()}`}
                />
            </ListItem>
        </Link>
    );
}

const Orders = ({ store_id }) => {
    const [ value, setValue ] = useState(0);
    const [ store, setStore ] = useState("");
    const [ newOrders, setNewOrders ] = useState([]);
    const [ currentOrders, setCurrentOrders ] = useState([]);
    const [ oldOrders, setOldOrders ] = useState([]);

    useEffect(() => {
        getStore(store_id)
            .then(res => {
                setStore(res);
            })
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        getOrders(store_id)
            .then(res => {
                res.forEach(order => {
                    if (NewOrdersStatus().includes(order.status)) {
                        const tmpOrders = newOrders;
                        if (tmpOrders.filter(orderC => orderC.id === order.id).length === 0) {
                            tmpOrders.push(order);
                            setNewOrders(tmpOrders);
                        }
                    } else if (CurrentOrdersStatus().includes(order.status)) {
                        const tmpOrders = currentOrders;
                        if (tmpOrders.filter(orderC => orderC.id === order.id).length === 0) {
                            tmpOrders.push(order);
                            setCurrentOrders(tmpOrders);
                        }
                    } else {
                        const tmpOrders = oldOrders;
                        if (tmpOrders.filter(orderC => orderC.id === order.id).length === 0) {
                            tmpOrders.push(order);
                            setOldOrders(tmpOrders);
                        }
                    }
                });
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <Container>
            <Typography style={{ paddingTop: 20 }} variant="h2">
                Заказы предприятия
            </Typography>
            <Typography style={{ paddingTop: 20, paddingBottom: 20 }} variant="subtitle1">
                {(store as any).title}
            </Typography>
            <Grid container>
                <Grid item xs={5}>
                    <AppBar position="static">
                        <Tabs
                            value={value}
                            onChange={(e, num) => setValue(num)}
                        >
                            <Tab label="Новые" />
                            <Tab label="Текущие" />
                            <Tab label="Старые" />
                        </Tabs>
                    </AppBar>
                    <TabPanel value={value} index={0}>
                        <List>
                            {newOrders.map(order => <OrderItem order={order} />)}
                        </List>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <List>
                            {currentOrders.map(order => <OrderItem order={order} />)}
                        </List>
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <List>
                            {oldOrders.map(order => <OrderItem order={order} />)}
                        </List>
                    </TabPanel>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Orders;
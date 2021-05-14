import React, { useState, useEffect } from 'react';
import getOrders from '../../services/order';
import { Container, List, ListItem, ListItemText, Typography, 
    ListItemAvatar, Avatar, } from "@material-ui/core";
import { Done, Close, Add, TransferWithinAStation, Fastfood } from '@material-ui/icons';
import { Link } from 'gatsby';

const OrderItem = ({ order }) => {
    const getIcon = () => {
        switch(order.order_status) {
            case "Пользователь подал заказ": return <Add />;
            case "Пользователь отказался от заказа": return <Close />;
            case "Предприятие приняло заказ": return <Fastfood />;
            case "Курьер принял заказ": return <Fastfood />;
            case "Предприятие отказалось от заказа": return <Close />;
            case "Курьер взял заказ": return <TransferWithinAStation />;
            case "Курьер отказался от заказа": return ;
            case "Заказ готов": return <Fastfood />;
            case "Заказ доставлен": return <Done />;
            default: return;
        }
    };

    return (
        <Link 
                style={{ color: "inherit", textDecoration: "inherit" }} 
                to={`/orders/${order.id}`}
            >
            <ListItem 
                key={order.id} 
                button
            >
                <ListItemAvatar>
                    <Avatar>
                        {getIcon()}
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={order.order_status} secondary={order.store_title} />
            </ListItem>
        </Link>
    );
}

const Orders = () => {
    const [ orders, setOrders ] = useState([]);

    useEffect(() => {
        getOrders()
            .then(res => {
                setOrders(res);
            })
            .catch(err => console.error(err));
    }, []);

    const generateOrdersList = () => {
        return orders.map(order => <OrderItem order={order} />)
    }

    return (
        <Container>
            <Typography style={{ paddingTop: 20 }} variant="h2">
                Заказы
            </Typography>
            <List>
                {generateOrdersList()}
            </List>
        </Container>
    );
}

export default Orders;
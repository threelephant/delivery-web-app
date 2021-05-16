import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, List, Button } from "@material-ui/core";
import getOrder from '../../services/order/getOrder';
import OldOrder from '../../components/orders/old';
import CurrentOrder from '../../components/orders/current';
import Product from '../../components/orders/product';

const oldOrderStatus = () => {
    return [
        "Пользователь отказался от заказа",
        "Предприятие отказалось от заказа",
        "Курьер отказался от заказа",
        "Заказ доставлен",
    ];
};

const currentOrderStatus = () => {
    return [
        "Пользователь подал заказ",
        "Предприятие приняло заказ",
        "Курьер принял заказ",
        "Курьер взял заказ",
        "Заказ готов",
    ];
};

const Order = ({ id }) => {
    const [ isCurrent, setIsCurrent ] = useState<boolean>(false);
    const [ order, setOrder ] = useState<any>({});

    useEffect(() => {
        getOrder(id)
            .then(res => {
                setOrder(res);

                if (currentOrderStatus().includes(res.order_status)) {
                    setIsCurrent(true);
                } else {
                    setIsCurrent(false);
                }
            })
            .catch(err => console.error(err));
    }, []);

    const generateProductsList = () => {
        return order.products.map(product => <Product product={product} />);
    }

    return (
        <Container>
            <Typography style={{ paddingTop: 20 }} variant="h2">
                Заказ от {order.date_order}
            </Typography>
            <Typography variant="subtitle1">
                {order.store_title}
            </Typography>
            <Grid container>
                <Grid item xs={5}>
                    {isCurrent ? <CurrentOrder order={order} id={id} /> : <OldOrder order={order} />}
                </Grid>
                <Grid item xs />
                <Grid item xs={6}>
                    <Typography variant="h3">
                        Товары
                    </Typography>
                    <List>
                        {order.products ? generateProductsList() : <div />}
                    </List>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Order;
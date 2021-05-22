import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, List, Button,
    Stepper, Step, StepLabel, StepContent, } from "@material-ui/core";
import getOrder from '../../../../services/order/getOrder';
import orderService from "../../../../services/owner/orderActions";
import Product from '../../../../components/orders/product';
import { navigate } from 'gatsby-link';

const getSteps = () => {
    return [
        "Пользователь подал заказ",
        "Предприятие приняло заказ",
        "Курьер принял заказ",
        "Заказ готов",
        "Курьер взял заказ",
        "Заказ доставлен",
    ];
};

const oldOrderStatus = () => {
    return [
        "Пользователь отказался от заказа",
        "Предприятие отказалось от заказа",
        "Курьер отказался от заказа",
        "Заказ доставлен",
        "Курьер взял заказ",
    ];
};

const notIncludeOwnerStatuses = () => {
    return [
        "Пользователь отказался от заказа",
        "Предприятие отказалось от заказа",
        "Курьер отказался от заказа",
        "Заказ доставлен",
        "Курьер взял заказ",
        "Пользователь подал заказ",
    ];
}

const Order = ({ order_id }) => {
    const steps = getSteps();
    const [ order, setOrder ] = useState<any>({});

    useEffect(() => {
        getOrder(order_id)
            .then(res => {
                setOrder(res);
            })
            .catch(err => console.error(err));
    }, []);

    const getIndex = () => {
        return steps.findIndex(i => i === order.order_status);
    }

    const generateProductsList = () => {
        return order.products.map(product => <Product product={product} />);
    }

    const onAccept = () => {
        orderService
            .acceptOrder(order_id)
            .then(res => {
                navigate(`/owner/orders/${order.store_id}`)
            })
            .catch(err => console.error(err));
    }

    const onReady = () => {
        orderService
            .readyOrder(order_id)
            .then(res => {
                navigate(`/owner/orders/${order.store_id}`)
            })
            .catch(err => console.error(err));
    }

    const onDeny = () => {
        orderService
            .denyOrder(order_id)
            .then(res => {
                navigate(`/owner/orders/${order.store_id}`)
            })
            .catch(err => console.error(err));
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
                    <div>
                        {oldOrderStatus().includes(order.order_status) ? order.order_status : (<Stepper 
                            activeStep={getIndex()} 
                            orientation="vertical"
                        >
                            {steps.map((label, index) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                    <StepContent>
                                        <Typography>Заказ добавлен: {order.date_order}</Typography>
                                    </StepContent>
                                </Step>
                            ))}
                        </Stepper>)}
                        <Grid container justify="space-between">
                            {order.order_status === "Пользователь подал заказ" ? (<Grid item>
                                <Button 
                                    variant="contained" 
                                    color="primary" 
                                    onClick={onAccept}
                                >
                                    Принять заказ
                                </Button>
                            </Grid>) : ""
                            }
                            {order.order_status === "Курьер принял заказ" ? (<Grid item>
                                <Button 
                                    variant="contained" 
                                    color="primary" 
                                    onClick={onReady}
                                >
                                    Заказ готов
                                </Button>
                            </Grid>) : ""}
                            {notIncludeOwnerStatuses().includes(order.order_status) ? "" : (<Grid item>
                                <Button 
                                    variant="contained" 
                                    color="secondary" 
                                    onClick={onDeny}
                                >
                                    Отменить заказ
                                </Button>
                            </Grid>)}
                        </Grid>
                    </div>
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
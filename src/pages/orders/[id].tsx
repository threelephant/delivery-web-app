import React, { useState, useEffect } from 'react';
import { Container, List, ListItem, ListItemText, Typography, 
    ListItemAvatar, Avatar, Stepper, Step, StepLabel, StepContent } from "@material-ui/core";
import getOrder from '../../services/order/getOrder';

const getSteps = () => {
    return [
        "Пользователь подал заказ",
        "Предприятие приняло заказ",
        "Курьер принял заказ",
        "Заказ готов",
        "Курьер взял заказ",
        "Заказ доставлен",
    ];
}

const Order = ({ id }) => {
    const [ order, setOrder ] = useState<any>({});
    const steps = getSteps();

    useEffect(() => {
        getOrder(id)
            .then(res => {
                setOrder(res);
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <Container>
            <Typography style={{ paddingTop: 20 }} variant="h2">
                Заказ от {order.date_order}
            </Typography>
            <Stepper orientation="vertical">
                {steps.map((label, index) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                        <StepContent>
                            <Typography>sadasd</Typography>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
        </Container>
    );
}

export default Order;
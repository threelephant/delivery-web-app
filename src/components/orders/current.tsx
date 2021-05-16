import React from "react";
import { Button, List, ListItem, ListItemText, Typography, 
    ListItemAvatar, Avatar, Stepper, Step, StepLabel, StepContent } from "@material-ui/core";
import denyOrder from '../../services/order/denied';

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

const getAfterTakingSteps = () => {
    return [
        "Курьер взял заказ",
        "Заказ доставлен",
    ];
};

const CurrentOrder = ({ order, id }) => {
    const steps = getSteps();
    const afterTakingSteps = getAfterTakingSteps();

    const isAfterTaking = () => {
        if (afterTakingSteps.includes(order.order_status)) {
            return (<Typography>Заказ взят: {order.date_taking}</Typography>);
        } else {
            return <div />
        }
    }

    const getIndex = () => {
        return steps.findIndex(i => i === order.order_status);
    }    

    const onCancelOrder = () => {
        denyOrder(id)
            .then(res => {
                (window as any).location = "/orders/cancel";     
            })
            .catch(err => console.error(err));
    }

    return (
        <div>
            <Stepper activeStep={getIndex()} orientation="vertical">
                {steps.map((label, index) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                        <StepContent>
                            <Typography>Заказ добавлен: {order.date_order}</Typography>
                            {isAfterTaking()}
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
            <Button variant="contained" color="secondary" onClick={onCancelOrder}>
                Отменить заказ
            </Button>
        </div>
    );
}

export default CurrentOrder;
import React from "react";
import { Container, List, ListItem, ListItemText, Typography, 
    ListItemAvatar, Avatar, Stepper, Step, StepLabel, StepContent } from "@material-ui/core";

const OldOrder = ({ order }) => {
    return (
        <div style={{ paddingTop: 20 }}>
            <Typography>Заказ добавлен: {order.date_order}</Typography>
            {order.date_taking ? <Typography>Заказ взят: {order.date_taking}</Typography>: <div />}
            {order.date_delivery ? <Typography>Заказ доставлен: {order.date_delivery}</Typography> : <div />}
        </div>
    );
}

export default OldOrder;
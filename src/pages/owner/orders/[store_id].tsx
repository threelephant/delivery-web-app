import React, { useState } from "react";
import { Container, TextField, Tabs, Tab,
    Typography, Grid, Button, AppBar } from "@material-ui/core";

const Orders = ({ store_id }) => {
    const [ value, setValue ] = useState(0);

    return (
        <Container>
            <Typography style={{ paddingTop: 20 }} variant="h2">
                Заказы предприятия
            </Typography>
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
        </Container>
    );
}

export default Orders;
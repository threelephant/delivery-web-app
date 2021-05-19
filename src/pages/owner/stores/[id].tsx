import React, { useState, useEffect } from "react";
import { Container, Button, List, ListItem, ListItemText, Typography, 
    ListItemSecondaryAction, Grid, Fab } from "@material-ui/core";
import getOwnerStore from "../../../services/owner/store";
import { Address } from "../../../components/address/addressInterface";
import { Link } from "gatsby";

interface Store {
    id?: number,
    title?: string,
    rating?: number,
    completed_orders?: number,
    address?: Address,
    categories?: Array<string>,
}

const Store = ({ id }) => {
    const [ store, setStore ] = useState<Store>({});

    useEffect(() => {
        getOwnerStore(id)
            .then(res => {
                setStore(res);
            })
            .catch(err => console.error(err));
    }, []);

    const getRatingString = (rating: number) => {
        if (rating === undefined) return '';
        if (rating === null) return '';

        return `${rating} / 5`
    } 

    const getAddressString = (address: Address) => {
        if (address === undefined) return;
        return `ул. ${address.street}, д. ${address.building}`;
    }

    const categoriesString = (categories: Array<string>) => {
        if (categories === undefined) return;
        return categories.join(", ");
    }

    return (
        <Container>
            <Typography style={{ paddingTop: 20 }} variant="h2">
                {store.title}
            </Typography>
            <Typography variant="subtitle1">
                {getRatingString(store.rating)}
            </Typography>
            <Typography variant="body1">
                Всего успешных заказов: {store.completed_orders}
            </Typography>
            <Typography variant="body1">
                Адрес: {getAddressString(store.address)}
            </Typography>
            <Typography variant="body1" style={{ paddingBottom: 20 }}>
                Категории: {categoriesString(store.categories)}
            </Typography>
            <Grid container direction="column" xs={4} style={{ paddingBottom: 20 }}>
                <Grid item>
                    <Button variant="contained" color="primary" fullWidth component={ Link } to="/owner/stores/products/{id}">
                        Товары
                    </Button>
                </Grid>
                <Grid item style={{ paddingTop: 15 }}>
                    <Button variant="contained" color="primary" fullWidth component={ Link } to="/owner/stores/orders">
                        Заказы
                    </Button>
                </Grid>
                <Grid item style={{ paddingTop: 15 }}>
                    <Button variant="contained" color="primary" fullWidth component={ Link } to="/owner/stores/change">
                        Изменить
                    </Button>
                </Grid>
                <Grid item style={{ paddingTop: 15 }}>
                    <Button variant="contained" color="secondary" fullWidth>
                        Удалить
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Store;
import React, { useState, useEffect } from "react";
import { Container, Button, List, ListItem, ListItemText, Typography, 
    ListItemSecondaryAction, Grid, Fab } from "@material-ui/core";
import deleteStore from "../../../services/owner/deleteStore";
import getOwnerStore from "../../../services/owner/store";
import { Address } from "../../../components/address/addressInterface";
import { Link, navigate } from 'gatsby';

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

    const onDelete = () => {
        deleteStore(id)
            .then(res => {
                navigate("/owner/stores");
            })
            .catch(err => console.error(err));
    }

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

    const onClickChange = (e) => {
        e.preventDefault();

        navigate(
            "/owner/action/changestore",
            {
                state: { id }
            }
        );
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
                    <Button variant="contained" color="primary" fullWidth component={ Link } to={`/owner/products/${id}`}>
                        Товары
                    </Button>
                </Grid>
                <Grid item style={{ paddingTop: 15 }}>
                    <Button variant="contained" color="primary" fullWidth component={ Link } to={`/owner/orders/${id}`}>
                        Заказы
                    </Button>
                </Grid>
                <Grid item style={{ paddingTop: 15 }}>
                    <Button variant="contained" onClick={onClickChange} color="primary" fullWidth>
                        Изменить
                    </Button>
                </Grid>
                <Grid item style={{ paddingTop: 15 }}>
                    <Button variant="contained" color="secondary" fullWidth onClick={onDelete}>
                        Удалить
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Store;
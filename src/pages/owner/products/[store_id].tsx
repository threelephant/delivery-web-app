import React, { useState, useEffect } from "react";
import { Container, List, ListItem, ListItemText, Typography, 
    ListItemSecondaryAction, IconButton, Grid, Button, Dialog, 
    DialogTitle, DialogContent, DialogContentText, DialogActions } from "@material-ui/core";
import { Delete } from '@material-ui/icons';
import deleleProduct from "../../../services/owner/deleteProduct";
import getStore from "../../../services/store/store";
import getStoreMenu from "../../../services/store/menu";
import { Link, navigate } from 'gatsby';

const DialogDelete = ({ open, handleClose, product }) => {
    const onDelete = () => {
        deleleProduct(product.id)
        .then(res => {
            handleClose();
            navigate(
                `/owner/products/${product.store_id}`,
                {
                    replace: false,
                },
            );
        })
        .catch(err => console.error(err));
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"Вы действительно хотите удалить этот продукт?"}</DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                {product.title}
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button 
                onClick={onDelete} 
                color="primary"
            >
                Да
            </Button>
            <Button 
                onClick={handleClose} 
                color="primary" 
                autoFocus
            >
                Нет
            </Button>
            </DialogActions>
        </Dialog>
    );
}

const ProductItem = ({ product, getProducts }): JSX.Element => {
    const [ open, setOpen ] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        getProducts();
    };

    return (
        <ListItem key={product.id} button component={ Link } to={`/owner/action/changeproduct/${product.id}`}>
            <ListItemText 
                primary={product.title}
                secondary={`Вес: ${product.weight} г, Цена: ${product.price} р.`}
            />
            <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={handleClickOpen}>
                    <Delete />
                </IconButton>
                <DialogDelete
                    open={open}
                    product={product}
                    handleClose={handleClose}
                />
            </ListItemSecondaryAction>
        </ListItem>
    );
}

const Products = ({ store_id }) => {
    const [ store, setStore ] = useState({
        title: "",
    });
    const [ products, setProducts ] = useState([]);

    const getProducts = () => {
        getStoreMenu(store_id)
        .then(res => {
            const menu = res;
            setProducts(menu);
        })
        .catch(err => console.error(err));  
    }

    useEffect(() => {
        getStore(store_id)
        .then(res => {
            const store = res;
            setStore(store);
        })
        .catch(err => console.error(err));  
    }, []);

    useEffect(() => {
        getProducts();
    }, []);

    const generatProductList = () => {
        return products.map(product => <ProductItem product={product} getProducts={getProducts} />)
    }

    return (
        <Container>
            <Typography style={{ paddingTop: 20 }} variant="h2">
                Список продуктов
            </Typography>
            <Typography variant="subtitle1">
                {store.title}
            </Typography>
            <Grid container justify="space-between">
                <Grid item xs={5}>
                    <List>
                        {generatProductList()}
                    </List>
                    <Button variant="contained" color="primary" component={ Link } to={`/owner/action/addproduct/${store_id}`}>
                        Добавить продукт
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Products;
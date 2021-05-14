import React, { useState, useEffect } from 'react';
import cartService from "../services/user/cart";
import { Container, List, ListItem, ListItemText, Typography, 
    ListItemSecondaryAction, Grid, Fab, Button } from "@material-ui/core";
import { Add, Remove } from '@material-ui/icons';

interface CartItemProps {
    product: CartProduct,
}

interface CartProduct {
    id?: number,
    title?: string,
    price?: number,
    weight?: number,
    count?: number,
    store_title?: string,
}

const CartItem: React.FC<CartItemProps> = ({ product }) => {
    const [ productCount, setProductCount ] = useState<any>(0);

    useEffect(() => {
        cartService
        .getProductCart(product.id)
        .then(res => {
            setProductCount(res.count);
        })
        .catch(err => console.error(err));  
    }, []);

    const onAdd = async (event) => {
        event.preventDefault();

        cartService
            .addProduct(product.id)
            .then(res => {
                setProductCount(res.count);
            })
            .catch(err => {});
    }

    const onRemove = async (event) => {
        event.preventDefault();

        cartService
            .removeProduct(product.id)
            .then(res => {
                setProductCount(res.count);
            })
            .catch(err => {});
    }

    return (
        <ListItem key={product.id}>
            <ListItemText primary={product.title} secondary={`Вес: ${product.weight} г, Цена: ${product.price} р.`} />
            <ListItemSecondaryAction>
                <Grid container direction="column" alignItems="flex-end">
                    <Grid item>
                        <Typography variant="caption">
                            {product.store_title}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Grid container direction="row" alignItems="center">
                            <Grid item>
                                <Fab size="small" color="primary" aria-label="remove" onClick={onRemove}>
                                    <Remove />
                                </Fab>
                            </Grid>
                            <Grid item>
                                <Typography variant="body1">
                                    {productCount}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Fab size="small" color="primary" aria-label="add" onClick={onAdd}>
                                    <Add />
                                </Fab>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </ListItemSecondaryAction>
        </ListItem>
    );
}

const Cart = () => {
    const [ cart, setCart ] = useState<Array<CartProduct>>([])

    useEffect(() => {
        cartService
        .getCart()
        .then(res => {
            setCart(res);
        })
        .catch(err => console.error(err))
    }, []);

    const onClear = async (event) => {
        event.preventDefault();

        cartService
            .clearCart()
            .then(res => {})
            .catch(err => console.error(err));
    }

    const generate = () => {
        const newCart = cart.filter(product => product.count !== 0);
        return newCart.map(value => <CartItem product={value} />)
    }

    return (
        <Container>
            <Typography style={{ paddingTop: 20 }} variant="h2">
                Корзина
            </Typography>
            <List>
                {generate()}
            </List>
            <Grid xs={4} container justify="space-between">
                <Grid item>
                    <Button variant="contained" color="primary">
                        Оформление заказа
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="secondary" onClick={onClear}>
                        Очистить
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Cart;
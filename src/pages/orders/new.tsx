import React, { useEffect, useState } from "react";
import cartService from "../../services/user/cart";
import addressService from "../../services/user/addresses";
import newOrder from "../../services/order/new";
import { Container, List, ListItem, ListItemText, Typography, 
    ListItemSecondaryAction, Grid, Select, MenuItem, FormControl,
    Button } from "@material-ui/core";

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
                                <Typography variant="body1">
                                    {productCount} шт.
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </ListItemSecondaryAction>
        </ListItem>
    );
}

const NewOrder = () => {
    const [ cart, setCart ] = useState<Array<CartProduct>>([]);
    const [ addresses, setAddresses ] = useState([]);
    const [ chosenAddress, setChosenAddress ] = useState(0);

    useEffect(() => {
        cartService
            .getCart()
            .then(res => {
                setCart(res);
            })
            .catch(err => console.error(err))
    }, []);

    useEffect(() => {
        addressService
            .getAddresses()
            .then(res => {
                setAddresses(res);
            })
            .catch(err => console.error(err));
    }, []);

    const onConfirmOrder = (e) => {
        e.preventDefault();

        newOrder(chosenAddress)
            .then(res => {
                cartService
                    .clearCart()
                    .then(res => {
                        (window as any).location = "/";
                    })
            })
            .catch(err => console.error(err));
    }

    const generate = () => {
        const newCart = cart.filter(product => product.count !== 0);
        return newCart.map(value => <CartItem product={value} />)
    }

    const generateAddressItems = () => {
        return addresses.map(value => <MenuItem value={value.id}>{value.street}</MenuItem>)
    }

    return (
        <Container>
            <Typography style={{ paddingTop: 20 }} variant="h2">
                Оформление заказа
            </Typography>
            <Grid container>
                <Grid item xs={5}>
                    <List>
                        {generate()}
                    </List>
                    <Button 
                        variant="contained" 
                        color="primary"
                        disabled={chosenAddress === 0 ? true : false}
                        onClick={onConfirmOrder}
                    >
                        Оформить заказ
                    </Button>
                </Grid>
                <Grid item xs />
                <Grid item xs={6}>
                    <Typography style={{ paddingTop: 20 }} variant="h3">
                        Выбрать адрес
                    </Typography>
                    <form>
                        <FormControl style={{ minWidth: 240, paddingTop: 20 }}>
                            <Select
                                value={chosenAddress}
                                onChange={(e: any) => {setChosenAddress(e.target.value)}}
                            >
                            <MenuItem value={0} disabled>
                                Выбрать адрес
                            </MenuItem>
                                {generateAddressItems()}
                            </Select>
                        </FormControl>
                    </form>
                </Grid>
            </Grid>
        </Container>
    );
}

export default NewOrder;
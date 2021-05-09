import React, { useState, useEffect } from "react";
import { RouteComponentProps } from '@reach/router';
import getStore from "../../services/store/store";
import getStoreMenu from "../../services/store/menu";
import cartService from "../../services/user/cart";
import { Container, List, ListItem, ListItemText, Typography, 
    ListItemSecondaryAction, Grid, Fab } from "@material-ui/core";
import { Add, Remove } from '@material-ui/icons';

const CounterProduct = ({value}) => {
    const [ product, setProduct ] = useState<any>({
        count: 0
    });

    useEffect(() => {
        cartService
        .getProductCart(value.id)
        .then(res => {
            setProduct(res);
        })
        .catch(err => console.error(err));  
    }, []);

    const onAdd = async (event) => {
        event.preventDefault();

        cartService
            .addProduct(value.id)
            .then(res => {
                setProduct(res);
            })
            .catch(err => {});
    }

    const onRemove = async (event) => {
        event.preventDefault();

        cartService
            .removeProduct(value.id)
            .then(res => {
                setProduct(res);
            })
            .catch(err => {});
    }

    return <ListItem key={value.id}>
        <ListItemText
            primary={value.title} />
        <ListItemSecondaryAction>
            <Grid container direction="row" alignItems="center">
                <Grid item>
                    <Fab size="small" color="primary" aria-label="add" onClick={onRemove}>
                        <Remove />
                    </Fab>
                </Grid>
                <Grid item>
                    <Typography variant="body1">
                        {product.count ? product.count : 0}
                    </Typography>
                </Grid>
                <Grid item>
                    <Fab size="small" color="primary" aria-label="remove" onClick={onAdd}>
                        <Add />
                    </Fab>
                </Grid>
            </Grid>
        </ListItemSecondaryAction>
    </ListItem>;
}

interface Props extends RouteComponentProps<{
    id: string
}> {}

interface Store {
    id: number,
    title: string,
}

const Store: React.FC<Props> = ({ id }) => {
    const [store, setStore] = useState<Store>({
        id: null,
        title: '',
    });
    const [menu, setMenu] = useState([]);

    useEffect(() => {
        getStore(id)
        .then(res => {
            const store = res;
            setStore(store);
        })
        .catch(err => console.error(err));  
    }, []);

    useEffect(() => {
        getStoreMenu(id)
        .then(res => {
            const menu = res;
            setMenu(menu);
            console.log(menu);
        })
        .catch(err => console.error(err));  
    }, []);

    useEffect(() => {
        cartService
        .getCart()
        .then(res => {
            console.log(res);
        })
        .catch(err => console.error(err));
    }, []);
    
    const generate = () => {
        return menu.map((value) =>
           <CounterProduct value={value} />
        );
    }

    return (
        <Container>
            <Typography style={{ paddingTop: 20 }} variant="h2">
                {store.title}
            </Typography>
            <Typography variant="subtitle1">
                Магазин
            </Typography>
            <List component="nav">
                {generate()}
            </List>
        </Container>
    );
}

export default Store;
import React, { useEffect, useState } from "react";
import { Container, List, ListItem, ListItemText, Typography, Button, } from "@material-ui/core";
import getOwnerStores from "../../../services/owner/stores";
import { Link } from "gatsby";

const StoreItem = ({ store }) => {
    return (
        <Link 
            style={{ color: "inherit", textDecoration: "inherit" }} 
            to={`/owner/stores/${store.id}`}
            key={store.id}
        >
            <ListItem button>
                <ListItemText primary={store.title} secondary={store.description} />
            </ListItem>
        </Link>
    );
}

const Stores = () => {
    const [ stores, setStores ] = useState([]);

    useEffect(() => {
        getOwnerStores()
            .then(res => {
                setStores(res.data);
            })
            .catch(err => console.error(err));
    }, []);

    const generateList = () => {
        return stores.map(store => <StoreItem store={store} />);
    }

    return (
        <Container>
            <Typography style={{ paddingTop: 20 }} variant="h2">
                Мои предприятия
            </Typography>
            <List>
                {generateList()}
            </List>
            <Button variant="contained" color="primary" component={ Link } to="/owner/stores/addstore">
                Добавить предприятие
            </Button>
        </Container>
    );
}

export default Stores;
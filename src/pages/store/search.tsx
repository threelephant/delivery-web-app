import React, { useEffect, useState } from "react";
import { Container, List, ListItem, ListItemText, Typography, } from "@material-ui/core";
import searchStores from "../../services/store/search";
import { Link } from "gatsby";

const StoreItem = ({ store }) => {
    return (
        <Link 
            style={{ color: "inherit", textDecoration: "inherit" }} 
            to={`/store/${store.id}`}
            key={store.id}
        >
            <ListItem button>
                <ListItemText primary={store.title} secondary={store.description} />
            </ListItem>
        </Link>
    );
}

const Search = ({ location }) => {
    const [ stores, setStores ] = useState([]);

    useEffect(() => {
        searchStores(location.state.search)
            .then(res => {
                setStores(res);
            })
            .catch(err => console.error(err));
    }, []);

    const generateList = () => {
        return stores.map(store => <StoreItem store={store} />);
    }

    return (
        <Container>
            <Typography style={{ paddingTop: 20 }} variant="h2">
                Поиск магазинов
            </Typography>
            <List>
                {generateList()}
            </List>
        </Container>
    );
}

export default Search;
import React, { useState, } from "react";
import { Container, TextField, Typography, Grid, ListItem,
    Button, Chip, List, ListItemText, } from "@material-ui/core";
import { Link } from 'gatsby';
import getStoresByProducts from "../../services/store/storesByProducts";

interface Store {
    store_id?: number,
    store_title?: string,
    count?: number,
}

const StoreItem = ({ store }) => {
    return (
        <Link
            style={{ color: "inherit", textDecoration: "inherit" }} 
            to={`/store/${store.store_id}`}
        >
            <ListItem 
                key={store.store_id} 
                button
            >
                <ListItemText 
                    primary={store.store_title} 
                    secondary={`Найденных совпадений: ${store.count}`} 
                />
            </ListItem>
        </Link>
    );
}

const SearchStoresByProducts = () => {
    const [ newProduct, setNewProduct] = useState("");
    const [ products, setProducts ] = useState([]);
    const [ stores, setStores ] = useState<Array<Store>>([]);

    const onAdd = (e) => {
        e.preventDefault();

        setProducts(chips => chips.concat(newProduct));
        setNewProduct("");
    };

    const onFindStores = (e) => {
        getStoresByProducts(products)
            .then(res => {
                setStores(res);
            })
            .catch(err => console.error(err));
    }

    const handleDelete = (chipToDelete) => () => {
        setProducts(chips => chips.filter(chip => chip !== chipToDelete));
    };

    const generateProductsInput = () => {
        return products.map(product => <Chip label={product} onDelete={handleDelete(product)} />)
    };

    const generateStoresList = () => {
        return stores.map(store => <StoreItem store={store} />)
    };

    return (
        <Container>
            <Typography style={{ paddingTop: 20, paddingBottom: 20, }} variant="h3">
                Поиск магазинов по продуктам
            </Typography>
            <form style={{ paddingTop: 20 }}>
                <Grid container direction="column" xs={4} spacing={2}>
                    <Grid item>
                        <TextField
                            value={newProduct}
                            onChange={(e) => setNewProduct(e.target.value)}
                            fullWidth
                            required
                            label="Название"
                            name="product"
                            size="small"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item>
                        <Button
                            onClick={onAdd}
                            fullWidth 
                            color="primary" 
                            type="submit" 
                            variant="contained"
                        >
                            Добавить продукт
                        </Button>
                    </Grid>
                    <Grid item>
                        {generateProductsInput()}
                    </Grid>
                </Grid>
            </form>
            <Button
                onClick={onFindStores}
                style={{ marginTop: 20 }}
                color="primary" 
                type="submit" 
                variant="contained"
            >
                Найти подходящие магазины
            </Button>
            <Grid container direction="column">
                <Grid item>
                    {stores.length > 0 ? 
                    (
                        <Typography style={{ paddingTop: 40, }} variant="h4">
                            Найденные магазины
                        </Typography>
                    ) : ""}
                </Grid>
                <Grid item>
                    <List>
                        {generateStoresList()}
                    </List>
                </Grid>
            </Grid>
        </Container>
    );
}

export default SearchStoresByProducts;
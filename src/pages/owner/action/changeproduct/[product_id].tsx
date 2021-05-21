import React, { useEffect, useState } from "react";
import { Container, TextField, Typography, Grid, 
    Button, FormControl, Select, MenuItem } from "@material-ui/core";
import changeProduct from "../../../../services/owner/changeProduct";
import getProduct from "../../../../services/store/getProduct";
import categoryServices from "../../../../services/store/categories";
import addressServices from "../../../../services/user/addresses";
import newStore from "../../../../services/owner/newStore";
import Chips from "react-chips";
import { navigate } from 'gatsby';

interface Product {
    title?: string,
    price?: number,
    weight?: number,
}

const ChangeProduct = ({ product_id }) => {
    const [ newProduct, setNewProduct ] = useState<Product>({});
    const [ storeId, setStoreId ] = useState(0);

    useEffect(() => {
        getProduct(product_id)
            .then(res => {
                setStoreId(res["store_id"]);
            })
            .catch(err => console.error(err));
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewProduct(previousItem => ({
            ...previousItem,
            [name]: value
        }));
    }

    const onSubmit = (e) => {
        e.preventDefault();

        changeProduct(product_id, newProduct)
            .then(res => {
                navigate(`/owner/products/${storeId}`);
            })
            .catch(err => console.error(err));
    } 

    return (
        <Container>
            <Typography style={{ paddingTop: 20, paddingBottom: 20, }} variant="h3">
                Изменить предприятие
            </Typography>
            <form style={{ paddingTop: 20 }}>
                <Grid container direction="column" xs={4} spacing={2}>
                    <Grid item>
                        <TextField
                            onChange={handleChange}
                            fullWidth
                            required
                            label="Название"
                            name="title"
                            size="small"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            onChange={handleChange}
                            fullWidth
                            required
                            label="Цена"
                            name="price"
                            size="small"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            onChange={handleChange}
                            fullWidth
                            required
                            label="Вес"
                            name="weight"
                            size="small"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item>
                        <Button
                            onClick={onSubmit}
                            fullWidth 
                            color="primary" 
                            type="submit" 
                            variant="contained"
                        >
                            Изменить
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
}

export default ChangeProduct;
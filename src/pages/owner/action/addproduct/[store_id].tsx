import React, { useEffect, useState } from "react";
import { Container, TextField, Typography, Grid, 
    Button, FormControl, Select, MenuItem } from "@material-ui/core";
import addProduct from "../../../../services/owner/newProduct";
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

const AddProduct = ({ store_id }) => {
    const [ newProduct, setNewProduct ] = useState<Product>({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewProduct(previousItem => ({
            ...previousItem,
            [name]: value
        }));
    }

    const onSubmit = (e) => {
        e.preventDefault();

        addProduct(store_id, newProduct)
            .then(res => {
                navigate(`/owner/products/${store_id}`);
            })
            .catch(err => console.error(err));
    } 

    return (
        <Container>
            <Typography style={{ paddingTop: 20, paddingBottom: 20, }} variant="h3">
                Добавить продукт
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
                            Добавить
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
}

export default AddProduct;
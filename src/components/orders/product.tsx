import React from 'react';
import {List, ListItem, ListItemText, Typography, 
    ListItemSecondaryAction, Grid, Select, MenuItem, FormControl, } from "@material-ui/core";

const Product = ({ product }) => {
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
                                    {product.count} шт.
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </ListItemSecondaryAction>
        </ListItem>
    );
}

export default Product;
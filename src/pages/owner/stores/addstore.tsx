import React, { useEffect, useState } from "react";
import { Container, TextField, Typography, Grid, 
    Button, FormControl, Select, MenuItem } from "@material-ui/core";
import categoryServices from "../../../services/store/categories";
import addressServices from "../../../services/user/addresses";
import newStore from "../../../services/owner/newStore";
import Chips from "react-chips";
import { navigate } from 'gatsby';

interface Store {
    title?: string,
    address_id?: number,
    categories?: Array<string>,
}

const AddStore = () => {
    const [ categories, setCategories ] = useState<Array<string>>([]);
    const [ addresses, setAddresses ] = useState([]);
    const [ chosenAddress, setChosenAddress ] = useState(0);
    const [ categoriesChips, setCategoriesChips ] = useState([]);
    const [ store, setStore ] = useState<Store>({});

    useEffect(() => {
        categoryServices
            .getCategories()
            .then(res => {
                setCategories(res);
            })
            .catch(err => console.error(err))
    }, []);

    useEffect(() => {
        addressServices
            .getAddresses()
            .then(res => {
                setAddresses(res);
            })
            .catch(err => console.error(err))
    }, []);

    const onTitleChange = (e) => {
        const tmpStore = store;
        tmpStore["title"] = e.target.value;
        setStore(tmpStore);
    }

    const generateAddressItems = () => {
        return addresses.map(value => <MenuItem value={value.id}>{value.street}</MenuItem>)
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const tmpStore = store;
        tmpStore.address_id = chosenAddress;
        tmpStore.categories = categoriesChips;

        newStore(tmpStore)
            .then(res => {
                navigate("/owner/stores");
            })
            .catch(err => console.error(err));
        console.log(tmpStore);
    }

    return (
        <Container>
            <Typography style={{ paddingTop: 20, paddingBottom: 20, }} variant="h3">
                Добавить предприятие
            </Typography>
            <form style={{ paddingTop: 20 }}>
                <Grid container direction="column" xs={4} spacing={2}>
                    <Grid item>
                        <TextField
                            onChange={onTitleChange}
                            fullWidth
                            required
                            label="Название"
                            name="last_name"
                            size="small"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item>
                        <FormControl variant="outlined" fullWidth>
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
                    </Grid>
                    <Grid item>
                        <Chips
                            value={categoriesChips}
                            onChange={(chips) => setCategoriesChips(chips)}
                            suggestions={categories}
                            placeholder="Категории"
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

export default AddStore;
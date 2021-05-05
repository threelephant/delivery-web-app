import React, { useState, useEffect } from "react";
import { RouteComponentProps } from '@reach/router';
import getStore from "../../services/store/store";
import getStoreMenu from "../../services/store/menu";
import { Container, List, ListItem, ListItemText, Typography } from "@material-ui/core";

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
    }, [])

    
    useEffect(() => {
        getStoreMenu(id)
        .then(res => {
            const menu = res;
            setMenu(menu);
        })
        .catch(err => console.error(err));  
    }, [])
    
    const generate = () => {
        return menu.map((value) =>
            <ListItem>
                <ListItemText
                    primary={value.title}
                />
            </ListItem>
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
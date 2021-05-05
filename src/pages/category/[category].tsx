import React, { useState, useEffect } from "react";
import { RouteComponentProps } from '@reach/router';
import services from "../../services/store/storesByCategories";
import { Container, List, ListItem, ListItemText, Typography } from "@material-ui/core";
import { Link } from 'gatsby';

interface Props extends RouteComponentProps<{
    category: string
}> {}

const Category: React.FC<Props> = ({ category }) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        services
        .getStoresByCategories(category)
        .then(res => {
            const categories: string[] = res;
            setCategories(categories);
        })
        .catch(err => console.error(err));  
    }, [])
    
    const generate = () => {
        return categories.map((value) =>
            <Link 
                style={{ color: "inherit", textDecoration: "inherit" }} 
                to={`/store/${value.id}`}
            >
                <ListItem button>
                    <ListItemText
                        primary={value.title}
                    />
                </ListItem>
            </Link>
        );
    }

    return (
        <Container>
            <Typography style={{ paddingTop: 20 }} variant="h2">
                {category}
            </Typography>
            <Typography variant="subtitle1">
                Категория
            </Typography>
            <List component="nav">
                {generate()}
            </List>
        </Container>
    );
}

export default Category;
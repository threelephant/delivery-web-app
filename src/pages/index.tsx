import React, { useState, useEffect } from "react";
import services from "../services/store/categories";
import { Container, List, ListItem, ListItemText, Divider, } from "@material-ui/core";
import { Link } from 'gatsby';

function Home() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        services
        .getCategories()
        .then(res => {
            const categories: string[] = res;
            setCategories(categories);
        })
        .catch(err => console.error(err));  
    }, [])

    const generate = () => {
        return categories.map((value: string) =>
            <>
                <Link 
                    style={{ color: "inherit", textDecoration: "inherit" }} 
                    to={`/category/${value}`}
                >
                    <ListItem button>
                        <ListItemText
                            primary={value}
                        />
                    </ListItem>
                </Link>
                <Divider />
            </>
        );
    }

    return (
        <Container>
            <List component="nav">
                {generate()}
            </List>
        </Container>
    );
}

export default Home;
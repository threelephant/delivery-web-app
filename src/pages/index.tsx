import React from "react";
import services from "../services/categories";
import Header from '../components/header';
import { Container, CssBaseline, List, ListItem, ListItemText } from "@material-ui/core";

class Home extends React.Component {
    state = {
        categories: [],
    }

    componentDidMount() {
        services
            .getCategories()
            .then(res => {
                const categories: string[] = res.data;
                this.setState({ categories });
            })
    }

    generate() {
        return this.state.categories.map((value: string) =>
            <ListItem
                button 
                onClick={(event) => console.log('as')}
            >
                <ListItemText
                    primary={value}
                />
            </ListItem>
        );
    }

    render() {
        return (
            <React.Fragment>
                <CssBaseline />
                <Header />
                <Container>
                    <List component="nav">
                        {this.generate()}
                    </List>
                </Container>
            </React.Fragment>
        );
    }
}

export default Home;
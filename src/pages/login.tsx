import React, { useState } from "react";
import login from "../services/auth/login";
import { Container, TextField, 
    Typography, Grid, Button } from "@material-ui/core";
import { useDispatch } from 'react-redux';
import { signIn } from '../actions/auth';


interface Credentials {
    login?: string,
    password?: string,
}

function Login() {
    const dispatch = useDispatch();
    const [credentials, setCredentials] = useState<Credentials>({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials(previousItem => ({
          ...previousItem,
          [name]: value
        }));
      }

    const loggedOn = async (event: React.MouseEvent) => {
        event.preventDefault();

        try {
            const loggedItem = await login(credentials);

            window.sessionStorage.setItem(
                'loggedUser', JSON.stringify(loggedItem)
            );

            window.sessionStorage.setItem(
                'username', loggedItem.username
            );

            (window as any).location = "/";
        } catch (exception) {
            console.error(exception.message);
        }
    }

    return (
        <Container>
            <div>
                <Typography style={{ paddingTop: 20, paddingBottom: 20, }} variant="h3">
                    Войти
                </Typography>
                <form>
                    <Grid container xs={12} md={4}>
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                onChange={handleChange}
                                fullWidth 
                                label="Логин" 
                                name="username" 
                                size="small" 
                                variant="outlined" 
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                onChange={handleChange}
                                fullWidth
                                label="Пароль"
                                name="password"
                                size="small"
                                type="password"
                                variant="outlined"
                            />
                        </Grid>
                        </Grid>
                    </Grid>
                    <Grid item style={{ marginTop: 10 }} xs={12}>
                        <Button
                            onClick={loggedOn}
                            fullWidth 
                            color="primary" 
                            type="submit" 
                            variant="contained"
                        >
                            Войти
                        </Button>
                    </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}

export default Login;
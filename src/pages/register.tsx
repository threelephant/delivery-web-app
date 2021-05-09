import React, { useState } from "react";
import register from "../services/auth/register";
import { Container, TextField, 
    Typography, Grid, Button } from "@material-ui/core";
import { useDispatch } from 'react-redux';
import { signIn } from '../actions/auth';

interface Credentials {
    login?: string,
    password?: string,
    confirmPassword?: string,
    first_name?: string,
    last_name?: string,
    middle_name?: string,
    phone?: string,
}

function Register() {
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
            const loggedItem = await register(credentials);

            window.sessionStorage.setItem(
                'loggedUser', JSON.stringify(loggedItem)
            );

            window.sessionStorage.setItem(
                'username', loggedItem.username
            );

            window.sessionStorage.setItem(
                'token', loggedItem.token
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
                    Регистрация
                </Typography>
                <form>
                    <Grid container xs={12} md={4}>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        onChange={handleChange}
                                        fullWidth 
                                        required
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
                                        required
                                        label="Пароль"
                                        name="password"
                                        size="small"
                                        type="password"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        onChange={handleChange}
                                        fullWidth
                                        required
                                        label="Пароль"
                                        name="confirmPassword"
                                        size="small"
                                        type="password"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        onChange={handleChange}
                                        fullWidth
                                        required
                                        label="Фамилия"
                                        name="last_name"
                                        size="small"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        onChange={handleChange}
                                        fullWidth
                                        required
                                        label="Имя"
                                        name="first_name"
                                        size="small"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        onChange={handleChange}
                                        fullWidth
                                        label="Отчество"
                                        name="middle_name"
                                        size="small"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        onChange={handleChange}
                                        fullWidth
                                        required
                                        label="Телефон"
                                        name="phone"
                                        size="small"
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
                                Зарегистрироваться
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}

export default Register;
import React, { useState } from 'react';
import { Container, List, ListItem, ListItemText, Typography, 
    ListItemSecondaryAction, Grid, Select, MenuItem, FormControl,
    Button, Dialog, DialogTitle, DialogContent, DialogContentText, 
    DialogActions, TextField, } from "@material-ui/core";
import changePassword from "../../services/auth/change";

interface UserPasswordReset {
    username?: string,
    old_password?: string,
    new_password?: string,
    confirm_new_password?: string,
}

const Password = () => {
    const [ credentials, setCredentials ] = useState<UserPasswordReset>({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials(previousItem => ({
          ...previousItem,
          [name]: value
        }));
    }

    const onSubmit = (e) => {
        e.preventDefault();

        credentials["username"] = sessionStorage.getItem('username');

        changePassword(credentials)
            .then(res => {
                (window as any).location = "/settings";
            })
            .catch(err => console.error(err));
    }

    return (
        <Container>
            <Typography style={{ paddingTop: 20 }} variant="h2">
                Настройки
            </Typography>
            <Typography variant="h4">
                Изменение профиля
            </Typography>
            <form style={{ paddingTop: 20 }}>
                <Grid container direction="column" xs={4} spacing={2}>
                    <Grid item>
                        <TextField
                            onChange={handleChange}
                            fullWidth
                            required
                            type="password"
                            label="Старый пароль"
                            name="old_password"
                            size="small"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            onChange={handleChange}
                            fullWidth
                            required
                            type="password"
                            label="Новый пароль"
                            name="new_password"
                            size="small"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            onChange={handleChange}
                            fullWidth
                            required
                            type="password"
                            label="Повторите новый пароль"
                            name="confirm_new_password"
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
                            Изменить пароль
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
}

export default Password;
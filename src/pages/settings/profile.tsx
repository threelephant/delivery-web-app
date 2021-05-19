import React, { useState, } from 'react';
import { Container, List, ListItem, ListItemText, Typography, 
    ListItemSecondaryAction, Grid, Select, MenuItem, FormControl,
    Button, Dialog, DialogTitle, DialogContent, DialogContentText, 
    DialogActions, TextField, } from "@material-ui/core";
import changeUserMainInfo from "../../services/user/change";

interface User {
    first_name?: string,
    last_name?: string,
    middle_name?: string,
    phone?: string,
}

const Profile = () => {
    const [ userInfo, setUserInfo ] = useState<User>({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo(previousItem => ({
          ...previousItem,
          [name]: value
        }));
    }

    const onSubmit = (e) => {
        e.preventDefault();
        changeUserMainInfo(userInfo)
            .then(res => {

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
                            label="Фамилия"
                            name="last_name"
                            size="small"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item>
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
                    <Grid item>
                        <TextField
                            onChange={handleChange}
                            fullWidth
                            label="Отчество"
                            name="middle_name"
                            size="small"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item>
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
                    <Grid item>
                        <Button
                            onClick={onSubmit}
                            fullWidth 
                            color="primary" 
                            type="submit" 
                            variant="contained"
                        >
                            Изменить профиль
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
}

export default Profile;
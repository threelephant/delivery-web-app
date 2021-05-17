import React from 'react';
import { Container, List, ListItem, ListItemText, Typography, 
    ListItemSecondaryAction, Grid, Select, MenuItem, FormControl,
    Button, Dialog, DialogTitle, DialogContent, DialogContentText, 
    DialogActions, TextField, } from "@material-ui/core";

const Password = () => {
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
                            // onChange={handleChange}
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
                            // onChange={handleChange}
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
                            // onChange={handleChange}
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
                            // onClick={loggedOn}
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
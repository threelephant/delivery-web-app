import React, { useState } from "react";
import { Container, TextField, 
    Typography, Grid, Button } from "@material-ui/core";

const AddStore = () => {
    return (
        <Container>
            <Typography style={{ paddingTop: 20, paddingBottom: 20, }} variant="h3">
                Добавить предприятие
            </Typography>
            <form style={{ paddingTop: 20 }}>
                <Grid container direction="column" xs={4} spacing={2}>
                    <Grid item>
                        <TextField
                            // onChange={handleChange}
                            fullWidth
                            required
                            label="Название"
                            name="last_name"
                            size="small"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            // onChange={handleChange}
                            fullWidth
                            required
                            label="Адрес"
                            name="first_name"
                            size="small"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            // onChange={handleChange}
                            fullWidth
                            label="Время начала работы"
                            name="middle_name"
                            size="small"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            // onChange={handleChange}
                            fullWidth
                            required
                            label="Время окончания работы"
                            name="phone"
                            size="small"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item>
                        <Button
                            // onClick={onSubmit}
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
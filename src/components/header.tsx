import React from 'react';
import { Theme, fade, makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Button, InputBase, Typography, Grid } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { Link } from 'gatsby';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../reducers/index';
import { signIn } from '../actions/auth';

const useStyles = makeStyles((theme: Theme) =>
    ({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(1),
        },
        title: {
            flexGrow: 1,
        },
        search: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.white, 0.15),
            '&:hover': {
              backgroundColor: fade(theme.palette.common.white, 0.25),
            },
            marginRight: theme.spacing(2),
            marginLeft: 0,
            width: '100%',
            [theme.breakpoints.up('sm')]: {
              marginLeft: theme.spacing(3),
              width: 'auto',
            },
          },
          searchIcon: {
            padding: theme.spacing(0, 2),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          },
          inputRoot: {
            color: 'inherit',
          },
          inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
              width: '40ch',
            },
          },
    }));

function Header() {
    const classes = useStyles();

    const dispatch = useDispatch();
    const isLogged = useSelector<RootState>(state => state.isLogged);

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Grid container justify="space-between">
                        <Grid item>
                            <Link 
                                to="/"
                                style={{ color: "inherit", textDecoration: "inherit" }}
                            >
                                <Typography variant="h6" className={classes.title}>
                                    Доставка
                                </Typography>
                            </Link>
                        </Grid>
                        <Grid item>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <Search />
                            </div>
                                <InputBase
                                    placeholder="Поиск магазинов..."
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                    inputProps={{ 'aria-label': 'search' }}
                                />
                            </div>
                        </Grid>
                        {sessionStorage.getItem("username") != null ? (
                            <Grid item>
                                <Button onClick={() => {sessionStorage.removeItem("username"); sessionStorage.removeItem("loggedUser"); (window as any).location = "/";}} color="inherit">
                                    Выйти
                                </Button>
                            </Grid>)
                            :
                            (
                            <Grid item>
                                <Button component={ Link } to="/register" color="inherit">Регистрация</Button>
                                <Button component={ Link } to="/login" color="inherit">Войти</Button>
                            </Grid>
                            )
                        }
                    </Grid>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Header;
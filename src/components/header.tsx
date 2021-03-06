import React, { useState, useRef } from 'react';
import { Theme, fade, makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Button, InputBase, Typography, Grid, IconButton } from '@material-ui/core';
import { Search, Menu, ShoppingCart, Pageview } from '@material-ui/icons';
import { Link, navigate } from 'gatsby';
import MenuDrawer from './drawer';

const useStyles = makeStyles((theme: Theme) =>
    ({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(1),
        },
        title: {
            display: 'none',
            [theme.breakpoints.up('sm')]: {
                display: 'block',
            },
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

    const [ toggle, setToggle ] = useState(false);
    const [ search, setSearch ] = useState("");

    const onChange = (e) => {
        setSearch(e.target.value);
    }

    const onEnter = (e) => {
        if (e.key === "Enter") {
            navigate(
                "/store/search",
                {
                    state: { search },
                }
            );

            e.target.value = "";
        }
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    {sessionStorage.getItem("username") != null ?  
                        (<div>
                            <IconButton
                                onClick={() => setToggle(true)}
                                edge="start" 
                                color="inherit" 
                                aria-label="menu"
                            >
                                <Menu />
                            </IconButton>
                            <MenuDrawer toggle={toggle} setToggle={setToggle} />
                        </div>) : (<div />)}
                        <Link 
                            to="/"
                            style={{ color: "inherit", textDecoration: "inherit" }}
                        >
                            <Typography variant="h6" className={classes.title}>
                                ????????????????
                            </Typography>
                        </Link>
                    <div className={classes.root}></div>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <Search />
                        </div>
                            <InputBase
                                placeholder="?????????? ??????????????????..."
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                                onChange={onChange}
                                onKeyDown={onEnter}
                            />
                        </div>
                    <div className={classes.root}></div>
                    {sessionStorage.getItem("username") != null ? (
                        <div>
                            <IconButton
                                onClick={() => navigate("/search/stores")}
                                color="inherit" 
                                aria-label="cart"
                            >
                                <Pageview />
                            </IconButton>
                            <IconButton
                                onClick={() => navigate("/cart")}
                                color="inherit" 
                                aria-label="cart"
                            >
                                <ShoppingCart />
                            </IconButton>
                            <Button onClick={() => {sessionStorage.removeItem("username"); sessionStorage.removeItem("loggedUser"); (window as any).location = "/";}} color="inherit">
                                ??????????
                            </Button>
                        </div>)
                        :
                        (
                        <div>
                            <IconButton
                                onClick={() => navigate("/search/stores")}
                                color="inherit" 
                                aria-label="cart"
                            >
                                <Pageview />
                            </IconButton>
                            <Button component={ Link } to="/register" color="inherit">??????????????????????</Button>
                            <Button component={ Link } to="/login" color="inherit">??????????</Button>
                        </div>
                        )
                    }
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Header;
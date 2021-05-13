import React from 'react';
import { Drawer, List, Divider, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import { Shop, ShoppingCart, HomeWork, Settings } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    list: {
      width: 250,
    },
  });

const MenuDrawer = ({ toggle, setToggle }) => {
    const classes = useStyles();

    const listMenu = () => (
        <div>
            <List className={classes.list}>
                <ListItem key="name">
                    <ListItemText primary="Иван" />
                </ListItem>
                <Divider />
                <ListItem button key="orders">
                    <ListItemIcon><Shop /></ListItemIcon>
                    <ListItemText primary="Заказы" />
                </ListItem>
                <ListItem button key="cart" onClick={() => (window as any).location = "/cart"}>
                    <ListItemIcon><ShoppingCart /></ListItemIcon>
                    <ListItemText primary="Корзина" />
                </ListItem>
                <ListItem button key="addresses" onClick={() => (window as any).location = "/addresses"}>
                    <ListItemIcon><HomeWork /></ListItemIcon>
                    <ListItemText primary="Адреса" />
                </ListItem>
                <ListItem button key="settings">
                    <ListItemIcon><Settings /></ListItemIcon>
                    <ListItemText primary="Настройки" />
                </ListItem>
            </List>
        </div>
    );

    return (
        <React.Fragment>
            <Drawer open={toggle} onClose={() => setToggle(false)}>
                {listMenu()}
            </Drawer>
        </React.Fragment>
    )
}

export default MenuDrawer;

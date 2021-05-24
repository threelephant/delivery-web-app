import React, { useEffect, useState } from 'react';
import { Drawer, List, Divider, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import { Shop, ShoppingCart, HomeWork, Settings, Store, Group, } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import getOwnerStores from "../services/owner/stores";
import getIsAdmin from "../services/user/isAdmin";

const useStyles = makeStyles({
    list: {
      width: 250,
    },
  });

const MenuDrawer = ({ toggle, setToggle }) => {
    const classes = useStyles();
    const [ isOwner, setIsOwner ] = useState(false);
    const [ isAdmin, setIsAdmin ] = useState(false);

    useEffect(() => {
        getOwnerStores()
            .then(res => {
               if (res.status === 200) {
                   setIsOwner(true);
               } else {
                   setIsOwner(false);
               }
            })
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        getIsAdmin()
            .then(res => {
                if (res.role === "admin") {
                    setIsAdmin(true);
                } else {
                    setIsAdmin(false);
                }
            })
            .catch(err => console.error(err));
    }, []);

    const listMenu = () => (
        <div>
            <List className={classes.list}>
                <ListItem key="name">
                    <ListItemText primary="Иван" />
                </ListItem>
                <Divider />
                <ListItem button key="orders" onClick={() => (window as any).location = "/orders"}>
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
                {
                    isOwner ? 
                    (<ListItem button key="stores" onClick={() => (window as any).location = "/owner/stores"}>
                        <ListItemIcon><Store /></ListItemIcon>
                        <ListItemText primary="Предприятия" />
                    </ListItem>)
                    :
                    <div />
                }
                {
                    isAdmin ? 
                    (<ListItem button key="roles" onClick={() => (window as any).location = "/admin/roles"}>
                        <ListItemIcon><Group /></ListItemIcon>
                        <ListItemText primary="Управление ролями" />
                    </ListItem>)
                    :
                    <div />
                }
                <ListItem button key="settings" onClick={() => (window as any).location = "/settings"}>
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

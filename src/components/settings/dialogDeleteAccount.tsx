import React from 'react';
import { Container, List, ListItem, ListItemText, Typography, 
    ListItemSecondaryAction, Grid, Select, MenuItem, FormControl,
    Button, Dialog, DialogTitle, DialogContent, DialogContentText, 
    DialogActions } from "@material-ui/core";

const DialogDeleteAccount = ({open, handleClose}) => {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"Вы действительно хотите удалить свой аккаунт?"}</DialogTitle>
            <DialogContent>
            {/* <DialogContentText id="alert-dialog-description">
                {addressString}
            </DialogContentText> */}
            </DialogContent>
            <DialogActions>
            <Button 
                // onClick={onDelete} 
                color="primary"
            >
                Да
            </Button>
            <Button 
                onClick={handleClose} 
                color="primary" 
                autoFocus
            >
                Нет
            </Button>
            </DialogActions>
        </Dialog>
    );
}

export default DialogDeleteAccount;
import React from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@material-ui/core";
import deleteUser from "../../services/user/delete";

const DialogDeleteAccount = ({open, handleClose}) => {
    const onDelete = () => {
        deleteUser()
            .then(res => {
                sessionStorage.clear();
                (window as any).location = "/";
            })
            .catch(err => console.error(err));
    }

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
                onClick={onDelete} 
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
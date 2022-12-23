import React, {useState} from 'react';
import styles from './AddTodo.module.css'
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import { ADD_TODO } from "../Consts/Consts";

function AddTodo({ dispatch }) {
    const [open, setOpen] = useState(false);
    const [nameTodo, setNameTodo] = useState('');
    const handleClose = () => {
        setOpen(false);
        setNameTodo('');
    };
    const handleOpen = () => {
        setOpen(true);
        setNameTodo('');
    };

    const handleChangeName = (event) => {
        const name = event.target.value;
        setNameTodo(name);
    };
    const handleAddTodo = () => {
        dispatch({type: ADD_TODO, action: {id: nameTodo + Math.random(), name: nameTodo}})
        handleClose();
    };

    return (
        <div className={styles.addTodo}>
            <Button variant="contained" onClick={handleOpen}>Добавить</Button>
            <Dialog open={open}>
                <DialogTitle>Добавление TODO</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Название TODO"
                        type="email"
                        fullWidth
                        variant="standard"
                        onChange={handleChangeName}
                        value={nameTodo}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Отмена</Button>
                    <Button onClick={handleAddTodo}>Добавить</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AddTodo;
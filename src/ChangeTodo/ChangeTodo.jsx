import React, {useState} from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    TextField
} from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";

function ChangeTodo({ changeTodoName }) {
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
    const handleChangeTodo = () => {
        changeTodoName(nameTodo)
        handleClose();
    };

    return (
        <>
            <IconButton aria-label="delete" color="primary" onClick={handleOpen}>
                <CreateIcon />
            </IconButton>
            <Dialog open={open}>
                <DialogTitle>Изменение TODO</DialogTitle>
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
                    <Button onClick={handleChangeTodo}>Изменить</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default ChangeTodo;
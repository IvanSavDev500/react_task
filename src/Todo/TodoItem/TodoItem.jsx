import React, {useState, useRef, useEffect} from 'react';
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from './TodoItem.module.css';
import CreateIcon from "@mui/icons-material/Create";
import CloseIcon from '@mui/icons-material/Close';
import { DELETE_TODO, CHANGE_COMPLETED, CHANGE_NAME } from "../../Consts/Consts";

function TodoItem({children, id, complete, dispatch}) {
    const [editable, setEditable] = useState(false);
    const ref = useRef();

    useEffect(() => {
        if (editable && ref.current) {
            ref.current.focus();
        }
    }, [editable]);
    const deleteTodo = (id) => ({type: DELETE_TODO, action: {id}});
    const changeCompletedTodo = (id) => ({type: CHANGE_COMPLETED, action: {id}});
    const changeNameTodo = (id, name) => ({type: CHANGE_NAME, action: {id, name}});

    const handleCompletedTodo = (event) => {
        if (editable) {
            event.preventDefault();
        } else {
            dispatch(changeCompletedTodo(id));
        }
    };

    const handleChangeTodo = () => {
        if (editable) {
            const newName = ref.current.textContent;
            dispatch(changeNameTodo(id, newName));
        }
        setEditable(prevState => !prevState);
    };

    return (
        <li className={styles.item}>
            <input
                className={styles.checkbox}
                id={id}
                type="checkbox"
                onChange={handleCompletedTodo}
            />
            <label
                className={complete ? styles.complete : ''}
                contentEditable={editable}
                ref={ref}
                htmlFor={id}
                onClick={(event) => {
                    if (editable) {
                        event.preventDefault()
                    }
                }
            }>{children}</label>
            <IconButton aria-label="delete" color="primary" onClick={handleChangeTodo}>
                {editable ? <CloseIcon /> : <CreateIcon />}
            </IconButton>
            <IconButton aria-label="delete" color="primary" onClick={() => dispatch(deleteTodo(id))}>
                <DeleteIcon />
            </IconButton>
        </li>
    );
}

export default TodoItem;
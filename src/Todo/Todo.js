import React, { useReducer, useEffect } from 'react';
import AddTodo from "../AddTodo/AddTodo";
import TodoItem from './TodoItem/TodoItem';
import { ADD_TODO, CHANGE_NAME, CHANGE_COMPLETED, DELETE_TODO } from "../Consts/Consts";

import styles from './Todo.module.css';

const getInitialState = () => {
    const todos = localStorage.getItem('todos');
    return todos ? JSON.parse(todos) : [];
}

const reducer = (state, {type, action}) => {
    switch (type) {
        case ADD_TODO:
            return [
                ...state,
                {
                    id: action.name + Math.random(),
                    name: action.name,
                    complete: false,
                }
            ];
        case CHANGE_NAME:
            return state.map((todo) => ({
                ...todo,
                name: action.id === todo.id ? action.name : todo.name
            }))
        case CHANGE_COMPLETED:
            return state.map((todo) => ({
                ...todo,
                complete: action.id === todo.id ? !todo.complete : todo.complete
            }))
        case DELETE_TODO:
            return state.filter((todo) => todo.id !== action.id);
        default:
            return state;
    }
}

function Todo() {
    const [todos, dispatch] = useReducer(reducer, getInitialState());

    const todosCount = todos.reduce((acc, todo) => todo.complete ? acc + 1 : acc, 0);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos]);

    return (
        <div className={styles.todo}>
            <AddTodo dispatch={dispatch} />
            <h2>Список TODO:</h2>
            <ul className={styles.todoList}>
                {todos.map(({ id, name, complete }) =>
                    <TodoItem
                        key={id}
                        id={id}
                        name={name}
                        complete={complete}
                        dispatch={dispatch}
                    >
                        {name}
                    </TodoItem>
                )}
            </ul>
            <h2 className={styles.resultTitle}>{`Выполнено: ${todosCount}`}</h2>
        </div>
    );
}

export default Todo;

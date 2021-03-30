import { useState, useRef } from 'react';
import styles from './TodoList.module.scss';

function TodoItem(props) {
    const [state, setState] = useState({
        ...props.task,
        editMode: false,
    });
    const todoInputRef = useRef();

    function editModeHandler(event) {
        event.preventDefault();

        setState((prevState) => {
            return {
                ...prevState,
                editMode: true,
            };
        });
    }

    function saveTodoHandler(event) {
        const newTaskTitle = todoInputRef.current.value;
        updateTodo({ ...state, title: newTaskTitle});
    }

    function updateTodo(newData) {
        fetch('https://5df94eace9f79e0014b6afab.mockapi.io/api/v1/tasks/' + state.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                createdAt: newData.createdAt,
                done: newData.done,
                id: newData.id,
                isDone: newData.isDone,
                title: newData.title,
            })
        }).then((data) => {
            switch (data.status) {
                case 200:
                    setState({
                        ...newData,
                        editMode: false,
                    });
                    break;
                default:
                    throw new Error("API ERROR HERE"); //LOL
            }
        });
    }

    function toggleDoneHandler(event) {
        event.preventDefault();
        updateTodo({
            ...state,
            isDone: !state.isDone,
        });
    }

    return (
        <li className={state.isDone ? styles.completed : undefined} key={state.id}>
            <button onClick={toggleDoneHandler}>
                <i className='fas fa-check-circle'></i>
            </button>

            {state.editMode ? (
                <input
                    type='text'
                    className={styles['edit-field']}
                    defaultValue={state.title}
                    ref={todoInputRef}
                    required
                />
            ) : (
                <span>{state.title}</span>
            )}

            <div className={styles['actions']}>
                {state.editMode ? (
                    <button className={styles['btn-save']} onClick={saveTodoHandler}>
                        <i className='fas fa-save'></i>
                    </button>
                ) : (
                    <button className={styles['btn-edit']} onClick={editModeHandler}>
                        <i className='fas fa-edit'></i>
                    </button>
                )}
            </div>
        </li>
    );
}

export default TodoItem;

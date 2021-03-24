import { useState, useRef, useEffect } from 'react';
import styles from './TodoList.module.scss';

function TodoItem(props) {
    const { id, title, isDone } = props.task;
    const [editMode, setEditMode] = useState(false);

    function editModeHandler(event) {
        event.preventDefault();

        setEditMode(true);
    }

    function saveTodoHandler(event) {
        
    }

    return (
        <li className={isDone ? styles.completed : undefined} key={id}>
            <button>
                <i className='fas fa-check-circle'></i>
            </button>

            {editMode ? (
                <input
                    type='text'
                    className={styles['edit-field']}
                    value={title}
                    required
                />
            ) : (
                <span>{title}</span>
            )}

            <div className={styles['actions']}>
                <button className={styles['btn-edit']} onClick={editModeHandler}>
                    <i className='fas fa-edit'></i>
                </button>
            </div>
        </li>
    );
}

export default TodoItem;

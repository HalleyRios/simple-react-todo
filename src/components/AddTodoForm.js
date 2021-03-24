import { useRef } from 'react';
import styles from './AddTodoForm.module.scss';

function AddTodoForm(props) {
    const titleInputRef = useRef();

    function submitHandler(event) {
        event.preventDefault();

        const newTodoData = {
            title: titleInputRef.current.value,
            isDone: false,
        };

        props.onAddTodo(newTodoData);
    }

    return (
        <section>
            <label htmlFor='taskTitle'>
                <h3>Add a new Todo:</h3>
            </label>
            <form className={styles['add-todo-form']} onSubmit={submitHandler}>
                <input
                    id='taskTitle'
                    autoComplete='off'
                    type='text'
                    ref={titleInputRef}
                    required
                />
                <button id='btnCreateTask' type='submit'>
                    <i className='fas fa-plus'></i>
                </button>
            </form>
        </section>
    );
}

export default AddTodoForm;

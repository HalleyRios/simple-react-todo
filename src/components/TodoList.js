import TodoItem from './TodoItem';
import styles from './TodoList.module.scss';

function TodoList(props) {
    return (
        <section>
            <h2>Todos:</h2>
            <ul className={styles['todo-list']}>
                {props.tasks.map((task) => {
                    return <TodoItem key={task.id} task={task} />;
                })}
            </ul>
        </section>
    );
}

export default TodoList;

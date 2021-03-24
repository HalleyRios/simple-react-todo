import { createContext, useState } from 'react';

const TodosContext = createContext({
    tasks: [],
    totalTasksCount: 0,
    addTask: (newTask) => {},
    editTask: (task) => {},
    removeTask: (taskId) => {},
    hasTask: (taskId) => {},
});

export function TodosContextProvider(props) {
    const [tasks, setTasks] = useState([]);

    function addTaskHandler(newTask) {
        if (!hasTaskHandler(newTask.id)) {
            setTasks((previousTasks) => {
                return previousTasks.concat(newTask);
            });
        }
    }

    function editTaskHandler(task) {}

    function removeTaskHandler(taskId) {
        if (hasTaskHandler(taskId)) {
            setTasks((previousTasks) => {
                return previousTasks.filter((task) => task.id === taskId);
            });
        }
    }

    function hasTaskHandler(taskId) {
        return tasks.some((task) => task.id === taskId);
    }

    const context = {
        tasks,
        totalTasksCount: tasks.length,
        addTask: addTaskHandler,
        editTask: editTaskHandler,
        removeTask: removeTaskHandler,
        hasTask: hasTaskHandler,
    };

    return <TodosContext.Provider value={context}>{props.children}</TodosContext.Provider>;
}

export default TodosContext;

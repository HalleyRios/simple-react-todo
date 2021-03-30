import { useState, useEffect } from 'react';

import AddTodoForm from './components/AddTodoForm';
import TodoList from './components/TodoList';
import TodoService from "./services/TodoService";

function App() {
    const [appState, setAppState] = useState({
        isLoading: false,
        tasks: [],
    });

    function getContent() {
        return appState.isLoading ? (
            <p>Loading...</p>
        ) : (
            appState.tasks.length ? <TodoList tasks={appState.tasks} /> : <p>Empty State</p>
        );
    }

    function addTodoHandler(newTodo) {
        const todoService = new TodoService();
        todoService.addNewTask(newTodo).then((data) => {
            setAppState((prevState) => {
                return {
                    tasks: prevState.tasks.concat(data),
                    isLoading: false,
                };
            });
        });
    }

    useEffect(() => {
        const todoService = new TodoService();
        setAppState({ isLoading: true });
        todoService.getTasks().then((data) => {
            const tasks = [];
            for (const key in data) {
                if (Object.hasOwnProperty.call(data, key)) {
                    const task = {
                        id: key,
                        ...data[key],
                    };
                    tasks.push(task);
                }
            }

            setAppState({
                isLoading: false,
                tasks,
            });
        });
    }, []);

    return (
        <main>
            <h1>Todo List</h1>
            <AddTodoForm onAddTodo={addTodoHandler} />
            {getContent()}
        </main>
    );
}

export default App;

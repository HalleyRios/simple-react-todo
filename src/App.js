import { useState, useEffect } from 'react';

import AddTodoForm from './components/AddTodoForm';
import TodoList from './components/TodoList';

//https://5df94eace9f79e0014b6afab.mockapi.io/api/v1/tasks

function App() {
    const [appState, setAppState] = useState({
        isLoading: false,
        tasks: [],
    });
    let content = appState.isLoading ? (
        <p>Loading...</p>
    ) : (
        <TodoList tasks={appState.tasks} />
    );

    function addTodoHandler(newTodo) {
        fetch('https://5df94eace9f79e0014b6afab.mockapi.io/api/v1/tasks', {
            method: 'POST',
            body: JSON.stringify(newTodo),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((res) => {
            console.log(res);
        });
    }

    useEffect(() => {
        setAppState({ isLoading: true });
        fetch('https://5df94eace9f79e0014b6afab.mockapi.io/api/v1/tasks')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
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
    }, [setAppState]);

    return (
        <main>
            <h1>Todo List</h1>
            <AddTodoForm onAddTodo={addTodoHandler} />
            {content}
        </main>
    );
}

export default App;

class TodoService {
    static #API_CONFIG = {
        headers: {
            'Content-Type': 'application/json',
        },
        apiUrl: 'https://5df94eace9f79e0014b6afab.mockapi.io/api/v1/tasks',
    };

    addNewTask(newTask) {
        return fetch(TodoService.#API_CONFIG.apiUrl, {
            method: 'POST',
            headers: TodoService.#API_CONFIG.headers,
            body: JSON.stringify(newTask),
        }).then((res) => res.json());
    }

    updateTask(id, newData) {
        return fetch(TodoService.#API_CONFIG.apiUrl + `/${id}`, {
           method: 'PUT',
           headers: TodoService.#API_CONFIG.headers,
           body: JSON.stringify({
               createdAt: newData.createdAt,
               done: newData.done,
               id: newData.id,
               isDone: newData.isDone,
               title: newData.title,
           }),
        });
    }

    getTasks() {
        return fetch(TodoService.#API_CONFIG.apiUrl, {
            method: 'GET',
            headers: TodoService.#API_CONFIG.headers,
        }).then((res) => res.json());
    }
}

export default TodoService;

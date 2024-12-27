function createStorageManager() {
    function saveTodos(todos) {
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function loadTodos() {
        const todos = localStorage.getItem('todos');
        return todos ? JSON.parse(todos) : [];
    }

    function saveLists(lists) {
        localStorage.setItem('lists', JSON.stringify(lists));
    }

    function loadLists() {
        const lists = localStorage.getItem('lists');
        return lists ? JSON.parse(lists) : {
            "All Tasks": [],
            "Today's Tasks": []
        };
    }

    function clearStorage() {
        localStorage.removeItem('todos');
        localStorage.removeItem('lists');
    }
}

export { createStorageManager };
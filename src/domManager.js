function createDomManager(listManager, storageManager) {
    function createHeaderSection() {
        const header = document.createElement('header');
        const title = document.createElement('h1');
        title.textContent = 'ToDo List';
        header.appendChild(title);
        return header;
    }
 
    function createListsSection() {
        const listsSection = document.createElement('section');
        listsSection.id = 'lists-section';
        
        const lists = listManager.getAllLists();
        lists.forEach(listName => {
            const listElement = document.createElement('div');
            listElement.classList.add('list');
            listElement.textContent = listName;
            listElement.addEventListener('click', () => displayTodos(listName));
            listsSection.appendChild(listElement);
        });
        
        const newListButton = document.createElement('button');
        newListButton.textContent = '+ New List';
        newListButton.addEventListener('click', createNewList);
        listsSection.appendChild(newListButton);
        
        return listsSection;
    }
 
    function createTodosSection() {
        const todosSection = document.createElement('section');
        todosSection.id = 'todos-section';
        
        const newTodoButton = document.createElement('button');
        newTodoButton.textContent = '+ New Todo';
        newTodoButton.addEventListener('click', createNewTodo);
        todosSection.appendChild(newTodoButton);
        
        return todosSection;
    }
 
    function displayTodos(listName) {
        const todosSection = document.getElementById('todos-section');
        todosSection.innerHTML = ''; // Clear current todos
        
        const todos = listManager.getListTodos(listName);
        todos.forEach(todo => {
            const todoElement = createTodoElement(todo);
            todosSection.appendChild(todoElement);
        });
    }
 
    function createTodoElement(todo) {
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        todoDiv.classList.add(todo.getPriority());
        
        const title = document.createElement('span');
        title.textContent = todo.getTitle();
        
        const dueDate = document.createElement('span');
        dueDate.textContent = todo.getDueDate().toLocaleDateString();
        
        const expandButton = document.createElement('button');
        expandButton.textContent = 'Details';
        expandButton.addEventListener('click', () => showTodoDetails(todo));
        
        todoDiv.append(title, dueDate, expandButton);
        return todoDiv;
    }
 
    function createNewList() {
        const name = prompt('Enter list name:');
        if (name) {
            listManager.createList(name);
            refreshUI();
            storageManager.saveLists(listManager.getAllLists());
        }
    }
 
    function createNewTodo() {
        // Show modal/form for new todo creation
        // Implementation depends on your UI design
    }
 
    function showTodoDetails(todo) {
        // Show modal with todo details
        // Implementation depends on your UI design
    }
 
    function refreshUI() {
        const main = document.querySelector('main');
        main.innerHTML = '';
        main.appendChild(createListsSection());
        main.appendChild(createTodosSection());
    }
 
    function initialize() {
        const main = document.createElement('main');
        main.appendChild(createHeaderSection());
        main.appendChild(createListsSection());
        main.appendChild(createTodosSection());
        document.body.appendChild(main);
    }
 
    return {
        initialize,
        refreshUI
    };
 }
 
 export { createDomManager };
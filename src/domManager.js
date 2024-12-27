import { createToDo } from "./todoFactory";

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
        const modal = document.createElement('div');
        modal.classList.add('modal');
        
        const form = `
            <form id="new-todo-form">
                <input type="text" id="title" placeholder="Title" required>
                <textarea id="description" placeholder="Description"></textarea>
                <input type="date" id="dueDate" required>
                <select id="priority">
                    <option value="low">Low</option>
                    <option value="middle">Middle</option>
                    <option value="high">High</option>
                </select>
                <textarea id="notes" placeholder="Notes"></textarea>
                <button type="submit">Create</button>
                <button type="button" onclick="this.parentElement.parentElement.remove()">Cancel</button>
            </form>
        `;
        
        modal.innerHTML = form;
        document.body.appendChild(modal);
     
        document.getElementById('new-todo-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const todo = createToDo(
                e.target.title.value,
                e.target.description.value,
                new Date(e.target.dueDate.value),
                e.target.priority.value,
                e.target.notes.value
            );
            listManager.addToList(todo, "All Tasks");
            storageManager.saveTodos(listManager.getListTodos("All Tasks"));
            refreshUI();
            modal.remove();
        });
     }
 
     function showTodoDetails(todo) {
        const modal = document.createElement('div');
        modal.classList.add('modal');
        
        const content = `
            <div class="todo-details">
                <h3>${todo.getTitle()}</h3>
                <p><strong>Description:</strong> ${todo.getDescription()}</p>
                <p><strong>Due Date:</strong> ${todo.getDueDate().toLocaleDateString()}</p>
                <p><strong>Priority:</strong> ${todo.getPriority()}</p>
                <p><strong>Notes:</strong> ${todo.getNotes()}</p>
                <p><strong>Status:</strong> ${todo.isCompleted() ? 'Completed' : 'Pending'}</p>
                <button onclick="this.parentElement.parentElement.remove()">Close</button>
            </div>
        `;
        
        modal.innerHTML = content;
        document.body.appendChild(modal);
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
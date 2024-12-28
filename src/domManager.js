function createDomManager(listManager, storageManager, createToDo) {
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
    
        const listsContainer = document.createElement('div');
        listsContainer.classList.add('lists-container');
    
        // Pinned lists
        const pinnedLists = document.createElement('div');
        pinnedLists.classList.add('pinned-lists');
        ['All Tasks', "Today's Tasks"].forEach(listName => {
            const listElement = createListElement(listName);
            pinnedLists.appendChild(listElement);
        });
    
        // Custom lists
        const customLists = document.createElement('div');
        customLists.classList.add('custom-lists');
        const lists = listManager.getAllLists()
            .filter(name => !['All Tasks', "Today's Tasks"].includes(name));
        lists.forEach(listName => {
            const listElement = createListElement(listName);
            customLists.appendChild(listElement);
        });
    
        listsContainer.appendChild(pinnedLists);
        listsContainer.appendChild(customLists);
        listsSection.appendChild(listsContainer);
    
        const newListButton = document.createElement('button');
        newListButton.textContent = '+ New List';
        newListButton.classList.add('new-list-button');
        newListButton.addEventListener('click', createNewList);
        listsSection.appendChild(newListButton);
    
        return listsSection;
    }

    function createListElement(listName) {
        const listElement = document.createElement('div');
        listElement.classList.add('list');
        listElement.textContent = listName;
        listElement.addEventListener('click', () => {
            document.querySelectorAll('.list').forEach(l => l.classList.remove('active'));
            listElement.classList.add('active');
            displayTodos(listName);
        });
        return listElement;
    }
 
    function createNewTodo() {
        console.log('createNewToDo called');
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
        console.log('Modal created and added to DOM');
     
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
    
    function createTodosSection() {
                
        const todosSection = document.createElement('section');
        todosSection.id = 'todos-section';
        
        const newTodoButton = document.createElement('button');
        newTodoButton.type = 'button';
        newTodoButton.innerHTML = '+ New Task';
        newTodoButton.classList.add('new-todo-button');

        // Add debug logging
        newTodoButton.addEventListener('click', () => {
            console.log('Button clicked');
            createNewTodo();
        });

        const todoList = document.createElement('div');
        todoList.id = 'todo-list';
        
        todosSection.appendChild(newTodoButton);
        todosSection.appendChild(todoList);
        
        return todosSection;
    }
 
    function displayTodos(listName) {
        const todosList = document.getElementById('todo-list');
        todosList.innerHTML = ''; // Clear current todos
        
        const todos = listManager.getListTodos(listName);
        todos.forEach(todo => {
            const todoElement = createTodoElement(todo);
            todosList.appendChild(todoElement);
        });
    }
 
    function createTodoElement(todo) {
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
    
        // Add priority color bar
        const priorityBar = document.createElement('div');
        priorityBar.classList.add('priority-bar', todo.getPriority());
        todoDiv.appendChild(priorityBar);

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
        const header = main.querySelector('header');
        main.innerHTML = '';
        if (header) {
            main.appendChild(header);
        }
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
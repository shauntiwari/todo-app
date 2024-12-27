function createListManager() {
    
    const lists = {
        "All Tasks": [],
        "Today's Tasks": []
    };

    function createList(listName) {
        if (listName in lists) {
            throw new Error("List already exists");
        }
        lists[listName] = [];
    }

    function addToList(todo, listName) {
        if(!lists[listName]) {
            throw new Error("Project does not exist");
        }
        lists[listName].push(todo);
    }

    function removeFromList(todo, listName) {
        if(!lists[listName]) {
            throw new Error("List does not exist");
        }
        lists[listName] = lists[listName].filter(t => t !== todo);
    }

    function getListTodos(listName) {
        if(!lists[listName]) {
            throw new Error("List does not exist");
        }
        return lists[listName];
    }

    function getAllLists() {
        return Object.keys(lists);
    }

    function deleteList(listName) {
        if (listName === "All Tasks" || listName === "Today's Tasks") {
            throw new Error("Cannot delete default lists");
        }
        delete lists[listName];
    }

    return {
        createList,
        addToList,
        removeFromList,
        getListTodos,
        getAllLists,
        deleteList
    }
}

export { createListManager };
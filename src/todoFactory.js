function createToDo(title, description, dueDate, priority, notes) {

    let completed = false;
    
    if (priority = null) {
        priority = "low";
    }
    
    function setTitle(newTitle) {
        title = newTitle;
    }

    function getTitle() {
        return title;
    }

    function setDescription(newDescription) {
        description = newDescription;
    }
    
    function getDescription() {
        return description;
    }

    function setDueDate(newDueDate) {
        dueDate = newDueDate;
    }

    function getDueDate() {
        return dueDate;
    }

    function setPriority(newPriority) {
        priority = newPriority;
    }
    
    function getPriority() {
        return priority;
    }

    function setNotes(newNotes) {
        notes = newNotes;
    }
    
    function getNotes() {
        return notes;
    }

    function isCompleted() {
        return completed;
    }

    function toggleCompleted() {
        completed = !completed;
    }

    return {getTitle,
            setTitle,
            getDescription,
            setDescription,
            getDueDate,
            setDueDate,
            getPriority,
            setPriority,
            getNotes,
            setNotes,
            isCompleted,
            toggleCompleted
    }
}

export { createToDo };
function createToDo(title, description, dueDate, priority, notes) {

    let completed = false;
    let onTodayList = false;
    
    if (priority === null || priority === undefined) {
        priority = "low";
    }

    if (!title || !dueDate) {
        throw new Error("Title and due date are required");
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

    function todayTask() {
        return onTodayList;
    }

    function toggleTodayTask() {
        onTodayList = !onTodayList;
    }

    function toJSON() {
        return {
            title: title,
            description: description,
            dueDate: dueDate,
            priority: priority,
            notes: notes,
            completed: completed
        };
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
            toggleCompleted,
            todayTask,
            toggleTodayTask,
            toJSON
    }
}

export { createToDo };
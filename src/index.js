import "./styles.css";
import { createToDo } from "./todoFactory";
import { createListManager } from "./listManager";
import { createStorageManager } from "./storageManager";
import { createDomManager } from "./domManager";

const todoFactory = createToDo;

const listManager = createListManager();
const storageManager = createStorageManager();
const domManager = createDomManager(listManager, storageManager, todoFactory);

const savedLists = storageManager.loadLists();
const savedTodos = storageManager.loadTodos();

document.addEventListener('DOMContentLoaded', () => {
    domManager.initialize();
})
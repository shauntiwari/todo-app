import "./styles.css";
import { createListManager } from "./listManager";
import { createStorageManager } from "./storageManager";
import { createDomManager } from "./domManager";

const listManager = createListManager();
const storageManager = createStorageManager();
const domManager = createDomManager(listManager, storageManager);

const savedLists = storageManager.loadLists();
const savedTodos = storageManager.loadTodos();

document.addEventListener('DOMContentLoaded', () => {
    domManager.initialize();
})
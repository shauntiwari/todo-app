import "./styles.css";
import { createToDo } from "./todoFactory";
import { createListManager } from "./listManager";
import { createStorageManager } from "./storageManager";

const dueDate1 = new Date();
dueDate1.setDate(dueDate1.getDate() + 7); //set due date for 7 days from today

let todo1 = createToDo("first task","", dueDate1,"","");

console.log(todo1.toJSON()); //test to make sure ToDo object created successfully
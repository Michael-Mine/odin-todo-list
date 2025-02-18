import "./styles.css";
import { lists, tasks, ToDoItem } from "./app-logic";

let activeList;

// function to look for data in localStoarge when app is first loaded
if (localStorage.getItem("lists")) {
    allLists = localStorage.getItem("lists");
    //display lists
} else {
    lists.push("Housework")
    activeList = "Housework";
    displayHeading(activeList);
};

lists.forEach(displayLists);

function displayLists(listName) {
    const listsNav = document.querySelector("#side-bar-lists");
    
    const newList = document.createElement("li");
    listsNav.appendChild(newList);

    const newListButton = document.createElement("button");
    newListButton.textContent = listName;
    newList.appendChild(newListButton);

    newListButton.addEventListener("click", () => {
        activeList = listName;
        displayHeading(listName)
        displayTasks(listName);
        // change button colour
        // iterate through tasks
    })
};

if (localStorage.getItem("tasks")) {
    allLists = localStorage.getItem("tasks");
    //display tasks
};

function displayHeading(listName) {
    const heading = document.querySelector("#list-heading");
    heading.textContent = listName;
}
console.log(tasks)

tasks.forEach(displayTasks);

function displayTasks(item) {
    if (item.list == activeList) {
        const taskList = document.querySelector("#tasks-list");

        const newList = document.createElement("li");
        taskList.appendChild(newList);

        const newContainerDiv = document.createElement("div");
        newContainerDiv.classList.toggle("tasks-container");
        newContainerDiv.textContent = item.title;
        newList.appendChild(newContainerDiv);

        const dueDate = document.createElement("div");
        // titleDiv.classList.toggle("tasks-item");
        dueDate.textContent = "Due: " + item.dueDate;
        newContainerDiv.appendChild(dueDate);

        const doneDiv = document.createElement("div");
        // doneDiv.classList.toggle("tasks-item");
        doneDiv.textContent = item.done;
        newContainerDiv.appendChild(doneDiv);

        const editDiv = document.createElement("div");
        editDiv.textContent = "edit button"
        newContainerDiv.appendChild(editDiv);

        const descriptionDiv = document.createElement("div");
        descriptionDiv.textContent = item.description;
        newContainerDiv.appendChild(descriptionDiv);

        const priorityDiv = document.createElement("div");
        priorityDiv.textContent = "Priority: " + item.priority;
        newContainerDiv.appendChild(priorityDiv);

        const notesDiv = document.createElement("div");
        notesDiv.textContent = "Notes button";
        newContainerDiv.appendChild(notesDiv);

        const removeDiv = document.createElement("div");
        removeDiv.textContent = "remove button"
        newContainerDiv.appendChild(removeDiv);
    }
};

// title        dueDate     done tickbox    edit button
// description  priority    notes button    remove button (confirm)


// add new list function to add new item in array, button

// add button to edit name of list in sidebar?

// add modal or form for new task, display, save all lists to localStorage

// add buttons to edit
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

tasks.forEach(displayTasks);

// display tasks (active task)
function displayTasks(item) {
    

    // heading.textContent = item.list;
    
};

// add new list function to add new item in array, button

// add button to edit name of list in sidebar?

// add modal or form for new task, display, save all lists to localStorage

// add buttons to edit
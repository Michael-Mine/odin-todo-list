import "./styles.css";
import { lists, tasks, ToDoItem } from "./app-logic";

// function to look for data in localStoarge when app is first loaded
if (localStorage.getItem("lists")) {
    allLists = localStorage.getItem("lists");
    //display lists
} else {
    lists.push("Housework1")
    console.log(lists)
};

lists.forEach(displayLists);

function displayLists(name) {
    const listsNav = document.querySelector("#side-bar-lists");
    
    const newList = document.createElement("li");
    listsNav.appendChild(newList);

    const newListButton = document.createElement("button");
    newListButton.textContent = name;

    newList.appendChild(newListButton);
};

if (localStorage.getItem("tasks")) {
    allLists = localStorage.getItem("tasks");
    //display tasks
};

// display lists

// display tasks (active task)

// add new list function to add new item in array, button

// add button to edit name of list in sidebar?

// add modal or form for new task, display, save all lists to localStorage

// add buttons to edit
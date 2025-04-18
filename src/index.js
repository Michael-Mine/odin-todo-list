import "./styles.css";
import listIcon from "./images/clipboard-outline.svg";
import listIconCheck from "./images/clipboard-check-outline.svg";
import noteIcon from "./images/note-outline.svg";
import noteIconEdit from "./images/note-edit-outline.svg";
import noteIconCheck from "./images/note-check-outline.svg";
import noteIconRemove from "./images/note-remove-outline.svg";
import { lists, tasks, checkItemDone, changeDone } from "./app-logic";
import { openNewListDialog, openNewTaskDialog } from "./dom-add";
import { openEditListNameDialog, openEditTaskDialog } from "./dom-edit";
import {
  removeListsDisplay,
  removeTasksDisplay,
  openRemoveListDialog,
  openRemoveTaskDialog,
} from "./dom-remove";
import { getLocalStorageAll } from "./local-storage";
import { formatDistanceToNow } from "date-fns";

let activeList;

export function changeActiveList(newActiveList) {
  activeList = newActiveList;
  localStorage.setItem("activeList", activeList);
}

getLocalStorageAll();

lists.forEach(displayLists);
displayHeading(activeList);
tasks.forEach(displayTasks);

const newListItemButtonOpen = document.querySelector("#new-list-button-open");
const newTaskButtonOpen = document.querySelector("#new-task-button-open");
const editListName = document.querySelector("#edit-list-name-button");
const removeListButton = document.querySelector("#remove-list-button");

newListItemButtonOpen.addEventListener("click", () => {
  openNewListDialog();
});

newTaskButtonOpen.addEventListener("click", () => {
  openNewTaskDialog(activeList);
});

editListName.addEventListener("click", () => {
  openEditListNameDialog(activeList);
});

removeListButton.addEventListener("click", () => {
  openRemoveListDialog(activeList);
});

export function displayLists(listName) {
  const listsNav = document.querySelector("#side-bar-lists");

  const listItem = document.createElement("li");
  listsNav.appendChild(listItem);

  const listItemButton = document.createElement("button");
  listItemButton.classList.toggle("side-bar-list-buttons");
  listItemButton.textContent = listName;
  listItem.appendChild(listItemButton);

  const listIconAdd = document.createElement("img");
  listIconAdd.classList.toggle("icons");
  listIconAdd.src = listIcon;

  const listIconCheckAdd = document.createElement("img");
  listIconCheckAdd.classList.toggle("icons");
  listIconCheckAdd.src = listIconCheck;

  if (tasks.filter((item) => item.list == listName).every(checkItemDone)) {
    listItemButton.appendChild(listIconCheckAdd);
  } else {
    listItemButton.appendChild(listIconAdd);
  }

  listItemButton.addEventListener("click", () => {
    changeActiveList(listName);
    displayHeading(activeList);
    removeTasksDisplay();
    tasks.forEach(displayTasks);
  });
}

export function displayHeading(listName) {
  const heading = document.querySelector("#list-heading");
  heading.textContent = listName;
}

export function displayTasks(task) {
  if (task.list == activeList) {
    const taskList = document.querySelector("#tasks-list");

    const taskListItem = document.createElement("li");
    taskList.appendChild(taskListItem);

    const newContainerDiv = document.createElement("div");
    newContainerDiv.classList.toggle("tasks-container");
    newContainerDiv.textContent = task.title;
    taskListItem.appendChild(newContainerDiv);

    const dueDate = document.createElement("div");
    dueDate.textContent =
      "Due " + formatDistanceToNow(new Date(task.dueDate), { addSuffix: true });
    newContainerDiv.appendChild(dueDate);

    const doneDiv = document.createElement("div");
    newContainerDiv.appendChild(doneDiv);

    const doneButton = document.createElement("button");
    doneButton.classList.toggle("task-buttons");
    doneButton.textContent = task.done;
    doneDiv.appendChild(doneButton);

    const noteIconCheckAdd = document.createElement("img");
    noteIconCheckAdd.classList.toggle("icons");
    noteIconCheckAdd.src = noteIconCheck;
    doneButton.appendChild(noteIconCheckAdd);

    if (task.done == "Done") {
      newContainerDiv.classList.toggle("tasks-container-done");
    }

    doneButton.addEventListener("click", () => {
      changeDone(task);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      removeTasksDisplay();
      removeListsDisplay();
      tasks.forEach(displayTasks);
      lists.forEach(displayLists);
    });

    const removeDiv = document.createElement("div");
    newContainerDiv.appendChild(removeDiv);

    const removeButton = document.createElement("button");
    removeButton.classList.toggle("task-buttons");
    removeButton.textContent = "Remove";
    removeDiv.appendChild(removeButton);

    const noteIconRemoveAdd = document.createElement("img");
    noteIconRemoveAdd.classList.toggle("icons");
    noteIconRemoveAdd.src = noteIconRemove;
    removeButton.appendChild(noteIconRemoveAdd);

    removeButton.addEventListener("click", () => {
      openRemoveTaskDialog(task);
    });

    const descriptionDiv = document.createElement("div");
    descriptionDiv.textContent = task.description;
    newContainerDiv.appendChild(descriptionDiv);

    const priorityDiv = document.createElement("div");
    priorityDiv.textContent = "Priority: " + task.priority;
    newContainerDiv.appendChild(priorityDiv);

    const notesDiv = document.createElement("div");
    newContainerDiv.appendChild(notesDiv);

    const notesButton = document.createElement("button");
    notesButton.classList.toggle("task-buttons");
    notesButton.textContent = "Notes";
    notesDiv.appendChild(notesButton);

    const noteIconAdd = document.createElement("img");
    noteIconAdd.classList.toggle("icons");
    noteIconAdd.src = noteIcon;
    notesButton.appendChild(noteIconAdd);

    notesButton.addEventListener("click", () => {
      openTaskNotes(task);
    });

    const editTaskDiv = document.createElement("div");
    newContainerDiv.appendChild(editTaskDiv);

    const editTaskButton = document.createElement("button");
    editTaskButton.classList.toggle("task-buttons");
    editTaskButton.textContent = "Edit Task";
    editTaskDiv.appendChild(editTaskButton);

    const noteIconEditAdd = document.createElement("img");
    noteIconEditAdd.classList.toggle("icons");
    noteIconEditAdd.src = noteIconEdit;
    editTaskButton.appendChild(noteIconEditAdd);

    editTaskButton.addEventListener("click", () => {
      openEditTaskDialog(task);
    });
  }
}

const notesDialog = document.querySelector("#notes-dialog");
const notesDialogTitle = document.querySelector("#notes-title");
const notesDialogNotes = document.querySelector("#notes-p");
const notesDialogClose = document.querySelector("#notes-button-close");

function openTaskNotes(task) {
  notesDialogTitle.textContent = task.title + " notes:";
  notesDialogNotes.textContent = task.notes;
  notesDialog.show();
}

notesDialogClose.addEventListener("click", () => {
  notesDialogTitle.textContent = "";
  notesDialogNotes.textContent = "";
  notesDialog.close();
});

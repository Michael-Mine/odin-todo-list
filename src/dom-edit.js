import { lists, tasks, changeListNameInLists, changeListNameInTasks, editTask } from "./app-logic";
import { changeActiveList, displayLists, displayTasks, displayHeading } from "./index";
import { removeListsDisplay, removeTasksDisplay } from "./dom-remove";

const editListNameDialog = document.querySelector('#edit-list-name-dialog')
const editListNameDialogText = document.querySelector('#edit-list-name-dialog-text');
const editListNameButtonChange = document.querySelector('#edit-list-name-button-confirm');
const editListNameButtonCancel = document.querySelector('#edit-list-name-button-cancel');
const newNamedList = editListNameDialog.querySelector('input');

let oldActiveList;

export function openEditListNameDialog (activeList) {
    oldActiveList = activeList
    editListNameDialogText.textContent = 'Change ' + activeList + ' to'
    editListNameDialog.showModal();
};

editListNameButtonCancel.addEventListener('click', () => {
    editListNameDialog.close();
})

editListNameButtonChange.addEventListener('click', (event) => {
    event.preventDefault();

    changeListNameInLists(oldActiveList, newNamedList.value);
    changeListNameInTasks(oldActiveList, newNamedList.value);
    localStorage.setItem('lists', JSON.stringify(lists));
    localStorage.setItem('tasks', JSON.stringify(tasks));
    changeActiveList(newNamedList.value);

    removeListsDisplay();
    removeTasksDisplay();

    lists.forEach(displayLists);
    tasks.forEach(displayTasks);
    displayHeading(newNamedList.value);
    
    editListNameDialog.close(newNamedList.value);
});

const editTaskDialog = document.querySelector('#edit-task-dialog');
const editTaskButtonCancel = document.querySelector('#edit-task-button-cancel');
const editTaskButtonConfirm = document.querySelector('#edit-task-button-confirm');

const editTaskTitle = editTaskDialog.querySelector('input[name="edit-task-title"]');
const editTaskDescription = editTaskDialog.querySelector('input[name="edit-task-description"]');
const editTaskDue = editTaskDialog.querySelector('input[name="edit-task-due"]');
const editTaskPriority = editTaskDialog.querySelector('select');
const editTaskNotes = editTaskDialog.querySelector('textarea');

let taskPreEdit;

export function openEditTaskDialog (task) {
    taskPreEdit = task;
    editTaskTitle.value = task.title;
    editTaskDescription.value = task.description;
    editTaskDue.value = task.dueDate;
    editTaskPriority.value = task.priority;
    editTaskNotes.value = task.notes;
    editTaskDialog.showModal();
}

editTaskButtonCancel.addEventListener('click', () => {
    editTaskDialog.close();
});

editTaskButtonConfirm.addEventListener('click', (event) => {
    event.preventDefault();
    console.log(editTaskPriority.value)
    editTask(taskPreEdit, editTaskTitle.value, editTaskDescription.value, editTaskDue.value, editTaskPriority.value, editTaskNotes.value)
    localStorage.setItem('tasks', JSON.stringify(tasks));
    removeTasksDisplay();
    tasks.forEach(displayTasks);
    editTaskDialog.close();
});


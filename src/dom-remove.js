import { lists, tasks, removeList, removeAllListItems, removeItem } from './app-logic'
import { displayLists, displayHeading, displayTasks } from './index';

export function removeListsDisplay () {
    const listsNav = document.querySelector('#side-bar-lists');
    const listsNavKeep = document.querySelectorAll('.list-keep');
    listsNav.replaceChildren(...listsNavKeep);  
};

export function removeTasksDisplay () {
    const taskList = document.querySelector('#tasks-list');
    const taskListKeep = document.querySelectorAll('.tasks-list-keep');
    taskList.replaceChildren(...taskListKeep);  
};

const removeListDialog = document.querySelector('#remove-list-dialog');
const removeListDialogText = document.querySelector('#remove-list-dialog-text');
const removeListDialogCancel = document.querySelector('#remove-list-dialog-button-cancel');
const removeListDialogConfirm = document.querySelector('#remove-list-dialog-button-confirm');

let newActiveList;

export function openRemoveListDialog (activeList) {
    newActiveList = activeList
    removeListDialogText.textContent = 'Are you sure you want to remove ' + activeList + ' and all of it\'s tasks?'
    removeListDialog.showModal();
};

removeListDialogCancel.addEventListener('click', () => {
    removeListDialogText.textContent = '';
    removeListDialog.close();
});

removeListDialogConfirm.addEventListener('click', () => {
    removeList(newActiveList);
    removeAllListItems(newActiveList);
    localStorage.setItem('lists', JSON.stringify(lists));
    localStorage.setItem('tasks', JSON.stringify(tasks));

    removeListsDisplay();
    removeTasksDisplay();
    
    lists.forEach(displayLists);
    displayHeading(newActiveList + ' deleted');
    removeListDialog.close();
});

const removeTaskDialog = document.querySelector('#remove-task-dialog');
const removeTaskDialogText = document.querySelector('#remove-task-dialog-text');
const removeTaskDialogCancel = document.querySelector('#remove-task-dialog-button-cancel');
const removeTaskDialogConfirm = document.querySelector('#remove-task-dialog-button-confirm');

let newTask;

export function openRemoveTaskDialog (task) {
    newTask = task;
    removeTaskDialogText.textContent = 'Are you sure you want to remove ' + task.title + '?'
    removeTaskDialog.showModal();
};

removeTaskDialogCancel.addEventListener('click', () => {
    removeTaskDialogText.textContent = '';
    removeTaskDialog.close();
});

removeTaskDialogConfirm.addEventListener('click', () => {
    removeItem(newTask); 
    localStorage.setItem('tasks', JSON.stringify(tasks));
    removeTasksDisplay();
    tasks.forEach(displayTasks);
    removeTaskDialog.close();
});



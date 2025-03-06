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

export function openRemoveListDialog (activeList) {
    removeListDialogText.textContent = 'Are you sure you want to remove ' + activeList + ' and all of it\'s tasks?'
    removeListDialog.showModal();

    removeListDialogConfirm.addEventListener('click', () => {
        removeList(activeList);
        removeAllListItems(activeList);
        // save lists and tasks to localStorage
        displayHeading(activeList + ' deleted');
        removeTasksDisplay();
        removeListsDisplay();
        lists.forEach(displayLists);
        removeListDialog.close();
    });
};

removeListDialogCancel.addEventListener('click', () => {
    removeListDialogText.textContent = '';
    removeListDialog.close();
});

const removeTaskDialog = document.querySelector('#remove-task-dialog');
const removeTaskDialogText = document.querySelector('#remove-task-dialog-text');
const removeTaskDialogCancel = document.querySelector('#remove-task-dialog-button-cancel');
const removeTaskDialogConfirm = document.querySelector('#remove-task-dialog-button-confirm');

export function openRemoveTaskDialog (task) {
    removeTaskDialogText.textContent = 'Are you sure you want to remove ' + task.title + '?'
    removeTaskDialog.showModal();

    removeTaskDialogConfirm.addEventListener('click', () => {
        removeItem(task); 
        // save tasks to localStorage
        removeTasksDisplay();
        tasks.forEach(displayTasks);
        removeTaskDialog.close();
    })
}

removeTaskDialogCancel.addEventListener('click', () => {
    removeTaskDialogText.textContent = '';
    removeTaskDialog.close();
})
//remove list button



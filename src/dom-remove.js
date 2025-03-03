import { tasks, removeItem } from './app-logic'
import { displayTasks } from './index';

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
const removeListDialogTitle = document.querySelector('#remove-list-dialog-title');
const removeListDialogCancel = document.querySelector('#remove-list-dialog-button-cancel');
const removeListDialogConfirm = document.querySelector('#remove-list-dialog-button-confirm');

export function openRemoveListDialog (activeList) {
    removeListDialogTitle.textContent = 'Are you sure you want to remove: ' + activeList + ' list?'
    removeListDialog.showModal();

    removeListDialogConfirm.addEventListener('click', () => {
        //remove list function
    });
};

removeListDialogCancel.addEventListener('click', () => {
    removeListDialogTitle.textContent = '';
    removeListDialog.close();
});

const removeTaskDialog = document.querySelector('#remove-task-dialog');
const removeTaskDialogTitle = document.querySelector('#remove-task-dialog-title');
const removeTaskDialogCancel = document.querySelector('#remove-task-dialog-button-cancel');
const removeTaskDialogConfirm = document.querySelector('#remove-task-dialog-button-confirm');

export function openRemoveTaskDialog (task) {
    removeTaskDialogTitle.textContent = 'Are you sure you want to remove: ' + task.title + '?'
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
    removeTaskDialogTitle.textContent = '';
    removeTaskDialog.close();
})
//remove list button



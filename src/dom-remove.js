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

const removeDialog = document.querySelector('#remove-dialog');
const removeDialogTitle = document.querySelector('#remove-dialog-title');
const removeDialogCancel = document.querySelector('#remove-dialog-button-cancel');
const removeDialogConfirm = document.querySelector('#remove-dialog-button-confirm');

export function openRemoveDialog (task) {
    removeDialogTitle.textContent = 'Are you sure you want to remove: ' + task.title + '?'
    removeDialog.showModal();

    removeDialogConfirm.addEventListener('click', () => {
        removeItem(task); 
        // save tasks to localStorage
        removeTasksDisplay();
        tasks.forEach(displayTasks);
        removeDialog.close();
    })
}

removeDialogCancel.addEventListener('click', () => {
    removeDialogTitle.textContent = '';
    removeDialog.close();
})

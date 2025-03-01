import { lists } from './app-logic'
import { displayLists, displayHeading, changeActiveList } from './index';
import { removeTasksDisplay } from './dom-remove';

const newListItemDialog = document.querySelector('#new-list-dialog');
const newListItemButtonCancel = document.querySelector('#new-list-button-cancel');
const newListItemButtonAdd = document.querySelector('#new-list-button-add');
const taskListItemName = newListItemDialog.querySelector('input');

export function openNewListDialog () {
    newListItemDialog.showModal();
}
newListItemButtonCancel.addEventListener('click', () => {
    newListItemDialog.close();
});

newListItemButtonAdd.addEventListener('click', (event) => {
    event.preventDefault();
    newListItemDialog.close(taskListItemName.value);

    lists.push(taskListItemName.value);
    changeActiveList(taskListItemName.value);
    // save lists, activeList
    displayLists(taskListItemName.value);
    displayHeading(taskListItemName.value);
    removeTasksDisplay();
});
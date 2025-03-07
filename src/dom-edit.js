import { lists, tasks, changeListNameInLists, changeListNameInTasks } from "./app-logic";
import { changeActiveList, displayLists, displayTasks, displayHeading } from "./index";
import { removeListsDisplay, removeTasksDisplay } from "./dom-remove";

const editListNameDialog = document.querySelector('#edit-list-name-dialog')
const editListNameDialogText = document.querySelector('#edit-list-name-dialog-text');
const editListNameButtonChange = document.querySelector('#edit-list-name-button-change');
const editListNameButtonCancel = document.querySelector('#edit-list-name-button-cancel');
const newNamedList = editListNameDialog.querySelector('input');

let oldActiveList;

export function openEditListDialog (activeList) {
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
    removeListsDisplay();
    lists.forEach(displayLists);

    displayHeading(newNamedList.value);
    changeActiveList(newNamedList.value);

    changeListNameInTasks(oldActiveList, newNamedList.value);
    removeTasksDisplay();
    tasks.forEach(displayTasks);
    
    // save lists, tasks, activelist
    editListNameDialog.close(newNamedList.value);
});


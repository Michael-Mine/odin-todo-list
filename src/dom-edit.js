

const editListNameDialog = document.querySelector('#edit-list-name-dialog')
const editListNameDialogText = document.querySelector('#edit-list-name-dialog-text');
const editListNameButtonChange = document.querySelector('#edit-list-name-button-change');
const editListNameButtonCancel = document.querySelector('#edit-list-name-button-cancel');
const newNamedList = editListNameDialog.querySelector('input');

let newActiveList;

export function openEditListDialog (activeList) {
    newActiveList = activeList
    editListNameDialogText.textContent = 'Change ' + activeList + ' to'
    editListNameDialog.showModal();
};

editListNameButtonCancel.addEventListener('click', () => {
    editListNameDialog.close();
})

editListNameButtonChange.addEventListener('click', (event) => {
    event.preventDefault();
    editListNameDialog.close(newNamedList.value);

    // change list name in lists

    // remove lists
    // display list
    // change list name in tasks
    // remove tasks
    // display tasks
    // change heading
    // save lists, tasks, activelist
})
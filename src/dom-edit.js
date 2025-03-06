

const editListNameDialog = document.querySelector('#edit-list-name-dialog')
const editListNameDialogText = document.querySelector('#edit-list-name-dialog-text');
const editListNameButtonChange = document.querySelector('#edit-list-name-button-change');
const editListNameButtonCancel = document.querySelector('#edit-list-name-button-cancel');
const newNamedList = editListNameDialog.querySelector('input');

export function openEditListDialog (activeList) {
    editListNameDialogText.textContent = 'Change ' + activeList + ' to'
    editListNameDialog.showModal();
};

editListNameButtonCancel.addEventListener('click', () => {
    editListNameDialog.close();
})

editListNameButtonChange.addEventListener('click', (event) => {
    event.preventDefault();

    editListNameDialog.close(newNamedList.value);


})
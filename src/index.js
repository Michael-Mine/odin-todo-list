import './styles.css';
import listIcon from './images/clipboard-outline.svg';
import listIconCheck from './images/clipboard-check-outline.svg';
import noteIcon from './images/note-outline.svg';
import noteIconEdit from './images/note-edit-outline.svg';
import noteIconCheck from './images/note-check-outline.svg';
import noteIconRemove from './images/note-remove-outline.svg';
import { lists, tasks, checkItemDone, changeDone } from './app-logic';
import { openNewListDialog, openNewTaskDialog } from './dom-add';
import { openEditListDialog } from './dom-edit';
import { removeListsDisplay, removeTasksDisplay, openRemoveListDialog, openRemoveTaskDialog } from './dom-remove';

let activeList;

export function changeActiveList (newActiveList) {
    activeList = newActiveList;
}

// function to look for data in localStoarge when app is first loaded
if (localStorage.getItem('lists')) {
    lists = localStorage.getItem('lists');
    activeList = localStorage.getItem('activeList');
    tasks = localStorage.getItem('tasks');
} else {
    lists.push('Housework')
    activeList = 'Housework';
    lists.push('Vac')
};

lists.forEach(displayLists);
displayHeading(activeList);
tasks.forEach(displayTasks);

const newListItemButtonOpen = document.querySelector('#new-list-button-open');
const newTaskButtonOpen = document.querySelector('#new-task-button-open');
const editListName = document.querySelector('#edit-list-name-button');
const removeListButton = document.querySelector('#remove-list-button');

newListItemButtonOpen.addEventListener('click', () => {
    openNewListDialog();
});

newTaskButtonOpen.addEventListener('click', () => {
    openNewTaskDialog(activeList);
});

editListName.addEventListener('click', () => {
    openEditListDialog(activeList);
})

removeListButton.addEventListener('click', () => {
    openRemoveListDialog(activeList);
});

export function displayLists (listName) {
    const listsNav = document.querySelector('#side-bar-lists');
    
    const listItem = document.createElement('li');
    listsNav.appendChild(listItem);

    const listItemButton = document.createElement('button');
    listItemButton.classList.toggle('tasks-buttons-notes');
    listItemButton.textContent = listName;
    listItem.appendChild(listItemButton);

    const listIconAdd = document.createElement('img');
    listIconAdd.src = listIcon;

    const listIconCheckAdd = document.createElement('img');
    listIconCheckAdd.src = listIconCheck;
    
    if (tasks
        .filter((item) => item.list == listName)
        .every(checkItemDone)) {
        listItemButton.appendChild(listIconCheckAdd);
    } else {
        listItemButton.appendChild(listIconAdd);
    }

    listItemButton.addEventListener('click', () => {
        activeList = listName;
        displayHeading(activeList);
        removeTasksDisplay();
        tasks.forEach(displayTasks);
        // change button colour?
    })
};

export function displayHeading (listName) {
    const heading = document.querySelector('#list-heading');
    heading.textContent = listName;
}

export function displayTasks (task) {
    if (task.list == activeList) {
        const taskList = document.querySelector('#tasks-list');

        const taskListItem = document.createElement('li');
        taskList.appendChild(taskListItem);

        const newContainerDiv = document.createElement('div');
        newContainerDiv.classList.toggle('tasks-container');
        newContainerDiv.textContent = task.title;
        taskListItem.appendChild(newContainerDiv);

        const dueDate = document.createElement('div');
        dueDate.textContent = 'Due on: ' + task.dueDate;
        newContainerDiv.appendChild(dueDate);

        const doneDiv = document.createElement('div');
        newContainerDiv.appendChild(doneDiv);

        const doneButton = document.createElement('button');
        doneButton.classList.toggle('tasks-buttons-notes');
        doneButton.textContent = task.done;
        doneDiv.appendChild(doneButton);

        const noteIconCheckAdd = document.createElement('img');
        noteIconCheckAdd.src = noteIconCheck;
        doneButton.appendChild(noteIconCheckAdd);

        if (task.done == "Done") {
            newContainerDiv.classList.toggle('tasks-container-done');
        }

        doneButton.addEventListener('click', () => {
            changeDone(task);
            // save tasks to localStorage
            removeTasksDisplay();
            tasks.forEach(displayTasks);
            removeListsDisplay();
            lists.forEach(displayLists);
        });

        const removeDiv = document.createElement('div');
        newContainerDiv.appendChild(removeDiv);

        const removeButton = document.createElement('button');
        removeButton.classList.toggle('tasks-buttons-notes');
        removeButton.textContent = 'Remove';
        removeDiv.appendChild(removeButton);

        const noteIconRemoveAdd = document.createElement('img');
        noteIconRemoveAdd.src = noteIconRemove;
        removeButton.appendChild(noteIconRemoveAdd);

        removeButton.addEventListener('click', () => {
            openRemoveTaskDialog(task)
        });

        const descriptionDiv = document.createElement('div');
        descriptionDiv.textContent = task.description;
        newContainerDiv.appendChild(descriptionDiv);

        const priorityDiv = document.createElement('div');
        priorityDiv.textContent = 'Priority: ' + task.priority;
        newContainerDiv.appendChild(priorityDiv);

        const notesDiv = document.createElement('div');
        newContainerDiv.appendChild(notesDiv);

        const notesButton = document.createElement('button');
        notesButton.classList.toggle('tasks-buttons-notes');
        notesButton.textContent = 'Notes';
        notesDiv.appendChild(notesButton);

        const noteIconAdd = document.createElement('img');
        noteIconAdd.src = noteIcon;
        notesButton.appendChild(noteIconAdd);

        notesButton.addEventListener('click', () => {
            openTaskNotes(task)
        });

        const editDiv = document.createElement('div');
        newContainerDiv.appendChild(editDiv);

        const editButton = document.createElement('button');
        editButton.classList.toggle('tasks-buttons-notes');
        editButton.textContent = 'Edit';
        editDiv.appendChild(editButton);

        const noteIconEditAdd = document.createElement('img');
        noteIconEditAdd.src = noteIconEdit;
        editButton.appendChild(noteIconEditAdd);

        editButton.addEventListener('click', () => {
            // function to dom-change module?
            console.log('click')
        });
    }
};

const notesDialog = document.querySelector('#notes-dialog');
const notesDialogTitle = document.querySelector('#notes-title');
const notesDialogNotes = document.querySelector('#notes-p');
const notesDialogClose = document.querySelector('#notes-button-close');

function openTaskNotes (task) {
    notesDialogTitle.textContent = task.title + ' notes:';
    notesDialogNotes.textContent = task.notes;
    notesDialog.show();
}

notesDialogClose.addEventListener('click', () => {
    notesDialogTitle.textContent = "";
    notesDialogNotes.textContent = "";
    notesDialog.close();
});

// add edit list name button function
// add edit task button function

// add npm date-fns
// add localStorage

// left colour border for priority 
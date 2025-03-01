import './styles.css';
import listIcon from './images/clipboard-outline.svg';
import listIconCheck from './images/clipboard-check-outline.svg';
import noteIcon from './images/note-outline.svg';
import noteIconEdit from './images/note-edit-outline.svg';
import noteIconCheck from './images/note-check-outline.svg';
import noteIconRemove from './images/note-remove-outline.svg';
import { lists, tasks, createTask, addTask, checkItemDone, changeDone } from './app-logic';
import { openNewListDialog } from './dom-add';
import { removeListsDisplay, openRemoveDialog, removeTasksDisplay } from './dom-remove';

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
};

lists.forEach(displayLists);
displayHeading(activeList);
tasks.forEach(displayTasks);

const newListItemButtonOpen = document.querySelector('#new-list-button-open');

newListItemButtonOpen.addEventListener('click', () => {
    openNewListDialog();
    console.log('click');
    
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
        .filter((item) => item.list == activeList)
        .every(checkItemDone)) {
        listItemButton.appendChild(listIconCheckAdd);
    } else {
        listItemButton.appendChild(listIconAdd);
    }

    listItemButton.addEventListener('click', () => {
        activeList = listName;
        displayHeading(listName)
        displayTasks(listName);
        console.log('click')
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

        // move to dom-change module?
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
            openRemoveDialog(task)
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

        //move to dom-change module?
        const notesDialog = document.querySelector('#notes-dialog');
        const notesDialogTitle = document.querySelector('#notes-title');
        const notesDialogNotes = document.querySelector('#notes-p');
        const notesDialogClose = document.querySelector('#notes-button-close');

        notesButton.addEventListener('click', () => {
            notesDialogTitle.textContent = task.title + ' notes:';
            notesDialogNotes.textContent = task.notes;
            notesDialog.showModal();
        });

        notesDialogClose.addEventListener('click', () => {
            notesDialogTitle.textContent = "";
            notesDialogNotes.textContent = "";
            notesDialog.close();
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

// title        dueDate     done tickbox    edit button
// description  priority    notes button    remove button (confirm)

// separate dom-add module?


// separate dom-add module?
const newTaskButtonOpen = document.querySelector('#new-task-button-open');
const newTaskButtonCancel = document.querySelector('#new-task-button-cancel');
const newTaskButtonAdd = document.querySelector('#new-task-button-add');
const newTaskDialog = document.querySelector('#new-task-dialog');

newTaskButtonOpen.addEventListener('click', () => {
    newTaskDialog.showModal();
});

newTaskButtonCancel.addEventListener('click', () => {
    newTaskDialog.close();
});

newTaskButtonAdd.addEventListener('click', (event) => {
    event.preventDefault();

    const newTaskName = newTaskDialog.querySelector('input[name="new-task-name"]');
    const newTaskDescription = newTaskDialog.querySelector('input[name="new-task-description"]');
    const newTaskDue = newTaskDialog.querySelector('input[name="new-task-due"]');
    const newTaskPriority = newTaskDialog.querySelector('input[name="new-task-priority"]:checked');
    const newTaskToDoOrDone = newTaskDialog.querySelector('input[name="to-do-or-done"]:checked');
    const newTaskNotes = newTaskDialog.querySelector('textarea');

    let newTask = createTask(activeList, newTaskName.value, newTaskDescription.value, newTaskDue.value, newTaskPriority.value, newTaskToDoOrDone.value, newTaskNotes.value);
    
    addTask(newTask);
    displayTasks(newTask);
    // save tasks
    newTaskDialog.close();
});

// add npm date-fns

// add localStorage

// left colour border for priority 
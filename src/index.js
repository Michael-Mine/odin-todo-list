import './styles.css';
import listIcon from './images/clipboard-outline.svg';
import listIconCheck from './images/clipboard-check-outline.svg'
import noteIcon from './images/note-outline.svg'
import noteIconEdit from './images/note-edit-outline.svg'
import noteIconCheck from './images/note-check-outline.svg'
import noteIconRemove from './images/note-remove-outline.svg'
import { lists, tasks, createTask, addTask } from './app-logic';


let activeList;

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

function displayLists (listName) {
    const listsNav = document.querySelector('#side-bar-lists');
    
    const listItem = document.createElement('li');
    listsNav.appendChild(listItem);

    const listItemButton = document.createElement('button');
    listItemButton.textContent = listName;
    listItem.appendChild(listItemButton);

    listItemButton.addEventListener('click', () => {
        activeList = listName;
        displayHeading(listName)
        displayTasks(listName);
        console.log('click')
        // change button colour?
    })
};

function displayHeading (listName) {
    const heading = document.querySelector('#list-heading');
    heading.textContent = listName;
}

function displayTasks (task) {
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
        doneDiv.textContent = task.done;
        newContainerDiv.appendChild(doneDiv);

        if (task.done == "Done") {
            newContainerDiv.classList.toggle('tasks-container-done');
        }

        const editDiv = document.createElement('div');
        newContainerDiv.appendChild(editDiv);

        const editButton = document.createElement('button');
        editButton.classList.toggle('tasks-buttons-notes');
        editButton.textContent = 'Edit';
        editDiv.appendChild(editButton);

        const noteIconEditAdd = document.createElement('img');
        noteIconEditAdd.src = noteIconEdit;
        editButton.appendChild(noteIconEditAdd);

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

        const removeDiv = document.createElement('div');
        newContainerDiv.appendChild(removeDiv);

        const removeButton = document.createElement('button');
        removeButton.classList.toggle('tasks-buttons-notes');
        removeButton.textContent = 'Remove';
        removeDiv.appendChild(removeButton);

        const noteIconRemoveAdd = document.createElement('img');
        noteIconRemoveAdd.src = noteIconRemove;
        removeButton.appendChild(noteIconRemoveAdd);
        
    }
};

// title        dueDate     done tickbox    edit button
// description  priority    notes button    remove button (confirm)

const taskListItemButtonOpen = document.querySelector('#new-list-button-open');
const taskListItemButtonCancel = document.querySelector('#new-list-button-cancel');
const taskListItemButtonAdd = document.querySelector('#new-list-button-add');
const taskListItemDialog = document.querySelector('#new-list-dialog');

taskListItemButtonOpen.addEventListener('click', () => {
    taskListItemDialog.showModal();
});

taskListItemButtonCancel.addEventListener('click', () => {
    taskListItemDialog.close();
});

taskListItemButtonAdd.addEventListener('click', (event) => {
    event.preventDefault();
    const taskListItemName = taskListItemDialog.querySelector('input');
    taskListItemDialog.close(taskListItemName.value);
    lists.push(taskListItemName.value);
    activeList = taskListItemName.value;
    // save lists, activeList
    displayLists(taskListItemName.value);
    displayHeading(activeList);
    removeTasks()
});

function removeTasks () {
    const taskList = document.querySelector('#tasks-list');
    const taskListKeep = document.querySelectorAll('.tasks-list-keep');
    taskList.replaceChildren(...taskListKeep);  
};

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

// add buttons to edit tasks

// add npm date-fns

// add localStorage

// left colour border for priority 
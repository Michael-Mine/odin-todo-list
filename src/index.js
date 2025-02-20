import './styles.css';
import { lists, tasks, ToDoItem } from './app-logic';

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



function displayTasks (item) {
    if (item.list == activeList) {
        const taskList = document.querySelector('#tasks-list');

        const taskListItem = document.createElement('li');
        taskList.appendChild(taskListItem);

        const newContainerDiv = document.createElement('div');
        newContainerDiv.classList.toggle('tasks-container');
        newContainerDiv.textContent = item.title;
        taskListItem.appendChild(newContainerDiv);

        const dueDate = document.createElement('div');
        dueDate.textContent = 'due on ' + item.dueDate;
        newContainerDiv.appendChild(dueDate);

        const doneDiv = document.createElement('div');
        doneDiv.textContent = item.done;
        newContainerDiv.appendChild(doneDiv);

        const editDiv = document.createElement('div');
        editDiv.textContent = 'edit button'
        newContainerDiv.appendChild(editDiv);

        const descriptionDiv = document.createElement('div');
        descriptionDiv.textContent = item.description;
        newContainerDiv.appendChild(descriptionDiv);

        const priorityDiv = document.createElement('div');
        priorityDiv.textContent = item.priority + ' priority';
        newContainerDiv.appendChild(priorityDiv);

        const notesDiv = document.createElement('div');
        notesDiv.textContent = 'Notes button';
        newContainerDiv.appendChild(notesDiv);

        const removeDiv = document.createElement('div');
        removeDiv.textContent = 'remove button'
        newContainerDiv.appendChild(removeDiv);
    }
};

// title        dueDate     done tickbox    edit button
// description  priority    notes button    remove button (confirm)

const taskListItemButtonOpen = document.querySelector('#new-list-button-open');
const taskListItemButtonCancel = document.querySelector('#new-list-button-cancel');
const taskListItemButtonAdd = document.querySelector('#new-list-button-add');
const taskListItemDialog = document.querySelector('#new-list-dialog');
const taskListItemName = taskListItemDialog.querySelector('input');

taskListItemButtonOpen.addEventListener('click', () => {
    taskListItemDialog.showModal();
});

taskListItemButtonCancel.addEventListener('click', () => {
    taskListItemDialog.close();
});

taskListItemButtonAdd.addEventListener('click', (event) => {
    event.preventDefault();
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

// add modal or form for new task, display, save all lists to localStorage
const newTaskButtonOpen = document.querySelector('#new-task-button-open');
const newTaskButtonCancel = document.querySelector('#new-task-button-cancel');
const newTaskButtonAdd = document.querySelector('#new-task-button-add');
const newTaskDialog = document.querySelector('#new-task-dialog');




newTaskButtonOpen.addEventListener('click', () => {
    newTaskDialog.showModal();
})

newTaskButtonCancel.addEventListener('click', () => {
    newTaskDialog.close();
})

// add buttons to edit

// left colour border for priority 
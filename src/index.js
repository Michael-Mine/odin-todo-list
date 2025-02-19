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

function displayLists(listName) {
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

function displayHeading(listName) {
    const heading = document.querySelector('#list-heading');
    heading.textContent = listName;
}



function displayTasks(item) {
    if (item.list == activeList) {
        const taskList = document.querySelector('#tasks-list');

        const newList = document.createElement('li');
        taskList.appendChild(newList);

        const newContainerDiv = document.createElement('div');
        newContainerDiv.classList.toggle('tasks-container');
        newContainerDiv.textContent = item.title;
        newList.appendChild(newContainerDiv);

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

// add new list function to add new item in array, button

const newListButtonOpen = document.querySelector('#new-list-button-open');
const newListDialog = document.querySelector('#new-list-dialog');
const newListName = newListDialog.querySelector('input');
const newListButtonAdd = document.querySelector('#new-list-button-add');
const newListButtonCancel = document.querySelector('#new-list-button-cancel');

newListButtonOpen.addEventListener('click', () => {
    newListDialog.showModal();
});

newListButtonCancel.addEventListener('click', () => {
    newListDialog.close();
});

newListButtonAdd.addEventListener('click', (event) => {
    event.preventDefault();
    newListDialog.close(newListName.value);
    lists.push(newListName.value);
    activeList = newListName.value;
    // save lists, activeList
    displayLists(newListName.value);
    displayHeading(activeList);
    removeTasks()
});

function removeTasks() {
    const taskList = document.querySelector('#tasks-list');

    
}

// add button to edit name of list in sidebar? 

// add modal or form for new task, display, save all lists to localStorage

// add buttons to edit

// left colour border for priority 
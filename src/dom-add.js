import { lists, tasks, createTask } from './app-logic';
import { displayLists, displayHeading, displayTasks, changeActiveList } from './index';
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
    localStorage.setItem('lists', JSON.stringify(lists));
    changeActiveList(taskListItemName.value);
    displayLists(taskListItemName.value);
    displayHeading(taskListItemName.value);
    removeTasksDisplay();
});

const newTaskDialog = document.querySelector('#new-task-dialog');
const newTaskButtonCancel = document.querySelector('#new-task-button-cancel');
const newTaskButtonAdd = document.querySelector('#new-task-button-add');

const newTaskTitle = newTaskDialog.querySelector('input[name="new-task-title"]');
const newTaskDescription = newTaskDialog.querySelector('input[name="new-task-description"]');
const newTaskDue = newTaskDialog.querySelector('input[name="new-task-due"]');
const newTaskPriority = newTaskDialog.querySelector('select');
const newTaskNotes = newTaskDialog.querySelector('textarea');

let newTaskActiveList;

export function openNewTaskDialog (activeList) {
    newTaskActiveList = activeList
    newTaskDialog.showModal();
}

newTaskButtonCancel.addEventListener('click', () => {
    newTaskDialog.close();
});

newTaskButtonAdd.addEventListener('click', (event) => {
    event.preventDefault();
    let newTask = createTask(newTaskActiveList, newTaskTitle.value, newTaskDescription.value, newTaskDue.value, newTaskPriority.value, 'To Do', newTaskNotes.value);
    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks(newTask);
    newTaskDialog.close();
});
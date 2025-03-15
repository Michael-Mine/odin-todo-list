import { changeActiveList } from './index';
import { lists, tasks } from './app-logic';

let activeList;

function getLocalStorageLists () {
    if (localStorage.getItem('lists')) {
        lists = localStorage.getItem('lists');
    } else {
        lists.push('Housework');
        lists.push('Vac');
    };
};

function getLocalStorageTasks () {
    if (localStorage.getItem('tasks')) {
        tasks = localStorage.getItem('tasks');
    } else {

    };
};

function getLocalStorageActiveList () {
    if (localStorage.getItem('activeList')) {
        activeList = localStorage.getItem('activeList');
    } else {
        activeList = lists[0];
    };
    changeActiveList(activeList);
};

export function getLocalStorageAll () {
    getLocalStorageLists();
    getLocalStorageTasks();
    getLocalStorageActiveList();
};
// comments for why not how
// array to iterate through

export const lists = []
export const tasks = [];

let itemIndex = 0;

//no methods to parse items to JSON for storage
export function createTask (list, title, description, dueDate, priority, done, notes) {
    itemIndex += 1;
    return { list, title, description, dueDate, priority, done, notes, itemIndex }
}

export function addTask(newItem) {
    tasks.push(newItem)
};

const item2 = createTask("Housework", "cook dinner", "cooking dinner", "Sunday", "A", "Done", "45 mins");
const item3 = createTask("Vac", "Vacuuming", "Vac upstairs", "Sunday", "B", "To Do", "45 mins");

addTask(item2);
addTask(item3);

export function changeListNameInLists (oldName, newName) {
    let index = lists.indexOf(oldName);
    if (index >= 0) {
        lists[index] = newName;
    };
}

export function changeListNameInTasks (oldName, newName) {
    tasks.forEach((item) => {
        if (item.list == oldName) {
            item.list = newName;
        };
    });
};

export function checkItemDone (item) {
    return item.done == "Done";
};

export function changeDone (item) {
    item.done === "To Do" ? item.done = "Done" : item.done = "To Do";
};

export function editTask (task, newTitle, newDescription, newDueDate, newPriority, newNotes) {
    let id = task.itemIndex;
    let index = tasks.findIndex((element) => element.itemIndex === id);
    if (index >= 0) {
        tasks[index].title = newTitle;
        tasks[index].description = newDescription;
        tasks[index].dueDate = newDueDate;
        tasks[index].priority = newPriority;
        tasks[index].notes = newNotes;
    }
}

export function removeList (list) {
    let index = lists.indexOf(list);
    if (index >= 0) {
        lists.splice(index, 1);
    };
};

export function removeAllListItems (list) {
    console.log(tasks);
    tasks.filter((item) => item.list !== list);
    console.log(tasks);
}

export function removeItem (item) {
    let id = item.itemIndex;
    let index = tasks.findIndex((element) => element.itemIndex === id);
    if (index >= 0) {
        tasks.splice(index, 1); 
    }
};

function changeTitle (item, newTitle) {
    item.title = newTitle;
};

function changeDescription (item, newDescription) {
    item.description = newDescription;
};

function changeNotes (item, newNotes) {
    item.notes = newNotes;
};

function changePriority (item, newPriority) {
    item.priority = newPriority;
};

changeTitle(item2, "cook supper");
changeDescription(item2, "cooking supper");
changeNotes(item2, "30 mins");
// changePriority(item2, "high");
// changeDone(item2);

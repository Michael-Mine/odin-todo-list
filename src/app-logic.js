// comments for why not how
// array to iterate through

export let lists = []
export let tasks = [];

let itemIndex = 0;

//no methods to parse items to JSON for storage
export function toDoItem (list, title, description, dueDate, priority, done, notes) {
    itemIndex += 1;
    return { list, title, description, dueDate, priority, done, notes, itemIndex }
}

function addItem(newItem) {
    tasks.push(newItem)
};

const item2 = toDoItem("Housework", "cook dinner", "cooking dinner", "Sunday", "medium", "notDone", "45 mins");
const item3 = toDoItem("my list", "dishes", "cooking dinner", "Sunday", "medium", "notDone", "45 mins");

addItem(item2);
addItem(item3);

function findItem(item) {
    let id = item.itemIndex;
    let index = tasks.findIndex(element => element.itemIndex === id);
    if (index !== -1) {
        return element.itemIndex;
    }
};

function changeTitle(item, newTitle) {
    item.title = newTitle;
};

function changeDescription(item, newDescription) {
    item.description = newDescription;
};

function changeNotes(item, newNotes) {
    item.notes = newNotes;
};

function changeList(item, newList) {
    item.list = newList;
};

function changePriority(item, newPriority) {
    item.priority = newPriority;
};

function changeDone(item) {
    item.done === "notDone" ? item.done = "done" : item.done = "notDone";
};

// change functions to find in array - need to know how selected
function removeItem(item) {
    let id = item.itemIndex;
    let index = tasks.findIndex(element => element.itemIndex === id);
    if (index !== -1) {
        tasks.splice(index, 1);
    } else {
        // change to alert for IU
        console.log("error: item not found to remove");
    }
};

changeTitle(item2, "cook supper");
changeDescription(item2, "cooking supper");
changeNotes(item2, "30 mins");
changeList(item3, "Housework");
changePriority(item2, "high");
changeDone(item2);
// removeItem(item3);
console.log(tasks);

//change dueDate function - using api

//add localStorage API - in separate module?


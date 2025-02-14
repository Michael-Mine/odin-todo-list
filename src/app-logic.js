//array to iterate through
const itemList = [];

let itemIndex = 0;

//no methods to parse items to JSON for storage
export function toDoItem (list, title, description, dueDate, priority, done, notes) {
    itemIndex += 1;
    return { list, title, description, dueDate, priority, done, notes, itemIndex }
}

function addItem(newItem) {
    itemList.push(newItem)
};

const item2 = toDoItem("my list", "cook dinner", "cooking dinner", "Sunday", "medium", "notDone", "45 mins");
const item3 = toDoItem("my list", "dishes", "cooking dinner", "Sunday", "medium", "notDone", "45 mins");

addItem(item2);
addItem(item3);

function findItem(item) {
    let id = item.itemIndex;
    let index = itemList.findIndex(element => element.itemIndex === id);
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

function removeItem(item) {
    let id = item.itemIndex;
    let index = itemList.findIndex(element => element.itemIndex === id);
    if (index !== -1) {
        itemList.splice(index, 1);
    } else {
        // change to alert for IU
        console.log("error: item not found to remove");
    }
};

changeTitle(item2, "cook supper");
changeDescription(item2, "cooking supper");
changeNotes(item2, "30 mins");
changeList(item2, "chores");
changePriority(item2, "high");
changeDone(item2);
removeItem(item3);
console.log(itemList);

//change dueDate function - using api

//add localStorage API - in separate module?




// title        dueDate     done tickbox    edit button
// description  priority    notes button    remove button (confirm)
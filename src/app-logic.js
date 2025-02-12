//array to iterate through
const itemList = [];

let itemIndex = 0;

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

console.log(itemList);


//rename function for title, description, notes

//change list function

//change dueDate function - using api

//change priority function

function changeDone(item) {
    item.done = "notDone" ? 
    item.done = "done" : 
    item.done = "notDone";
}

changeDone(item2);

function removeItem(item) {
    let id = item.itemIndex;
    let index = itemList.findIndex(element => element.itemIndex === id);
    if (index !== -1) {
        itemList.splice(index, 1);
    }
};

removeItem(item3);
console.log(itemList);

//add localStorage API - in separate module?




// title        dueDate     done tickbox    edit button
// description  priority    notes button    remove button (confirm)
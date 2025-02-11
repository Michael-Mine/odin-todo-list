//array to iterate through
const list1 = [];

export function toDoItem (list, title, description, dueDate, priority, done, notes) {
    return { list, title, description, dueDate, priority, done, notes }
}

function addItem(newItem) {
    list1.push(newItem)
};

const item2 = toDoItem("my list", "cook dinner", "cooking dinner", "Sunday", "medium", "notDone", "45 mins");

addItem(item2);

console.log(list1);


//rename function for title, description, notes

//change list function

//change dueDate function - using api

//change priority function

//change done function
function changeDone(toDoItem) {
    if (toDoItem.done = "notDone") {
        toDoItem.done = "done";
    }
    else {
        toDoItem.done = "notDone";
    }
    // return toDoItem;
};

changeDone(item2);

console.log(item2)

//remove item function

//add localStorage API - in separate module?


// title        dueDate     done tickbox    edit button
// description  priority    notes button    remove button (confirm)
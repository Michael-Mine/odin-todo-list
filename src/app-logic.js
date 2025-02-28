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
const item3 = createTask("my list", "dishes", "cooking dinner", "Sunday", "B", "Done", "45 mins");

addTask(item2);
addTask(item3);

export function checkItemDone (item) {
    return item.done == "Done";
};

export function changeDone (item) {
    item.done === "To Do" ? item.done = "Done" : item.done = "To Do";
};

export function removeItem (item) {
    let id = item.itemIndex;
    let index = tasks.findIndex((element) => element.itemIndex === id);
    if (index >= 0) {
        tasks.splice(index, 1); 
    } else {
        // change to alert for IU
        console.log("error: item not found to remove");
    } 
};

// removeItem(tasks[1])

function findItem (item) {
    let id = item.itemIndex;
    
    let index = tasks.findIndex(element => element.itemIndex === id);
    
    if (index !== -1) {
        return element.itemIndex;
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

function changeList (item, newList) {
    item.list = newList;
};

function changePriority (item, newPriority) {
    item.priority = newPriority;
};



changeTitle(item2, "cook supper");
changeDescription(item2, "cooking supper");
changeNotes(item2, "30 mins");
changeList(item3, "Housework");
// changePriority(item2, "high");
// changeDone(item2);
// removeItem(item3);
console.log(tasks);

//change dueDate function - using api

//add localStorage API - in separate module?


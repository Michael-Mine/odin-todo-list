const items = [];

export function ToDoItem (list, title, description, dueDate, priority, done, notes) {
    return { list, title, description, dueDate, priority, done, notes }
}

const item2 = ToDoItem("my list", "cook dinner", "cooking dinner", "Sunday", "medium", "not-done", "45 mins");

console.log(item2);



//rename function for list, title, description, notes

//change list function

//change dueDate function - using api

//change priority function

//change done function

//remove item function

//add localStorage API - in separate module?


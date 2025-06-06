import { changeActiveList } from "./index";
import { lists, tasks, createTask } from "./app-logic";

const defaultTask1 = createTask(
  "Shopping",
  "Breakfast ingredients",
  "French Omelette",
  "2025-03-14",
  "A",
  "Done",
  "Eggs, bread, cheese",
);
const defaultTask2 = createTask(
  "Shopping",
  "Lunch ingredients",
  "BLT Sandwich",
  "2025-03-14",
  "B",
  "Done",
  "Bacon, lettuce, tomato",
);
const defaultTask3 = createTask(
  "Shopping",
  "Dinner ingredients",
  "Lasagna",
  "2025-03-14",
  "C",
  "To Do",
  "Pasta, mince, sauce",
);

const defaultTask4 = createTask(
  "Cooking",
  "Saturday Breakfast",
  "French Omelette",
  "2025-03-15",
  "A",
  "Done",
  "15 mins",
);
const defaultTask5 = createTask(
  "Cooking",
  "Saturday Lunch",
  "BLT Sandwich",
  "2025-03-15",
  "B",
  "To Do",
  "20 mins",
);
const defaultTask6 = createTask(
  "Cooking",
  "Saturday Dinner",
  "Lasagna",
  "2025-03-15",
  "C",
  "To Do",
  "90 mins",
);

const defaultTask7 = createTask(
  "Housework",
  "Washing",
  "Wash plates and pot",
  "2025-03-16",
  "C",
  "Done",
  "30 mins",
);
const defaultTask8 = createTask(
  "Housework",
  "Cleaning",
  "Mop floors",
  "2025-03-16",
  "B",
  "To Do",
  "45 mins",
);
const defaultTask9 = createTask(
  "Housework",
  "Sheets",
  "Change bed sheets",
  "2025-03-16",
  "A",
  "To Do",
  "10 mins",
);

function getLocalStorageLists() {
  if (localStorage.getItem("lists")) {
    let savedLists = JSON.parse(localStorage.getItem("lists"));
    lists.push(...savedLists);
  } else {
    lists.push("Shopping", "Cooking", "Housework");
  }
}

function getLocalStorageTasks() {
  if (localStorage.getItem("tasks")) {
    let savedTasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.push(...savedTasks);
  } else {
    tasks.push(
      defaultTask1,
      defaultTask2,
      defaultTask3,
      defaultTask4,
      defaultTask5,
      defaultTask6,
      defaultTask7,
      defaultTask8,
      defaultTask9,
    );
  }
}

function getLocalStorageActiveList() {
  if (localStorage.getItem("activeList")) {
    let SavedActiveList = localStorage.getItem("activeList");
    changeActiveList(SavedActiveList);
  } else {
    changeActiveList(lists[0]);
  }
}

export function getLocalStorageAll() {
  getLocalStorageLists();
  getLocalStorageTasks();
  getLocalStorageActiveList();
}

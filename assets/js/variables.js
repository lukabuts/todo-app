const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

let prevHours, prevMinutes, prevDays, prevDate, prevMonths;

const timeDiv = document.getElementById("time");
const formDialog = document.getElementById("form-dialog");
const showDialogBtn = document.getElementById("show-dialog");
const tasksDiv = document.getElementById("tasks");
const successMsgDiv = document.querySelector(".success-msg-div");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const today = new Date().toISOString().split("T")[0];

const createForm = (type) => {
  return `
  <form id="task-form" class="${type}">
            <p>${type} Task</p>
            <div>
              <label for="task-input">Task title:</label>
              <input type="text" id="task-input" placeholder="Task Title" />
              <span></span>
            </div>
            <div>
              <label for="task-date">Due date:</label>
              <input type="date" name="" id="task-date" min="${today}" />
              <span></span>
            </div>
            <button aria-label="Add Task" class="green-btn">${type} Task</button>
            <button type="button" aria-label="Exit Dialog" id="exit-dialog">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </form>`;
};

const createTask = (task) => {
  return `<div class="task" id="${task.id}">
            <div class="description">
              <label for="checkbox-${task.id}">
                <input type="checkbox" id="checkbox-${
                  task.id
                }" class="checkbox" ${task.completed ? "checked" : ""} />
                <div class="task-title">
                  <p id="input-value-${task.id}">${task.taskDesc}</p>
                </div>
              </label>
              <div class="task-time">
                <span id="date-value-${task.id}" ${
    today > task.taskDate && !task.completed ? "class=overdue" : ""
  }> Due: ${task.taskDate} </span>
              </div>
            </div>
            <div class="actions">
              <button id="delete-btn-${task.id}" class="delete-task-btn">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </button>
              <button id="edit-btn-${task.id}" class="edit-task-btn">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
              </button>
            </div>
          </div>`;
};

const createSuccessMessage = (message) => {
  return `<span>${message}</span>
          <div class="timeout"></div>`;
};

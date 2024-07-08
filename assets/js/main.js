// Handle Showing Form Dialog
function showFormDialog(type) {
  formDialog.innerHTML = createForm(type);
  formDialog.show();
  const taskDesc = document.getElementById("task-input");
  const taskDate = document.getElementById("task-date");

  const exitDialogBtn = document.getElementById("exit-dialog");
  const taskForm = document.getElementById("task-form");

  exitDialogBtn.addEventListener("click", closeFormDialog);
  taskForm.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  if (taskForm.className === "create") {
    taskForm.addEventListener("submit", (e) => {
      e.preventDefault();
      addTask();
    });
  }

  taskDate.addEventListener("input", () => {
    taskDate.classList.contains("error") && taskDate.classList.remove("error");
  });

  taskDesc.addEventListener("input", () => {
    taskDesc.classList.contains("error") && taskDesc.classList.remove("error");
  });
}

// Handle Closing Form Dialog
function closeFormDialog() {
  formDialog.close();
}

// Showing Form Dialog
showDialogBtn.addEventListener("click", () => {
  showFormDialog("create");
});

// Closing Form Dialog
formDialog.addEventListener("click", closeFormDialog);

// Create Task
function addTask() {
  const taskDesc = document.getElementById("task-input");
  const taskDate = document.getElementById("task-date");

  if (!validateTasks(taskDesc, taskDate)) return;

  let id;

  if (tasks.length === 0) {
    id = 1;
  } else {
    id = tasks[0].id + 1;
  }
  tasks.unshift({
    taskDate: taskDate.value,
    taskDesc: taskDesc.value,
    id,
    completed: false,
  });

  taskDate.value = "";
  taskDesc.value = "";
  storeTasks();
  closeFormDialog();
  generateTasks();
  showSuccessMessage("Task Successfully Created");
}

// Storing Tasks
function storeTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Generating Tasks
function generateTasks() {
  if (tasks.length !== 0) {
    tasksDiv.innerHTML = tasks
      .map((task) => {
        return createTask(task);
      })
      .join("");
  } else {
    tasksDiv.innerHTML = `<p class="no-tasks">You Have 0 Tasks</p>`;
  }

  //   Deleting Task
  const deleteTaskBtns = document.querySelectorAll(".delete-task-btn");

  for (const deleteTaskBtn of deleteTaskBtns) {
    deleteTaskBtn.addEventListener("click", () => {
      const id = Number(deleteTaskBtn.id.split("-")[2]);
      deleteTask(id);
    });
  }

  //   Checking Task
  const checkboxes = document.querySelectorAll(".checkbox");

  for (const checkbox of checkboxes) {
    checkbox.addEventListener("input", () => {
      const id = Number(checkbox.id.split("-")[1]);
      checkTask(id);
    });
  }

  //   Editing Task
  const editTaskBtns = document.querySelectorAll(".edit-task-btn");

  for (const editTaskBtn of editTaskBtns) {
    editTaskBtn.addEventListener("click", () => {
      const id = Number(editTaskBtn.id.split("-")[2]);
      editTask(id);
    });
  }
}

// Deleting Task
function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  storeTasks();
  generateTasks();
  showSuccessMessage("Task Successfully Deleted");
}

// Checking Task
function checkTask(id) {
  const task = tasks.find((task) => task.id === id);
  task.completed = !task.completed;
  storeTasks();
  generateTasks();
}

// Editing Task
function editTask(id) {
  showFormDialog("edit");
  const taskForm = document.getElementById("task-form");
  if (taskForm.className === "edit") {
    const task = tasks.find((task) => task.id === id);
    const taskDesc = document.getElementById("task-input");
    const taskDate = document.getElementById("task-date");

    taskDesc.value = task.taskDesc;
    taskDate.value = task.taskDate;
    taskForm.addEventListener("submit", (e) => {
      e.preventDefault();

      if (!validateTasks(taskDesc, taskDate)) return;
      task.taskDesc = taskDesc.value;
      task.taskDate = taskDate.value;
      storeTasks();
      generateTasks();
      closeFormDialog();
      showSuccessMessage("Task Successfully Edited");
    });
  }
}

// Validating Tasks
function validateTasks(desc, date) {
  if (date.value.trim() !== "" && desc.value.trim() !== "") {
    return true;
  } else {
    if (date.value.trim() === "") {
      !date.classList.contains("error") && date.classList.add("error");
      date.value = "";
    }
    if (desc.value.trim() === "") {
      !desc.classList.contains("error") && desc.classList.add("error");
      desc.value = "";
    }

    return false;
  }
}

// Show Success Message
function showSuccessMessage(message) {
  const messageDiv = document.createElement("div");
  messageDiv.innerHTML = createSuccessMessage(message);
  successMsgDiv.appendChild(messageDiv);
  setTimeout(() => {
    messageDiv.remove();
  }, 3000);
}

generateTasks();

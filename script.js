let tasks = {
  todo: [
    {
      id: Date.now(),
      text: "Belajar HTML",
      priority: "medium",
      date: new Date().toLocaleString("id-ID"),
      completed: false,
    },
  ],
  done: [
    {
      id: Date.now(),
      text: "Belajar CSS",
      priority: "medium",
      date: new Date().toLocaleString("id-ID"),
      completed: true,
    },
  ],
};

function updateTime() {
  const now = new Date();
  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  const day = days[now.getDay()];
  const date = now.getDate();
  const month = months[now.getMonth()];
  const year = now.getFullYear();
  let timeDisplay = document.querySelector(".time-display");
  timeDisplay.innerHTML = `
        <p>${day},</p>
        <p>${date} ${month} ${year}</p>
    `;
}
updateTime();

function initializePriorityBtn() {
  const priorityBtns = document.querySelectorAll(".priority-btn");
  priorityBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      priorityBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });
  document.querySelector(".priority-btn.medium").classList.add("active");
}
initializePriorityBtn();

function addTask() {
  const taskInput = document.getElementById("task-input");
  const taskText = taskInput.value.trim();
  if (taskText === "") {
    alert("Tugas tidak boleh kosong");
    return;
  }
  const priorityBtn = document.querySelector(".priority-btn.active");
  const priority = priorityBtn ? priorityBtn.dataset.priority : "medium";
  const task = {
    id: Date.now(),
    text: taskText,
    priority: priority,
    date: new Date().toLocaleString("id-ID"),
    completed: false,
  };
  tasks.todo.push(task);
  taskInput.value = "";
  taskInput.style.borderColor = "#e41212ff";
  setTimeout(() => {
    taskInput.style.borderColor = "#1e6128ff";
  }, 1000);
}

function toggleTask(id) {
  const todoIndex = tasks.todo.findIndex((t) => t.id === id);
  const doneIndex = tasks.done.findIndex((t) => t.id === id);

  if (todoIndex !== -1) {
    const task = tasks.todo.splice(todoIndex, 1)[0];
    task.completed = true;
    tasks.done.push(task);
  } else if (doneIndex !== -1) {
    const task = tasks.done.splice(doneIndex, 1)[0];
    task.completed = false;
    tasks.todo.push(task);
  }
}

function deleteTask(id, type) {
  if (confirm(`apakah kamu yakin ingin menghapus tugas ini?`)) {
    tasks[type] = tasks[type].filter((t) => t.id !== id);
  }
}

function deleteAllTask(type) {
  if (
    confirm(
      `apakah kamu yakin ingin menghapus semua tugas di ${
        type === "todo" ? "To Do" : "Done"
      }?`
    )
  ) {
    tasks[type] = [];
  }
}

function switchTabs(tab) {
  let tabBtn = document.querySelectorAll(".tab-btn");
  tabBtn.forEach((btn) => btn.classList.remove("active"));

  event.target.classList.add("active");
  document.querySelectorAll(".list-tasks").forEach((l) => {
    l.classList.remove("active");
  });
  if (tab === "todo") {
    document.getElementById("todoTab").classList.add("active");
  } else {
    document.getElementById("doneTab").classList.add("active");
  }
}

function renderTasks() {
  renderTodoTasks();
  renderDoneTasks();
  updateCounts();
}

function renderTodoTasks() {
  const todoList = document.getElementById("todoList");
  const deleteTodoBtn = document.getElementById("deleteTodoBtn");
  console.log(todoList);

  if (tasks.todo.length === 0) {
    todoList.innerHTML = `<div class="no-task">
    <h1>Belum ada tugas</h1>
    <p>Silahkan menambahkan tugas baru</p>
    </div>`;
    deleteTodoBtn.style.display = "none";
  } else {
    todoList.innerHTML = tasks.todo
      .map(
        (task) => `
    <div class"task-item">
    <input type="checkbox" class="task-checkbox" onchange="toggleTask(${
      task.id
    }) />
    <div class="task-content">
    <div class="task-text">${task.text}</div>
    <div>
    <span class"task-priority priority-${
      task.priority
    }">${task.priority.toUpperCase()}</span>
    <span class="task-date">${task.date}</span>
    </div>
    </div>
    <button onclick="deleteTask(${task.id}, 'todo')">Hapus</button>
    </div>`
      )
      .join("");
    deleteTodoBtn.style.display = "block";
  }
}

function renderDoneTasks() {
  const doneList = document.getElementById("doneList");
  const deleteDoneBtn = document.getElementById("deleteDoneBtn");

  if (tasks.done.length === 0) {
    doneList.innerHTML = `<div class="no-task">
    <h1>Belum ada tugas yang selesai</h1>
    <p>Silahkan selesaikan tugas</p>
    </div>`;
    deleteDoneBtn.style.display = "none";
  } else {
    doneList.innerHTML = tasks.done
      .map(
        (task) => `<div class='task-item done-task' >
      <input type='checkbox' class='task-checkbox' checked onchange="toggleTask(${
        task.id
      })" />
      <div class='task-content'>
      <div class='task-text>${task.text}</div>
      <div>
      <span class='task-priority priority-${
        task.priority
      }>${task.priority.toUpperCase()}</span>
      <span>${task.date}</span>
      </div>
      </div>
      <button onclick="deleteTask(${task.id}, 'done')" >Hapus</button>
      </div>`
      )
      .join("");
    deleteDoneBtn.style.display = "block";
  }
}
function updateCounts() {
  document.getElementById("todoCount").textContent = tasks.todo.length;
  document.getElementById("doneCount").textContent = tasks.done.length;
}
renderTasks();

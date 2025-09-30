let tasks = {
  todo: [],
  done: [],
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

function deleteTask(id, type){
  if(confirm(`apakah kamu yakin ingin menghapus tugas ini?`)){
    tasks[type] = tasks[type].filter(t => t.id !== id)
  }
}


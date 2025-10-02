//object of array kosong digunakan sebagai pembungkus
let tasks = {
  todo: [],
  done: [],
};
//inisialisasi waktu halaman di buka
document.addEventListener("DOMContentLoaded", function () {
  loadTasks();
  updateTime();
  setInterval(updateTime, 60000);
  initializePriorityBtn();
  renderTasks();
});
//tampilan waktu di header
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
//inilialisasi tombol prioritas
function initializePriorityBtn() {
  const priorityBtns = document.querySelectorAll(".priority-btn");
  priorityBtns.forEach((btn) => { //untuk setiap tombol
    btn.addEventListener("click", () => { //ketika di klik
      priorityBtns.forEach((b) => b.classList.remove("active")); //untuk hilangkan class active
      btn.classList.add("active"); //lalu tambahkan class active
    });
  });

  //default tombol prioritas
  document.querySelector(".priority-btn.medium").classList.add("active");
}
//menambahkan tugas
function addTask() {
  const taskInput = document.getElementById("task-input"); //panggil element tugas
  const taskText = taskInput.value.trim();
  if (taskText === "") {                      //jika tugas kosong
    alert("Tugas tidak boleh kosong");
    return;
  }
  const priorityBtn = document.querySelector(".priority-btn.active"); //mecari tombol prioritas
  const priority = priorityBtn ? priorityBtn.dataset.priority : "medium"; //jika tidak maka medium sebagai default
  const task = {                                                  // bungkus tugas kedalam object
    id: Date.now(),
    text: taskText,
    priority: priority,
    date: new Date().toLocaleDateString("id-ID"),
    completed: false,
  };
  tasks.todo.push(task); //lalu masukan kedalam object of array yang tadi dibuat
  taskInput.value = ""; // kosongkan text area
  taskInput.style.borderColor = "#e41212ff";
  setTimeout(() => {
    taskInput.style.borderColor = "#1e6128ff";
  }, 1000);
  saveTasks();
  renderTasks();
}
//fungsi checkbox
function toggleTask(id) {
  // menerima sebuah id
  const todoIndex = tasks.todo.findIndex((t) => t.id === id); //method yang mengembalikan posisi[indexx] dalam array
  const doneIndex = tasks.done.findIndex((t) => t.id === id); //dimana ini akan mencari id

  if (todoIndex !== -1) {
    //method findIndex() mengembalikan -1 jika id tidak ditemukan
    const task = tasks.todo.splice(todoIndex, 1)[0]; //mulai dari toodoIndex hapus 1 dan masukan ke variable task
    task.completed = true; //ubah status menjadi true
    tasks.done.push(task); //push kedalam done
  } else if (doneIndex !== -1) {
    const task = tasks.done.splice(doneIndex, 1)[0];
    task.completed = false;
    tasks.todo.push(task);
  }
  saveTasks();
  renderTasks();
}

function deleteTask(id, type) {//menerima id dan type
  if (confirm(`apakah kamu yakin ingin menghapus tugas ini?`)) { //konfirmasi
    tasks[type] = tasks[type].filter((t) => t.id !== id); //untuk setiap tugas yang id nya tidak sama dengan yang kita klik
  } //maka tugas tersebut berhasil menjadi array baru
  saveTasks();
  renderTasks();
}

function deleteAllTasks(type) {//menerima type
  if (                            //konfirmasi
    confirm(
      `apakah kamu yakin ingin menghapus semua tugas di ${
        type === "todo" ? "To Do" : "Done"
      }?`
    )
  ) {
    tasks[type] = []; //jika yakin maka array nya menjadi array kosong
  }
  saveTasks();
  renderTasks();
}

function switchTabs(tab) {//menerima tab
  let tabBtn = document.querySelectorAll(".tab-btn"); //mencari semua element yangg classnya tab-btn
  tabBtn.forEach((btn) => btn.classList.remove("active")); //hilangkan semua class active

  event.target.classList.add("active"); //setelah semua di hapus maka jika ada yang di klik maka tambahkan class active
  document.querySelectorAll(".list-tasks").forEach((l) => {   //mencari semua element yang classnya list-tasks
    l.classList.remove("active"); //lalu hilangkan class active
  });
  if (tab === "todo") {//jika tab nya todo maka masukan class active
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
//menampilkan list todo
function renderTodoTasks() {
  const todoList = document.getElementById("todoList");
  const deleteTodoBtn = document.getElementById("deleteTodoBtn");

  if (tasks.todo.length === 0) {//jika array todo kosong maka tampilkan ini
    todoList.innerHTML = `<div class="no-task">
    <h1>Belum ada tugas</h1>
    <p>Silahkan menambahkan tugas baru</p>
    </div>`;
    deleteTodoBtn.style.display = "none";
  } else { //jika array todo tidak kosong
    todoList.innerHTML = tasks.todo
      .map(                               //untuk setiap task maka akan dibuat html seperti ini
        (task) => ` 
    <div class="task-item">
    <input type="checkbox" class="task-checkbox" onchange= "toggleTask(${
      task.id
    })" />
    <div class="task-content">
    <div class="task-text">${task.text}</div>
    <div>
    <span class="task-priority priority-${
      task.priority
    }">${task.priority.toUpperCase()}</span>
    <span class="task-date">${task.date}</span>
    </div>
    </div>
    <button class="delete-task-btn" onclick="deleteTask(${
      task.id
    }, 'todo')">Hapus</button>
    </div>`
      )
      .join(""); //method ini akan menggabungkan tanpa pemisah
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
      <div class='task-text'>${task.text}</div>
      <div>
      <span class='task-priority priority-${
        task.priority
      }'>${task.priority.toUpperCase()}</span>
      <span>${task.date}</span>
      </div>
      </div>
      <button class="delete-task-btn" onclick="deleteTask(${
        task.id
      }, 'done')" >Hapus</button>
      </div>`
      )
      .join("");
    deleteDoneBtn.style.display = "block";
  }
}
//fungsi penghitung ada berapa banya tugas
function updateCounts() {
  document.getElementById("todoCount").textContent = tasks.todo.length;
  document.getElementById("doneCount").textContent = tasks.done.length;
}
renderTasks();
//push tasks kedalam local storage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
//mengambil tasks dari local storage
function loadTasks() {
  const saved = localStorage.getItem("tasks");
  if (saved) {
    tasks = JSON.parse(saved);
  }
}

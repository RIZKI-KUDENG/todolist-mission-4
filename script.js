function updateTime() {
  const now = new Date();
  const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];
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
}
initializePriorityBtn();

function addTask(){
    
}
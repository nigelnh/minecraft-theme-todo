document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("taskInput");
  const addTaskBtn = document.getElementById("addTask");
  const taskList = document.getElementById("taskList");
  const themeToggle = document.getElementById("themeToggle");

  // Load tasks from localStorage
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Load theme preference
  const currentTheme = localStorage.getItem("theme") || "dark-mode";
  document.body.className = currentTheme;

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
      const li = document.createElement("li");
      li.className = `task-item ${task.completed ? "completed" : ""}`;
      li.innerHTML = `
                <span>${task.text}</span>
                <button class="minecraft-btn delete-btn">Delete</button>
            `;

      li.addEventListener("click", (e) => {
        if (e.target.tagName !== "BUTTON") {
          tasks[index].completed = !tasks[index].completed;
          saveTasks();
          renderTasks();
        }
      });

      li.querySelector(".delete-btn").addEventListener("click", () => {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
      });

      taskList.appendChild(li);
    });
  }

  addTaskBtn.addEventListener("click", () => {
    const text = taskInput.value.trim();
    if (text) {
      tasks.push({ text, completed: false });
      saveTasks();
      renderTasks();
      taskInput.value = "";
    }
  });

  taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addTaskBtn.click();
    }
  });

  themeToggle.addEventListener("click", () => {
    const newTheme = document.body.classList.contains("dark-mode")
      ? "light-mode"
      : "dark-mode";
    document.body.className = newTheme;
    localStorage.setItem("theme", newTheme);
  });

  // Initial render
  renderTasks();
});

const todoInput = document.getElementById("todoInput");
const pomodoroInput = document.getElementById("pomodoroInput");
const todoList = document.getElementById("todoList");

function addTodo() {
    const taskText = todoInput.value.trim();
    const estimatedPomodoros = pomodoroInput.value.trim();

    if (!taskText || isNaN(estimatedPomodoros) || estimatedPomodoros <= 0) {
        alert("Please enter a valid task and Pomodoro time.");
        return;
    }

    const li = document.createElement("li");
    li.className = "flex items-center justify-between bg-white text-black p-2 rounded relative group";

    // Left: Checkbox + Text
    const leftDiv = document.createElement("div");
    leftDiv.className = "flex items-center gap-2";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    const taskSpan = document.createElement("span");
    taskSpan.textContent = taskText;

    checkbox.addEventListener("change", () => {
      taskSpan.classList.toggle("line-through", checkbox.checked);
      taskSpan.classList.toggle("text-gray-400", checkbox.checked);
    });

    leftDiv.appendChild(checkbox);
    leftDiv.appendChild(taskSpan);

    // Right: 3 Dots Menu
    const menuWrapper = document.createElement("div");
    menuWrapper.className = "relative";

    const menuBtn = document.createElement("button");
    menuBtn.innerHTML = "⋮";
    menuBtn.className = "text-lg font-bold px-2 focus:outline-none";
    menuBtn.onclick = (e) => {
      e.stopPropagation(); 
      menu.classList.toggle("hidden");
    };

    const menu = document.createElement("div");
    menu.className = "absolute right-0 top-6 bg-white border border-gray-200 rounded shadow-lg w-32 hidden z-10";
    menu.innerHTML = `
      <button class="w-full text-left px-3 py-1 text-sm hover:bg-gray-100">Edit</button>
      <button class="w-full text-left px-3 py-1 text-sm hover:bg-gray-100 text-red-600">Delete</button>
      <button class="w-full text-left px-3 py-1 text-sm hover:bg-gray-100 text-yellow-500">Priority</button>
    `;

    const [editBtn, deleteBtn, priorityBtn] = menu.querySelectorAll("button");

    editBtn.onclick = () => {
      const newTask = prompt("Edit task:", taskSpan.textContent);
      if (newTask) taskSpan.textContent = newTask;
      menu.classList.add("hidden");
    };

    deleteBtn.onclick = () => {
      li.remove();
    };

    priorityBtn.onclick = () => {
      todoList.insertBefore(li, todoList.firstChild); // Move to top
      menu.classList.add("hidden");
    };

    // Pomodoro display
    const pomodoroTimeSpan = document.createElement("span");
    pomodoroTimeSpan.textContent = `(${estimatedPomodoros} hrs)`;
    pomodoroTimeSpan.className = "text-xs text-gray-500 ml-2";

    menuWrapper.appendChild(menuBtn);
    menuWrapper.appendChild(menu);
    li.appendChild(leftDiv);
    li.appendChild(pomodoroTimeSpan);
    li.appendChild(menuWrapper);
    todoList.appendChild(li);

    window.addEventListener("click", () => menu.classList.add("hidden"));

    todoInput.value = "";
    pomodoroInput.value = "";
}

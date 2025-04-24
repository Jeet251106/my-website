const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");

function addTodo() {
    const taskText = todoInput.value.trim();
    if (!taskText) return;
  
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
      e.stopPropagation(); // Stop click bubbling
      menu.classList.toggle("hidden");
    };
  
    const menu = document.createElement("div");
    menu.className = "absolute right-0 top-6 bg-white border border-gray-200 rounded shadow-lg w-32 hidden z-10";
    menu.innerHTML = `
      <button class="w-full text-left px-3 py-1 text-sm hover:bg-gray-100">Make Priority</button>
      <button class="w-full text-left px-3 py-1 text-sm hover:bg-gray-100">Edit</button>
      <button class="w-full text-left px-3 py-1 text-sm hover:bg-gray-100 text-red-600">Delete</button>
    `;
  
    // Menu options
    const [priorityBtn, editBtn, deleteBtn] = menu.querySelectorAll("button");
  
    priorityBtn.onclick = () => {
      todoList.prepend(li);
      menu.classList.add("hidden");
    };
  
    editBtn.onclick = () => {
      const newTask = prompt("Edit task:", taskSpan.textContent);
      if (newTask) taskSpan.textContent = newTask;
      menu.classList.add("hidden");
    };
  
    deleteBtn.onclick = () => {
      li.remove();
    };
  
    menuWrapper.appendChild(menuBtn);
    menuWrapper.appendChild(menu);
    li.appendChild(leftDiv);
    li.appendChild(menuWrapper);
    todoList.appendChild(li);
  
    // Close dropdown when clicking elsewhere
    window.addEventListener("click", () => menu.classList.add("hidden"));
  
    todoInput.value = "";
  }
  

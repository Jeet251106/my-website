function addTask() {
    const input = document.getElementById("todo-input");
    const taskText = input.value.trim();
    if (!taskText) return;

    const taskList = document.getElementById("todo-list");
    const li = document.createElement("li");
    li.textContent = taskText;

    const doneBtn = document.createElement("button");
    doneBtn.textContent = "Done";
    doneBtn.className = "done-btn";
    doneBtn.onclick = () => li.remove();

    li.appendChild(doneBtn);
    taskList.appendChild(li);

    input.value = "";
}

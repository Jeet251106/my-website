function addTodo() {
  const input = document.getElementById('todoInput');
  const prioritySelect = document.getElementById('prioritySelect');
  const task = input.value.trim();
  const priority = prioritySelect.value;

  if (!task) return;

  const li = document.createElement('li');
  li.className = `flex justify-between items-center bg-white text-black p-2 rounded border-l-4 ${
    priority === 'High' ? 'border-red-600' : priority === 'Medium' ? 'border-yellow-500' : 'border-green-500'
  }`;

  const span = document.createElement('span');
  span.innerText = `${task} (${priority})`;

  const doneBtn = document.createElement('button');
  doneBtn.innerText = 'Done';
  doneBtn.className = 'text-green-600 font-semibold ml-4';
  doneBtn.onclick = () => {
    li.classList.add('line-through', 'opacity-60');
    doneBtn.disabled = true;
  };

  li.appendChild(span);
  li.appendChild(doneBtn);
  document.getElementById('todoList').appendChild(li);

  input.value = '';
  prioritySelect.value = 'Low';
}

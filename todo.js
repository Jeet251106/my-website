function addTodo() {
  const input = document.getElementById('todoInput');
  const task = input.value.trim();
  if (!task) return;

  const li = document.createElement('li');
  li.className = 'flex justify-between bg-white text-black p-2 rounded';

  const span = document.createElement('span');
  span.innerText = task;

  const doneBtn = document.createElement('button');
  doneBtn.innerText = 'Done';
  doneBtn.className = 'text-green-600 font-semibold';
  doneBtn.onclick = () => li.remove();

  li.appendChild(span);
  li.appendChild(doneBtn);
  document.getElementById('todoList').appendChild(li);
  input.value = '';
}

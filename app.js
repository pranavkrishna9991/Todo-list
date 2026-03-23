let todos = JSON.parse(localStorage.getItem('todos')) || [];
let filter = 'all';

function save() {
  localStorage.setItem('todos', JSON.stringify(todos));
}
function addTodo(text) {
  if (!text.trim()) return;
  todos.push({ id: Date.now(), text: text.trim(), done: false });
  save();
  render();
}

document.getElementById('add-btn').addEventListener('click', () => {
  const input = document.getElementById('todo-input');
  addTodo(input.value);
  input.value = '';
});

document.getElementById('todo-input').addEventListener('keydown', e => {
  if (e.key === 'Enter') document.getElementById('add-btn').click();
});
function toggleTodo(id) {
  todos = todos.map(t => t.id === id ? { ...t, done: !t.done } : t);
  save(); render();
}

function deleteTodo(id) {
  todos = todos.filter(t => t.id !== id);
  save(); render();
}
function render() {
  const list = document.getElementById('todo-list');
  const filtered = todos.filter(t =>
    filter === 'all' ? true :
    filter === 'active' ? !t.done : t.done
  );
  list.innerHTML = filtered.map(t => `
    <li class="${t.done ? 'done' : ''}">
      <input type="checkbox" ${t.done ? 'checked' : ''}
        onchange="toggleTodo(${t.id})">
      <span>${t.text}</span>
      <button class="del" onclick="deleteTodo(${t.id})">✕</button>
    </li>
  `).join('');
  document.getElementById('empty').style.display =
    filtered.length === 0 ? 'block' : 'none';
}

render();
document.querySelectorAll('.filter').forEach(btn => {
  btn.addEventListener('click', () => {
    filter = btn.dataset.filter;
    document.querySelectorAll('.filter')
      .forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    render();
  });
});
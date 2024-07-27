const apiUrl = 'http://localhost:5000/tasks';

async function fetchTasks() {
    const response = await fetch(apiUrl);
    const tasks = await response.json();
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
    tasks.forEach(task => {
        taskList.innerHTML += `
            <div>
                <h3>${task.title}</h3>
                <p>${task.description}</p>
                <button onclick="deleteTask('${task._id}')">Delete</button>
            </div>
        `;
    });
}

async function addTask() {
    const title = document.getElementById('task-title').value;
    const description = document.getElementById('task-description').value;
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, completed: false })
    });
    if (response.ok) {
        fetchTasks();
    }
}

async function deleteTask(id) {
    const response = await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
    if (response.ok) {
        fetchTasks();
    }
}
function addTask() {
    const title = document.getElementById('task-title').value;
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title })
    })
    .then(response => response.json())
    .then(() => {
        document.getElementById('task-title').value = '';
        fetchTasks(); // Güncel görevleri çek
    })
    .catch(error => console.error('Error:', error));
}

document.addEventListener('DOMContentLoaded', fetchTasks);

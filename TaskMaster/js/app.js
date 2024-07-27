// API URL
const apiUrl = 'http://localhost:5000/tasks';

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value;
    if (taskText === '') return;

    // API'ye görev ekleme isteği
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ task: taskText })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Görev başarıyla eklendi:', data);
        taskInput.value = '';
        loadTasks();
    })
    .catch(error => console.error('Görev eklenirken bir hata oluştu:', error));
}

function loadTasks() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const taskList = document.getElementById('taskList');
            taskList.innerHTML = '';
            data.forEach(task => {
                const li = document.createElement('li');
                li.textContent = task.task;
                taskList.appendChild(li);
            });
        })
        .catch(error => console.error('Görevler yüklenirken bir hata oluştu:', error));
}

// Sayfa yüklendiğinde görevleri yükle
window.onload = loadTasks;

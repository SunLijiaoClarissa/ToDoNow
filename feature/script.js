// Select elements
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const progressBar = document.getElementById('progress-bar');

let tasks = [];

// Event listener for adding tasks
taskForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent the form from submitting

    const taskText = taskInput.value.trim();

    // Check if the input is not empty
    if (taskText !== '') {
        // Create task object
        const task = {
            text: taskText,
            completed: false
        };
        tasks.push(task);

        // Add task to the list
        addTaskToList(task);

        // Update progress bar
        updateProgressBar();

        // Clear the input field
        taskInput.value = '';
    }
});

// Function to add task to the list
function addTaskToList(task) {
    const listItem = document.createElement('li');
    listItem.textContent = task.text;

    // Create complete checkbox
    const completeCheckbox = document.createElement('input');
    completeCheckbox.type = 'checkbox';
    completeCheckbox.addEventListener('change', function() {
        task.completed = this.checked;
        updateProgressBar();
    });

    // Create delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', function() {
        taskList.removeChild(listItem);
        tasks = tasks.filter(t => t !== task);
        updateProgressBar();
    });

    // Append checkbox and delete button to list item
    listItem.prepend(completeCheckbox);
    listItem.appendChild(deleteBtn);

    // Append list item to the task list
    taskList.appendChild(listItem);
}

// Function to update the progress bar
function updateProgressBar() {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;

    // Calculate percentage
    const percentage = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;

    // Update progress bar width
    progressBar.style.width = percentage + '%';
}
document.addEventListener('DOMContentLoaded', function () {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    const backupBtn = document.getElementById('backup-tasks');
    const restoreBtn = document.getElementById('restore-tasks');
    const restoreFileInput = document.getElementById('restore-file');

    // 添加任务
    taskForm.addEventListener('submit', function (e) {
        e.preventDefault();
        addTask(taskInput.value);
        taskInput.value = '';
    });

    function addTask(taskText) {
        const li = document.createElement('li');
        li.textContent = taskText;
        taskList.appendChild(li);
    }

    // 备份任务到JSON文件
    backupBtn.addEventListener('click', function () {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(li => {
            tasks.push(li.textContent);
        });

        // 将任务列表转换为JSON文件
        const blob = new Blob([JSON.stringify(tasks)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'tasks-backup.json';
        a.click();
        URL.revokeObjectURL(url);
    });

    // 恢复任务从JSON文件
    restoreBtn.addEventListener('click', function () {
        restoreFileInput.click();  // 触发文件选择
    });

    restoreFileInput.addEventListener('change', function () {
        const file = restoreFileInput.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function (e) {
            const tasks = JSON.parse(e.target.result);
            taskList.innerHTML = '';  // 清空当前任务列表
            tasks.forEach(task => addTask(task));
        };
        reader.readAsText(file);
    });
});


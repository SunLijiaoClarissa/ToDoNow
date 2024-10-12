// Select form elements
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

// Event listener to add a new task
taskForm.addEventListener('submit', function(e) {
    e.preventDefault();  // Prevent form submission

    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        addTask(taskText);
        taskInput.value = '';  // Clear input field
    }
});

// Function to add a task to the list
function addTask(taskText) {
    const li = document.createElement('li');
    li.textContent = taskText;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', function() {
        li.remove();
    });

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}

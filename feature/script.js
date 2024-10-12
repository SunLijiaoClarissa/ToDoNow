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

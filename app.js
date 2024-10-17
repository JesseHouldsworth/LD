// Begin LaunchDarkly code
// Define user attributes
const context = {
  kind: 'user',
  key: 'test-user',  // Use a simple context key for testing
  name: 'Test User'
};

// Initialize LaunchDarkly client - REPLACE WITH CLIENT SIDE ID
const ldClient = LDClient.initialize('YOUR_CLIENT_SIDE_ID', context);

// Setup event listener - should result in success message sent to browser console
ldClient.on('ready', () => {
  console.log("LaunchDarkly client is ready");

  // Check the current state of the "dark-mode" feature flag
  const isDarkModeEnabled = ldClient.variation('dark-mode', false);
  console.log("Initial dark-mode flag status:", isDarkModeEnabled);
  toggleDarkMode(isDarkModeEnabled);

  // Listen for real-time flag changes
  ldClient.on('change', (settings) => {
    if (settings['dark-mode']) {
      console.log("Dark mode change detected:", settings['dark-mode'].current);
      toggleDarkMode(settings['dark-mode'].current);
    }
  });
});
// End LaunchDarkly code

// Function to toggle Dark Mode
function toggleDarkMode(isDarkMode) {
  console.log("Toggling dark mode:", isDarkMode); // Log the toggle action
  document.body.style.backgroundColor = isDarkMode ? '#333' : '#fff';
  document.body.style.color = isDarkMode ? '#fff' : '#000';
}



// Select elements from the DOM
const newTodoInput = document.getElementById('newTodo');
const addTodoBtn = document.getElementById('addTodoBtn');
const todoList = document.getElementById('todoList');

// Array to hold todos
let todos = [];

// Function to render the list of todos
function renderTodos() {
  todoList.innerHTML = ''; // Clear the existing list
  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    li.textContent = todo.text;

    // Mark completed todos
    if (todo.completed) {
      li.classList.add('completed');
    }

    // Add complete button
    const completeBtn = document.createElement('button');
    completeBtn.textContent = todo.completed ? 'Undo' : 'Complete';
    completeBtn.onclick = () => toggleComplete(index);
    li.appendChild(completeBtn);

    // Add delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = () => deleteTodo(index);
    li.appendChild(deleteBtn);

    todoList.appendChild(li);
  });
}

// Function to add a new todo
function addTodo() {
  const newTodoText = newTodoInput.value.trim();
  if (newTodoText) {
    todos.push({ text: newTodoText, completed: false });
    newTodoInput.value = ''; // Clear the input field
    renderTodos();
  }
}

// Function to delete a todo
function deleteTodo(index) {
  todos.splice(index, 1);
  renderTodos();
}

// Function to toggle the complete status of a todo
function toggleComplete(index) {
  todos[index].completed = !todos[index].completed;
  renderTodos();
}

// Event listener for the Add button
addTodoBtn.addEventListener('click', addTodo);

// Event listener for the Enter key to add a todo
newTodoInput.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    addTodo();
  }
});
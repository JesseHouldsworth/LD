// Define a context with a "userType" attribute
const context = {
  kind: 'user',
  key: 'user-12784',  // Unique identifier for the user
  name: 'John Smith',
  attributes: {
    role: 'developer',
    location: 'US',
    userType: 'early-adopters'  // Identifies the user as an early adopter
  }
};

// Initialize LaunchDarkly with the context
const ldClient = LDClient.initialize('YOUR_CLIENT_SIDE_ID', context);

ldClient.on('ready', () => {
  const isDarkModeEnabled = ldClient.variation('dark-mode', false);
  toggleDarkMode(isDarkModeEnabled);

  ldClient.on('change', (settings) => {
    if (settings['dark-mode']) {
      toggleDarkMode(settings['dark-mode'].current);
    }
  });
});


// Function to toggle Dark Mode
function toggleDarkMode(isDarkMode) {
  // Toggle body background and text colors
  document.body.style.backgroundColor = isDarkMode ? '#333' : '#fff';
  document.body.style.color = isDarkMode ? '#fff' : '#000';

  // Update input field text and background colors for dark mode
  const inputField = document.getElementById('newTodo');
  const todoContainer = document.querySelector('.container');

  inputField.style.backgroundColor = isDarkMode ? '#555' : '#fff';
  inputField.style.color = isDarkMode ? '#fff' : '#000';

  // Update the container's background to contrast with the body
  todoContainer.style.backgroundColor = isDarkMode ? '#444' : '#fff';
  todoContainer.style.color = isDarkMode ? '#fff' : '#000';
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

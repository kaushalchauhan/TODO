import render from "./render.js";
import todoStore from "./data.js";
import { addTodo, deleteTodo, toggleCompleted, editTodo } from "./data.js";
window.addEventListener("todoschange", () => {
  render();
});

// try to get store from localstorage
const storeFromLocalStorage = JSON.parse(localStorage.getItem("todos"));
if (storeFromLocalStorage?.todos.length > 0) {
  todoStore.todos = storeFromLocalStorage.todos;
} else {
  localStorage.setItem("todos", JSON.stringify(todoStore));
  render();
}

// form get

const form = document.getElementById("form");
const inputTitle = document.getElementById("todo-title-input");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let todotitle = inputTitle.value.trim();
  if (todotitle !== "") {
    const newTodo = {
      id: crypto.randomUUID(),
      title: todotitle,
      complete: false,
    };
    addTodo(newTodo);
  }

  inputTitle.value = "";
});

// delete todo
const todos = document.querySelector(".todos");
todos.addEventListener("click", (e) => {
  const target = e.target;
  if (target.classList.contains("delete-todo-button")) {
    const id = target.closest(".todo").dataset.id;
    deleteTodo(id);
  }
});

// edit todo
const todosContainer = document.querySelector(".todos");
const modal = document.getElementById("editModal");
const modalInput = document.getElementById("editTodoInput");
const saveEditButton = document.getElementById("saveEditButton");
const cancelEditButton = document.getElementById("cancelEditButton");

todosContainer.addEventListener("click", (e) => {
  const target = e.target;
  if (target.classList.contains("edit-todo-button")) {
    const todoElement = target.closest(".todo");
    const id = todoElement.dataset.id;
    const todo = todoStore.todos.find((t) => t.id === id);

    // Set the current todo title in the modal input
    modalInput.value = todo.title;

    // Show the modal
    modal.style.display = "block";

    // Save button click event
    saveEditButton.addEventListener("click", () => {
      const newTitle = modalInput.value;
      editTodo(id, newTitle);

      // Hide the modal after saving
      modal.style.display = "none";
    });

    // Cancel button click event
    cancelEditButton.addEventListener("click", () => {
      // Hide the modal without saving
      modal.style.display = "none";
    });
  }
});

// set completed
todos.addEventListener("change", (e) => {
  const target = e.target;
  if (target.classList.contains("todo-checkbox")) {
    const id = target.closest(".todo").dataset.id;
    const completed = target.checked;
    toggleCompleted(id, completed);
  }
});

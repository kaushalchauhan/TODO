import render from "./render.js";
import todoStore from "./data.js";
import { addTodo, deleteTodo, toggleCompleted } from "./data.js";
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
  let todotitle = inputTitle.value;
  const newTodo = {
    id: crypto.randomUUID(),
    title: todotitle,
    complete: false,
  };
  addTodo(newTodo);
  todotitle = " ";
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
// set completed
todos.addEventListener("change", (e) => {
  const target = e.target;
  if (target.classList.contains("todo-checkbox")) {
    const id = target.closest(".todo").dataset.id;
    const completed = target.checked;
    toggleCompleted(id, completed);
  }
});

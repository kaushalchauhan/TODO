import todoStore from "./data.js";
function render() {
  const todos = document.querySelector(".todos");
  const todoElements = todoStore.todos
    .map(
      (todo) => `<li class="todo" data-id=${todo.id}>
  <span class="todo-title ${todo.completed ? "completed" : ""}">
      ${todo.title}
  </span>
  <div>
  
  <div class="toggle-delete">
  <button class="edit-todo-button">✍🏻</button>
      <input type="checkbox" name="completed" class="todo-checkbox ${
        todo.completed ? "completed" : ""
      }" ${todo.completed ? "checked" : ""}>
      <button class="delete-todo-button">X</button>
  </div>
  </div>
</li>`
    )
    .join("");
  todos.innerHTML = todoElements;
}

export default render;

const todoStore = {
  todos: [],
};

// traps
const storeHandler = {
  get(target, property) {
    return target[property];
  },
  set(target, property, value) {
    target[property] = value;
    if (property === "todos") {
      window.dispatchEvent(new Event("todoschange"));
    }
    localStorage.setItem("todos", JSON.stringify(todoStore));
    return true;
  },
};
const storeProxy = new Proxy(todoStore, storeHandler);

function addTodo(newTodo) {
  storeProxy.todos = [...storeProxy.todos, newTodo];
}

function deleteTodo(id) {
  storeProxy.todos = storeProxy.todos.filter((todo) => todo.id != id);
}

function toggleCompleted(id, completed) {
  storeProxy.todos = storeProxy.todos.map((todo) => {
    if (todo.id === id) {
      return { ...todo, completed: completed };
    } else {
      return todo;
    }
  });
}
export { addTodo, deleteTodo, toggleCompleted };
export default storeProxy;

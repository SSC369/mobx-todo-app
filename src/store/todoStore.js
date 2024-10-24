import { computed, makeAutoObservable, reaction } from "mobx";

class TodoStore {
  todos = [];
  constructor() {
    makeAutoObservable(
      this,
      {
        getTodos: computed,
      },
      { autoBind: true }
    );

    reaction(
      () => this.todos.slice(),
      (todos) => {
        localStorage.setItem("todos", JSON.stringify(todos));
      }
    );
  }

  get getTodos() {
    return this.todos.length;
  }

  addTodo(todo) {
    this.todos.push(todo);
  }
  removeTodo(id) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }
  clearTodos() {
    this.todos = [];
    localStorage.removeItem("todos");
  }

  toggleStatus(id) {
    this.todos = this.todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isCompleted: !todo.isCompleted };
      }
      return todo;
    });
  }
  updateTodo(id, name) {
    const updatedTodos = this.todos.map((todo) => {
      if (todo.id === id) {
        return { id, name };
      }
      return todo;
    });
    this.todos = updatedTodos;
  }
}

const todoStore = new TodoStore();
export default todoStore;

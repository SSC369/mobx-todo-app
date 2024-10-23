import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import todoStore from "./store/todoStore";
todoStore;
import { v4 } from "uuid";

const App = observer(() => {
  const handleAddTodo = (e) => {
    const inputValue = e.target.value.trim();
    if (e.key === "Enter") {
      if (!inputValue) {
        alert("Todo is empty");
        return;
      }
      const todo = {
        id: v4(),
        name: inputValue,
        isCompleted: false,
      };
      todoStore.addTodo(todo);
    }
  };

  const getTodosLength = () => {
    console.log(todoStore.getTodos);
  };

  const handleStatus = (id) => {
    todoStore.toggleStatus(id);
  };

  const handleDelete = (id) => {
    todoStore.removeTodo(id);
  };

  return (
    <div className="bg-slate-200 h-dvh">
      <div className="flex flex-col gap-2 items-center">
        <label htmlFor="todo">Create Todo</label>
        <input
          className="bg-white p-2 rounded-xl outline-none"
          onKeyDown={handleAddTodo}
          id="todo"
          type="text"
        />

        <button onClick={getTodosLength}>Get</button>
        <button onClick={todoStore.clearTodos}>Clear</button>
      </div>

      <ul className="m-auto w-fit  list-disc mt-4">
        {todoStore.todos.map((todo) => {
          const { id, name, isCompleted } = todo;
          return (
            <li className="flex items-center gap-2" key={id}>
              <p className={`${isCompleted ? "line-through" : ""}`}>{name}</p>
              <input onChange={() => handleStatus(id)} type="checkbox" />
              <p onClick={() => handleDelete(id)}>Delete</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
});

export default App;

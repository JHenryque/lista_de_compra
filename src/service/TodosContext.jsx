/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer, useState } from "react";

export const TodosContext = createContext("");

const listaProdutos = localStorage.getItem("task")
  ? JSON.parse(localStorage.getItem("task"))
  : [
      // {
      //   id: 1,
      //   quantity: 2,
      //   name: "Arroz",
      //   price: 8.0,
      //   isDone: false,
      //   active: false,
      //   isInBag: false,
      // },
      // {
      //   id: 2,
      //   quantity: 1,
      //   name: "Feijão",
      //   price: 6.0,
      //   isDone: false,
      //   active: false,
      //   isInBag: false,
      // },
      // {
      //   id: 3,
      //   quantity: 1,
      //   name: "Macarrão",
      //   price: 5.0,
      //   isDone: false,
      //   active: false,
      //   isInBag: false,
      // },
      // {
      //   id: 4,
      //   quantity: 1,
      //   name: "Leite",
      //   price: 3.0,
      //   isDone: false,
      //   active: false,
      //   isInBag: false,
      // },
      // {
      //   id: 5,
      //   name: "Ovo",
      //   price: 2.0,
      //   quantity: 1,
      //   isDone: false,
      //   active: false,
      //   isInBag: false,
      // },
      // {
      //   id: 6,
      //   name: "Café",
      //   price: 1.0,
      //   quantity: 1,
      //   isDone: false,
      //   active: false,
      //   isInBag: false,
      // },
    ];

export function TodosProvider({ children }) {
  const [task, disphatch] = useReducer(todosReducer, listaProdutos);
  const [modalIsActive, setModalIsActive] = useState(false);
  const [addIsActive, setAddIsActive] = useState(false);
  const [erroNoSalva, setErroNoSalva] = useState("");
  const [edited, setEdited] = useState({});
  const [took, setTook] = useState(false);

  return (
    <>
      <section>
        <TodosContext.Provider
          value={{
            task,
            disphatch,
            modalIsActive,
            setModalIsActive,
            addIsActive,
            setAddIsActive,
            erroNoSalva,
            setErroNoSalva,
            edited,
            setEdited,
            took,
            setTook,
          }}
        >
          {children}
        </TodosContext.Provider>
      </section>
    </>
  );
}

export function useTodos() {
  return useContext(TodosContext);
}

export default function todosReducer(todos, action) {
  switch (action.type) {
    case "delected": {
      if (confirm("Tem certeza que deseja excluir?")) {
        return todos.filter((todo) => todo.id !== action.id);
      }
      return todos;
    }
    case "added": {
      let newTask = action.newTask;
      return [...todos, newTask];
    }
    case "edited": {
      return todos.map((todo) => {
        if (todo.id === action.id) {
          return { ...todo, ...action.editedTask };
        } else {
          return todo;
        }
      });
    }
  }
}

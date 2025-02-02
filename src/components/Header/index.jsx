import style from "./Header.module.css";
import { useTodos } from "../../service/TodosContext";
import AddTask from "../modal/AddTask.jsx";

export default function Header() {
  const store = useTodos();
  return (
    <header className={style.header}>
      <nav className={style.nav_container}>
        <h1>Lista de Compras</h1>
        <button
          className={style.btn_add}
          onClick={() => {
            store.setAddIsActive(true);
          }}
        >
          <i className="fa-solid fa-plus"></i> Compra
        </button>
      </nav>

      {store.addIsActive && <AddTask />}
    </header>
  );
}

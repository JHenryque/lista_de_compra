/* eslint-disable react/prop-types */
import style from "./SalveEdit.module.css";
import { useTodos } from "../../service/TodosContext";

export default function SalveEdit({ itens, onHandler }) {
  const store = useTodos();

  return (
    <>
      <td className={itens.active ? style.tr_error_confirm : ""}>
        <input
          type="number"
          name="quantity"
          min="1"
          autoFocus
          defaultValue={itens.quantity}
          placeholder="QTD"
        />
      </td>
      <td className={itens.active ? style.tr_error_confirm : ""}>
        <input
          id="name"
          type="text"
          name="name"
          defaultValue={itens.name}
          placeholder="Nome"
        />
      </td>
      <td className={itens.active ? style.tr_error_confirm : ""}>
        <input
          type="number"
          name="price"
          defaultValue={itens.price}
          min="1"
          placeholder="Preço"
        />
      </td>

      <td
        className={
          itens.active === false ? style.td_salve : style.tr_error_confirm
        }
      >
        <button onClick={() => onHandler(itens.id)}>
          {itens.isDone ? "Altera" : "Confime"}
        </button>
        {itens.active ? <p>{store.erroNoSalva}</p> : ""}
      </td>

      <td
        className={
          itens.active === false ? style.td_delete : style.tr_error_confirm
        }
      >
        <button
          onClick={() => store.disphatch({ type: "delected", id: itens.id })}
        >
          <i className="fa-solid fa-trash"></i>
        </button>
      </td>
    </>
  );
}

/* eslint-disable react/prop-types */
import style from "./TabelaTbody.module.css";
import { useTodos } from "../../../service/TodosContext";
import SalveEdit from "../../SalveEditar";

export default function TdBody({ items }) {
  const store = useTodos();

  function handelEdit(id) {
    store.setEdited(id);
    store.setModalIsActive(true);
  }

  const condicaoIf = async (editedTask, id) => {
    if (
      editedTask.quantity <= 0 ||
      editedTask.name === "" ||
      editedTask.price <= 0
    ) {
      store.setErroNoSalva("Campos obrigatorios");
      editedTask.active = true;
      editedTask.isDone = false;
      store.disphatch({ type: "edited", id: id, editedTask });
    } else {
      store.setErroNoSalva();
      editedTask.active = false;
      editedTask.isDone = true;
      store.disphatch({ type: "edited", id: id, editedTask });
    }
  };

  const editedHandler = async (id) => {
    store.setModalIsActive(false);

    let editedTask = { id: id };
    editedTask.quantity = document.querySelector("input[name=quantity]").value;
    editedTask.name = document.querySelector("input[name=name]").value;
    editedTask.price = document.querySelector("input[name=price]").value;

    await condicaoIf(editedTask, id);
  };

  return (
    <tr key={items.id} className={items.isDone ? style.tr_sucess : ""}>
      {store.modalIsActive && items.id === store.edited ? (
        <SalveEdit itens={items} onHandler={editedHandler} />
      ) : (
        <>
          <td>{items.quantity}</td>
          <td>{items.name}</td>
          <td>{Number(items.price).toFixed(2)}</td>
          <td>R$ {(items.price * items.quantity).toFixed(2)}</td>
          <td className={style.td_salve}>
            <button
              className={items.isDone ? style.btn_sucess : style.btn_edit}
              onClick={() => handelEdit(items.id)}
            >
              {!items.isDone === true ? (
                <i className="fa-solid fa-pen-to-square"></i>
              ) : (
                <i className="fa-solid fa-check"></i>
              )}
            </button>
          </td>
        </>
      )}
    </tr>
  );
}

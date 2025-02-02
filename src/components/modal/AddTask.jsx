import style from "./addTask.module.css";
import { useEffect, useRef, useState } from "react";
import { useTodos } from "../../service/TodosContext";

export default function AddTask() {
  const store = useTodos();
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [campoObrigatorio, setCampoObrigatorio] = useState("");

  const inputRef = useRef(null);

  function handleAddTask() {
    const eIguallo = store.task.some(
      (obj) => obj.name.toLowerCase() === name.trim().toLowerCase()
    );

    if (name === "") {
      setCampoObrigatorio("Preencha o nome do produto");
      return;
    }

    if (price <= 0) {
      setCampoObrigatorio("O Preço nao pode ser negativos");
      setPrice(0);
    }

    if (eIguallo) {
      setCampoObrigatorio("Produto ja adicionado na lista");
      return;
    } else {
      if (quantity === 0 || price === 0) {
        store.task.active = true;
        store.setErroNoSalva("Campos obrigatorios");
        setQuantity(0);
      } else {
        store.task.isDone = true;
        store.task.active = false;
      }

      setCampoObrigatorio("");
      const newTask = {
        id: store.task.length
          ? Math.max(...store.task.map((todo) => todo.id)) + 1
          : 1,
        quantity: quantity,
        name: name,
        price: price,
        isDone: store.task.isDone ? true : false,
        active: store.task.active ? true : false,
      };

      store.disphatch({ type: "added", newTask });
      store.setModalIsActive(false);
      store.setAddIsActive(false);
    }
  }

  useEffect(() => {
    inputRef.current?.focus(); // Define o foco quando o componente é montado
  }, []);

  return (
    <div className={style.add_production}>
      <button
        className={style.close}
        onClick={() => store.setAddIsActive(false)}
      >
        X
      </button>
      <div className={style.box_container}>
        <div className={style.formul}>
          <label htmlFor="quantidade">Quantidade:</label>
          <input
            type="number"
            id="quantidade"
            value={quantity}
            min="1"
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Quantidade"
          />
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Digite o nome do produto"
            ref={inputRef}
          />
          <label htmlFor="price">Preço:</label>
          <input
            type="number"
            id="price"
            value={price}
            min="1"
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Preço"
          />

          <button className={style.add_btn} onClick={handleAddTask}>
            Add
          </button>
        </div>

        {campoObrigatorio && (
          <di className={style.error}>
            {" "}
            <p>{campoObrigatorio}</p>{" "}
          </di>
        )}
      </div>
    </div>
  );
}

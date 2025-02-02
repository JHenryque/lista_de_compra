import { useTodos } from "../../../service/TodosContext";
import style from "../Tabela.module.css";

export default function TableJfoot() {
  const store = useTodos();
  let acitve = store.task.filter((todo) => todo);

  function valorTotal() {
    let total = 0;
    store.task.forEach((produtos) => {
      total += produtos.price * produtos.quantity;
    });

    return total;
  }
  return (
    <tr>
      {valorTotal() > 0 && (
        <>
          <th className={style.qtd_total}>{acitve.length}</th>
          <th>{"<-"} Qtd Compras</th>

          <th>Total a Pagar: </th>
          <th className={style.total}>
            {acitve.length > 0 ? `R$ ${valorTotal().toFixed(2)}` : ""}
          </th>
        </>
      )}
    </tr>
  );
}

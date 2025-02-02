import style from "./Tabela.module.css";
import { useEffect } from "react";
import { useTodos } from "../../service/TodosContext";
import TableJfoot from "./TableJfoot";
import TdBody from "./TdBody";

export default function TabelaCompra() {
  const store = useTodos();

  useEffect(() => {
    localStorage.setItem("task", JSON.stringify(store.task));
  }, [store.task]);

  const handleRemoveTodos = () => {
    if (window.confirm("Tem certeza que deseja excluir?")) {
      localStorage.removeItem("task");
    }
    window.location.replace(window.location.href);
  };

  return (
    <section className={style.container_main_scroll}>
      <div className={style.container_table}>
        {store.task.length > 0 && (
          <button
            className={style.btn_remove_tudos}
            onClick={handleRemoveTodos}
          >
            Remover Todos
          </button>
        )}
        <table className={style.table}>
          {store.task.length > 0 ? (
            <>
              <thead>
                <tr>
                  <th>Qtd</th>
                  <th className={style.name}>Nome</th>
                  <th>Preço Unidade</th>
                  <th>Preço Total</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {store.task.map((produtos) => (
                  <TdBody key={produtos.id} items={produtos} />
                ))}
              </tbody>
            </>
          ) : (
            <h2 style={{ textAlign: "center" }}>Nenhuma compra registrada</h2>
          )}
        </table>
        <table>
          <tfoot className={style.foot}>
            <TableJfoot />
          </tfoot>
        </table>
      </div>
    </section>
  );
}

import style from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={style.footer_container}>
      <p>
        <b>
          <i className="fa-regular fa-copyright"></i>
        </b>{" "}
        2025 Todos os direitos reservados
      </p>
      <span>
        Desenvolvido por <b>Henrique</b>
      </span>
      <p>
        <a href="https://meu-portfolio-pi-pied.vercel.app/" target="_blank">
          clique aqui para contato.
        </a>
      </p>
    </footer>
  );
}

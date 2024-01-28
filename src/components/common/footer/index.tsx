import { Container } from "reactstrap";
import styles from "./styles.module.scss";

export default function Footer(){
  return(
    <>
    	<Container className={styles.footer}>
        <img src="/CursosFlixLogo.png" alt="logoFooter" className={styles.footerLogo} />
        <a href="" target={"blank"} className={styles.footerLink}>CursosFlix.com</a>
      </Container>
    </>
  )
}
import css from "./page.module.css";
import Button from "@/components/Button/Button";

export default function NotFound() {
  return (
    <main>
      <div className={css.container}>
        <h1>404 - Page not found</h1>
        <p>Sorry, the page you are looking for does not exist.</p>
        <Button href="/" text="Back Home" className={css.btnBackHome} />
      </div>
    </main>
  );
}
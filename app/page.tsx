import Button from "@/components/Button/Button";
import css from "./page.module.css";

export default function Home() {
  return (
    <main>
      <section className={css.heroSection}>
        <div className={css.container}>
          <h1 className={css.heroTitle}>Campers of your dreams</h1>
          <p className={css.heroText}>
            You can find everything you want in our catalog
          </p>
          <Button href="/catalog" text="View Now" className={css.btnViewNow} />
        </div>
      </section>
    </main>
  );
}
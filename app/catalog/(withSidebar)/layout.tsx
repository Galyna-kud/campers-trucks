import css from "./LayoutCatalog.module.css";

interface CatalogLayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}

export default function CatalogLayout({
  children,
  sidebar,
}: CatalogLayoutProps) {
  return (
    <div className={css.container}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <main className={css.catalogWrapper}>{children}</main>
    </div>
  );
}
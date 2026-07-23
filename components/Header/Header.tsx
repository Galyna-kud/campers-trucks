"use client";
import Link from "next/link";
import css from "./Header.module.css";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";
import BurgerMenu from "../BurgerMenu/BurgerMenu";

export default function Header() {
  const pathname = usePathname();

  const isCatalog = pathname === "/catalog";
  const isHome = pathname === "/";

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const openMenu = () => setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={css.header}>
      <div className={css.headerContainer}>
        <Link className={css.logo} href="/" aria-label="Home">
          <svg aria-hidden="true" width={136} height={16}>
            <use href="/icons/sprite.svg#icon-logo" />
          </svg>
        </Link>
        <button className={css.btnBurger} type="button" onClick={openMenu}>
          <RxHamburgerMenu className={css.burgerIcon} />
        </button>
        <BurgerMenu onClose={closeMenu} isOpen={isMenuOpen} />
        <nav className={css.headerNav} aria-label="Main Navigation">
          <ul className={css.headerList}>
            <li className={css.headerItem}>
              <Link
                className={clsx(css.headerLink, isHome ? css.activeLink : "")}
                href="/"
              >
                Home
              </Link>
            </li>
            <li className={css.headerItem}>
              <Link
                className={clsx(
                  css.headerLink,
                  isCatalog ? css.activeLink : "",
                )}
                href="/catalog"
              >
                Catalog
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
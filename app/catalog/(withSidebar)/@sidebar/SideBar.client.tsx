"use client";

import Button from "@/components/Button/Button";
import FormFilters from "@/components/FormFilters/FormFilters";
import css from "./SidebarCatalog.module.css";
import { GetCampersFiltersResponse } from "@/lib/api";
import { useState } from "react";
import clsx from "clsx";
import ButtonClose from "@/components/ButtonClose/ButtonClose";

interface SideBarClientProps {
  filtersData: GetCampersFiltersResponse;
}

export default function SideBarClient({ filtersData }: SideBarClientProps) {
  const [isOpen, setIsOpen] = useState(false);
  const filtersOpen = () => setIsOpen(true);
  const filtersClose = () => setIsOpen(false);

  return (
    <div className={css.container}>
      <Button
        className={css.btnFilters}
        text="Search and Filters"
        onClick={filtersOpen}
      />
      <div className={clsx(css.filtersWrapper, isOpen && css.isOpen)}>
        <ButtonClose className={css.filtersCloseBtn} onClose={filtersClose} />
        <FormFilters
          initialData={filtersData}
          onClose={() => setIsOpen(false)}
        />
      </div>
    </div>
  );
}
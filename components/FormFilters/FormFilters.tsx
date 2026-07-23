"use client";

import { GetCampersFiltersResponse } from "@/lib/api";
import css from "./FormFilters.module.css";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useRef } from "react";
import { IoMapOutline } from "react-icons/io5";
import Button from "../Button/Button";
import { IoClose } from "react-icons/io5";
import { formatText } from "@/utils/formatters";

interface FormFiltersProps {
  initialData: GetCampersFiltersResponse;
  onClose?: () => void;
}

export default function FormFilters({
  initialData,
  onClose,
}: FormFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const params = new URLSearchParams();

    formData.forEach((value, key) => {
      if (value) params.set(key, value.toString());
    });

    router.push(`/catalog?${params.toString()}`);
    onClose?.();
  };

  const handleReset = () => {
    formRef.current?.reset();
    router.push("/catalog");
    onClose?.();
  };

  return (
    <form className={css.form} onSubmit={handleSubmit} ref={formRef}>
      <label htmlFor="location" className={css.locationLabel}>
        Location
      </label>
      <div className={css.inputWrapper}>
        <IoMapOutline className={css.iconLocation} />
        <input
          type="text"
          id="location"
          name="location"
          placeholder="City"
          defaultValue={searchParams.get("location") || ""}
          className={css.input}
        />
      </div>

      <h2 className={css.filtersTitle}>Filters</h2>

      <div className={css.filtersWrapper}>
        <fieldset className={css.fieldset}>
          <legend className={css.legend}>Camper form</legend>
          <div className={css.radioGroup}>
            {initialData.forms.map((form) => (
              <label key={form} className={css.radioLabel}>
                <input
                  type="radio"
                  name="form"
                  value={form}
                  defaultChecked={searchParams.get("form") === form}
                  className={css.hiddenRadio}
                />
                <span className={css.customRadio}></span>
                <span className={css.option}>{formatText(form)}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className={css.fieldset}>
          <legend className={css.legend}>Engine</legend>
          <div className={css.radioGroup}>
            {initialData.engines.map((engine) => (
              <label key={engine} className={css.radioLabel}>
                <input
                  type="radio"
                  name="engine"
                  value={engine}
                  defaultChecked={searchParams.get("engine") === engine}
                  className={css.hiddenRadio}
                />
                <span className={css.customRadio}></span>
                <span className={css.option}>{engine}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className={css.fieldset}>
          <legend className={css.legend}>Transmission</legend>
          <div className={css.radioGroup}>
            {initialData.transmissions.map((trans) => (
              <label key={trans} className={css.radioLabel}>
                <input
                  type="radio"
                  name="transmission"
                  value={trans}
                  defaultChecked={searchParams.get("transmission") === trans}
                  className={css.hiddenRadio}
                />
                <span className={css.customRadio}></span>
                <span className={css.option}>{trans}</span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <div className={css.actions}>
        <Button text="Search" type="submit" className={css.btnSearch} />
        <Button onClick={handleReset} className={css.btnClear} type="button">
          <IoClose className={css.closeIcon} />
          Clear filters
        </Button>
      </div>
    </form>
  );
}
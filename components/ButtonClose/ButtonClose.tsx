import { IoIosClose } from "react-icons/io";
import css from "./ButtonClose.module.css";
import clsx from "clsx";

interface ButtonCloseProps {
  onClose: () => void;
  className?: string;
}

export default function ButtonClose({ onClose, className }: ButtonCloseProps) {
  return (
    <button
      className={clsx(css.btnClose, className)}
      type="button"
      onClick={onClose}
    >
      <IoIosClose className={css.closeIcon} />
    </button>
  );
}
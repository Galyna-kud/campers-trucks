import css from "./ErrorState.module.css";
import Button from "../Button/Button";

interface ErrorStateProps {
  onRetry?: () => void;
}

export default function ErrorState({ onRetry }: ErrorStateProps) {
  return (
    <div className={css.container}>
      <p>Something went wrong. Please try again.</p>
      {onRetry && (
        <Button onClick={onRetry} text="Retry" className={css.btnRetry} />
      )}
    </div>
  );
}
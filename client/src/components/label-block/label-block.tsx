import styles from "./label-block.module.css";

export interface LabelBlockProps {
  label: string;
  text?: string;
}

export const LabelBlock: React.FC<LabelBlockProps> = ({ label, text }) => {
  return (
    <div className={styles["container"]}>
      <span className={styles["container__label"]}>{label}</span>
      <span className={styles["container__text"]}>{text}</span>
    </div>
  );
};

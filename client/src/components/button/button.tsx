import styles from "./button.module.css";

export interface ButtonProps {
  title: string;
  onClick: () => Promise<void> | void;
}

export const Button: React.FC<ButtonProps> = ({ title, onClick }) => {
  return (
    <button className={styles["container"]} onClick={onClick}>
      {title}
    </button>
  );
};

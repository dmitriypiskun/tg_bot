import styles from "./header.module.css";

export interface HeaderProps {
  title: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <div className={styles["container"]}>
      <span className={styles["content__title"]}>{title}</span>
    </div>
  );
};

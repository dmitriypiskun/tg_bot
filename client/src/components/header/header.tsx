import { PropsWithChildren } from "react";
import styles from "./header.module.css";

export interface HeaderProps {}

export const Header: React.FC<PropsWithChildren<HeaderProps>> = ({
  children,
}) => {
  return <div className={styles["conteiner"]}>{children}</div>;
};

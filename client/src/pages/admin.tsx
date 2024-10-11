import { Header } from "../components";

import styles from "./admin.module.css";

export interface AdminProps {}

export const Admin: React.FC<AdminProps> = () => {
  return (
    <div className={styles["container"]}>
      <Header title="Admin" />

      <div className={styles["container__content"]}></div>
    </div>
  );
};

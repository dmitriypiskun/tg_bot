import { useEffect } from "react";
import styles from "./user-detail.module.css";
import { Header } from "../components";
import { useTelegram } from "../useTelegram";

export function UserDetail() {
  const { tg, user } = useTelegram();

  useEffect(() => {
    tg.ready();
  }, []);

  return (
    <div className={styles["container"]}>
      <Header title="User detail" />

      <main>
        <img src="" alt=""></img>
        <div>{JSON.stringify(user)}</div>
      </main>
    </div>
  );
}

import { useEffect } from "react";
import styles from "./user-detail.module.css";
import { Header } from "../components";
import { useTelegram } from "../useTelegram";
import { LoginButton, TelegramAuthData } from "@telegram-auth/react";

export function UserDetail() {
  const { tg, user } = useTelegram();

  useEffect(() => {
    tg.ready();
  }, []);

  const handleLogin = (response: TelegramAuthData) => {
    console.log(response);
  };

  if (!user) {
    return (
      <LoginButton
        botUsername={"whols_here_bot"}
        buttonSize="large"
        cornerRadius={20}
        showAvatar={false}
        lang="en"
        onAuthCallback={handleLogin}
      />
    );
  }

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

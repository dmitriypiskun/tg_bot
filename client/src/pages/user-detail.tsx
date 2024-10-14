import { useCallback, useEffect, useState } from "react";
import styles from "./user-detail.module.css";
import { Header, LabelBlock } from "../components";
import { useTelegram } from "../useTelegram";
import { LoginButton, TelegramAuthData } from "@telegram-auth/react";
import { User, useUserData } from "../useUser";

export function UserDetail() {
  const [userData, setUserData] = useState<User>();
  const { tg, user } = useTelegram();
  const { createUser } = useUserData();

  useEffect(() => {
    tg.ready();
  }, []);

  const handleLogin = useCallback(async (data: TelegramAuthData) => {
    const user = await createUser({
      tgId: data.id.toString(),
      firstName: data.first_name,
      lastName: data.last_name,
      userName: data.username,
      photo: data.photo_url,
    });

    if (user) {
      setUserData(user);
    }
  }, []);

  if (!user || !userData) {
    return (
      <div className={styles["container"]}>
        <LoginButton
          botUsername={"whols_here_bot"}
          buttonSize="large"
          cornerRadius={20}
          showAvatar={false}
          lang="en"
          onAuthCallback={handleLogin}
        />
      </div>
    );
  }

  return (
    <div className={styles["container"]}>
      <Header title="User detail" />

      <main className={styles["container__content"]}>
        <img
          className={styles["image"]}
          src={userData.photo || ""}
          alt="Avatar"
        />

        <div className={styles["column"]}>
          <LabelBlock label="Telegram ID" text={userData.tgId} />
          <LabelBlock label="First name" text={userData.firstName} />
          <LabelBlock label="Last name" text={userData.lastName || " - "} />
          <LabelBlock label="User name" text={userData.userName || " - "} />
          <LabelBlock label="Phone" text={userData.phone || " - "} />
          <LabelBlock label="Language" text={userData.language || " - "} />
        </div>
      </main>
    </div>
  );
}

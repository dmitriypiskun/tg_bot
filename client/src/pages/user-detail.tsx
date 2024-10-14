import { useEffect, useState } from "react";
import styles from "./user-detail.module.css";
import { Header, LabelBlock } from "../components";
import { LoginButton, TelegramAuthData } from "@telegram-auth/react";
import { User, useUserData } from "../useUser";
import { useTelegram } from "../useTelegram";

export function UserDetail() {
  const [userData, setUserData] = useState<User>();
  const { user } = useTelegram();
  const { createUser } = useUserData();

  useEffect(() => {
    if (user) {
      createUser({
        tgId: user.id.toString(),
        firstName: user.first_name,
        lastName: user.last_name,
        userName: user.username,
        photo: user.photo_url,
      }).then((result) => {
        if (result) {
          setUserData(result);
        }
      });
    }
  }, [user]);

  const handleLogin = async (data: TelegramAuthData) => {
    const result = await createUser({
      tgId: data.id.toString(),
      firstName: data.first_name,
      lastName: data.last_name,
      userName: data.username,
      photo: data.photo_url,
    });

    if (result) {
      setUserData(result);
    }
  };

  if (!userData && !user) {
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
          src={userData?.photo || ""}
          alt="Avatar"
        />

        <div className={styles["column"]}>
          <LabelBlock label="Telegram ID" text={userData?.tgId} />
          <LabelBlock label="First name" text={userData?.firstName} />
          <LabelBlock label="Last name" text={userData?.lastName || " - "} />
          <LabelBlock label="User name" text={userData?.userName || " - "} />
          <LabelBlock label="Phone" text={userData?.phone || " - "} />
          <LabelBlock label="Language" text={userData?.language || " - "} />
        </div>
      </main>
    </div>
  );
}

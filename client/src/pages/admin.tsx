import { useEffect, useMemo, useState } from "react";
import { Header } from "../components";
import { User, useUserData } from "../useUser";

import styles from "./admin.module.css";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import locale from "rc-pagination/lib/locale/en_US";
import { useDebounce } from "use-debounce";
import { LoginButton, TelegramAuthData } from "@telegram-auth/react";
import { useTelegram } from "../useTelegram";

export interface AdminProps {}

export const Admin: React.FC<AdminProps> = () => {
  const [search, setSearch] = useState("");
  const [limit] = useState(1);
  const [offset, setOffset] = useState(0);
  const [countPages, setCountPages] = useState(0);
  const [users, setUsers] = useState<User[]>([]);
  const [isLogin, setIsLogin] = useState(false);
  const { getUserList, getUser } = useUserData();
  const { user } = useTelegram();

  const currentPage = useMemo(() => Math.ceil(offset / limit), [offset, limit]);

  const [searchValue] = useDebounce(search, 1000);

  useEffect(() => {
    getUserList({ limit, offset, search: searchValue }).then((result) => {
      if (result) {
        setUsers(result.users);
        setCountPages(Math.ceil(result.count / limit));
      }
    });
  }, [searchValue, limit, offset]);

  const handleOffsetChange = (page: number, pageSize: number) => {
    setOffset(page * pageSize);
  };

  const handleLogin = async (data: TelegramAuthData) => {
    const result = await getUser(data.id);
    setIsLogin(!!result);
  };

  if (!isLogin && !user) {
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
      <Header title="Admin" />

      <div className={styles["container__content"]}>
        <div className={styles["search__wrapper"]}>
          <input
            type="search"
            value={search}
            placeholder="Search"
            className={styles["search"]}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <table className={styles["table"]}>
          <thead>
            <tr>
              <th className={styles["head__cell"]}>Avatar</th>
              <th className={styles["head__cell"]}>Telegram ID</th>
              <th className={styles["head__cell"]}>First name</th>
              <th className={styles["head__cell"]}>Second name</th>
              <th className={styles["head__cell"]}>User name</th>
              <th className={styles["head__cell"]}>Phone</th>
              <th className={styles["head__cell"]}>Language</th>
              <th className={styles["head__cell"]}>Create Date</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  {user.photo ? (
                    <img
                      className={styles["avatar"]}
                      src={user.photo}
                      alt={user.firstName}
                    />
                  ) : (
                    ""
                  )}
                </td>
                <td>{user.tgId}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.userName}</td>
                <td>{user.phone}</td>
                <td>{user.language}</td>
                <td>{user.createdAt.toString()}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination
          hideOnSinglePage
          current={currentPage}
          pageSize={limit}
          total={countPages}
          locale={locale}
          onChange={handleOffsetChange}
        />
      </div>
    </div>
  );
};

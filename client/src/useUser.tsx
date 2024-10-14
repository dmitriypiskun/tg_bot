export interface User {
  id: string;
  tgId: string;
  firstName: string;
  lastName?: string | null;
  phone: string;
  userName?: string | null;
  language?: string | null;
  photo?: string | null;
  createdAt: Date;
}

export interface CreateUserData {
  tgId: string;
  firstName: string;
  lastName?: string | null;
  userName?: string | null;
  photo?: string | null;
}

export interface GetUserListData {
  users: User[];
  count: number;
}

export interface GetUserLIstOptions {
  search?: string;
  offset?: number;
  limit?: number;
}

const API_URL = import.meta.env.VITE_API_URL;

export const useUserData = () => {
  const getUser = async (tgId: number): Promise<User | null> => {
    try {
      const response = await fetch(`${API_URL}?tgId=${tgId}`);
      return response.json();
    } catch (err) {
      console.log((err as Error).message);
      return null;
    }
  };

  const getUserList = async (
    options?: GetUserLIstOptions
  ): Promise<GetUserListData | null> => {
    try {
      const params: string[] = [];

      if (options?.limit) {
        params.push(`limit=${options.limit}`);
      }

      if (options?.offset) {
        params.push(`offset=${options.offset}`);
      }

      if (options?.search) {
        params.push(`search=${options.search}`);
      }

      const query = params.join("&");

      const response = await fetch(
        `${API_URL}/admin${query ? `?${query}` : ""}`
      );
      return response.json();
    } catch (err) {
      console.log((err as Error).message);
      return null;
    }
  };

  const createUser = async (data: CreateUserData): Promise<User | null> => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return response.json();
    } catch (err) {
      console.log((err as Error).message);
      return null;
    }
  };

  return {
    getUser,
    getUserList,
    createUser,
  };
};

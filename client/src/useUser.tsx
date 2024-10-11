export const useUserData = async () => {
  const getUser = async () => {
    try {
      const response = (await fetch("http://localhost:3000")).json();
      return response;
    } catch (err) {
      console.log((err as Error).message);
    }
  };

  const getUserList = async () => {
    try {
      const response = (await fetch("http://localhost:3000/admin")).json();
      return response;
    } catch (err) {
      console.log((err as Error).message);
    }
  };

  return {
    getUser,
    getUserList,
  };
};

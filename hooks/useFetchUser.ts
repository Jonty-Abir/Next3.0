import { getUser, getUserToken } from "@/library/helper";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default async function useFetch(query: string) {
  const [userData, setUserData] = useState({
    user: undefined,
    userError: null,
    isLoading: false,
  });

  /***_______     ________**/
  const state = useSelector((state: any) => state.app.client);
  useEffect(() => {
    const fun = async () => {
      try {
        const decoded: any = await getUserToken();
        const check = state?.userName ? query : decoded?.username;
        setUserData((prevState) => ({ ...prevState, isLoading: true }));
        const {
          data: { user },
          status,
        } = await getUser({ username: check });
        setUserData((prevState) => ({
          ...prevState,
          isLoading: true,
          user: user,
        }));
      } catch (err: any) {
        setUserData((prevState) => ({
          ...prevState,
          isLoading: false,
          userError: err,
        }));
      }
    };
    fun();
  }, [state, query]);
  if (userData.user) return userData;
}

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUser } from "../library/helper";

export default function useCustom(query: any) {
  const [userDetail, setUserDetail] = useState({
    isLoading: false,
    apiData: undefined,
    status: null,
    error: null,
  });
  const state = useSelector((state: any) => state.app.client);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setUserDetail((prev) => ({ ...prev, isLoading: true }));
        const { data, status }: any = await getUser({
          username: state.userName,
        });
        setUserDetail((prev) => ({
          ...prev,
          isLoading: false,
          apiData: data,
          status: status,
        }));
      } catch (err: any) {
        setUserDetail((prev) => ({ ...prev, isLoading: false, error: err }));
        return Promise.reject(err);
      }
    };
    fetchData();
  }, [query, state.userName]);
  return [userDetail, setUserDetail];
}

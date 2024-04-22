import { axiosApi } from "@server/axios.config";

export const login = async (userData: ILogin) => {
  const { data } = await axiosApi.post("/api/auth/local", userData);
  return data;
};

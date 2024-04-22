import { axiosApi } from "@server/axios.config";

export const getAllProducts = async (page: number = 1): Promise<any> => {
  const { data } = await axiosApi.get(
    `/api/products/?pagination[pageSize]=8&sort[createdAt]=DESC&populate=thumbnail,category&pagination[page]=${page}`
  );

  return data;
};
export const getProduct = async (id: number): Promise<IProduct> => {
  const { data } = await axiosApi.get(`/api/products/${id}?populate=thumbnail`);
  return data.data;
};

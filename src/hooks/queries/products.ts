import { getAllProducts, getProduct } from "@services/index";
import { useQuery } from "react-query";

export const useAllProducts = (page: number = 1) => {
  return useQuery({
    queryKey: ["products", `products-page-${page}`],
    queryFn: () => getAllProducts(page),
  });
};
export const useProduct = (id: number) => {
  return useQuery({
    queryKey: ["products", `product-${id}`],
    queryFn: () => getProduct(id),
  });
};

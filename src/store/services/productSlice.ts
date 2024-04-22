import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import cookiesServics from "@services/cookies.servics";

interface IProductsQuery {
  data: IProduct[];
  meta: { pagination: { pageCount: number; page: number } };
}

export const productSlice = createApi({
  reducerPath: "api",
  tagTypes: ["Products"],
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
  }),
  endpoints: (builder) => ({
    productsDashboard: builder.query<IProductsQuery, { page: number }>({
      query: (args) => {
        const { page } = args;

        return {
          url: `/api/products/?pagination[pageSize]=8&sort[createdAt]=DESC&populate=thumbnail,category&pagination[page]=${page}`,
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({
                type: "Products" as const,
                id,
              })),
              { type: "Products", id: "LIST" },
            ]
          : [{ type: "Products", id: "LIST" }],
    }),
    deleteProductDashboard: builder.mutation({
      query: (id: number) => {
        return {
          url: `/api/products/${id}`,
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${cookiesServics.getCookie("token")}`,
          },
        };
      },
      invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),
    updateProductDashboard: builder.mutation({
      query: (args) => {
        const { id, body } = args;

        return {
          url: `/api/products/${id}`,
          method: "PUT",
          headers: {
            Authorization: `Bearer ${cookiesServics.getCookie("token")}`,
          },
          body,
        };
      },
      invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),
    addProductDashboard: builder.mutation({
      query: (args) => {
        const { body } = args;

        return {
          url: `/api/products`,
          method: "POST",
          headers: {
            Authorization: `Bearer ${cookiesServics.getCookie("token")}`,
          },
          body,
        };
      },
      invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),
  }),
});

export const {
  useProductsDashboardQuery,
  useDeleteProductDashboardMutation,
  useUpdateProductDashboardMutation,
  useAddProductDashboardMutation,
} = productSlice;

import ProductsList from "@components/ProductsList";
import NoProducts from "@components/ui/NoProducts";
import Pagination from "@components/ui/Pagination";
import { useAllProducts } from "@hooks/queries/products";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Products() {
  const queryParams = new URLSearchParams(window.location.search);
  const [page, setPage] = useState(Number(queryParams.get("page") || 1));

  const { data, isLoading, isError, error, isSuccess } = useAllProducts(
    page as number
  );
  const navigate = useNavigate();
  const pagi = data?.meta.pagination;

  useEffect(() => {
    if (isSuccess) navigate(`/products?page=${pagi?.page}`);
  }, [isSuccess, pagi, navigate]);

  if (isSuccess && !data?.data?.length) {
    return <NoProducts />;
  }

  return (
    <>
      {/* Products list */}
      <ProductsList
        data={data?.data}
        isLoading={isLoading}
        isError={isError}
        error={error as string}
      />

      {/* Pagination */}
      {isSuccess && (
        <Pagination page={page} setPage={setPage} pageCount={pagi?.pageCount} />
      )}
    </>
  );
}

export default Products;

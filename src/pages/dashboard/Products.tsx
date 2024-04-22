import TableProducts from "@components/dashboard/ProductTable/TableProducts";
import Pagination from "@components/ui/Pagination";
import STableProducts from "@components/ui/Skeletons/STableProducts";
import ErrorBoundry from "@components/ui/Status/ErrorBoundry";
import Loading from "@components/ui/Status/Loading";
import { selectNetwork } from "@store/features/NetworkSlice";
import { useProductsDashboardQuery } from "@store/services/productSlice";
import { useAppSelector } from "@store/strore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Products() {
  const queryParams = new URLSearchParams(window.location.search);
  const [page, setPage] = useState(Number(queryParams.get("page") || 1));

  const { data, isLoading, isError, error, isSuccess } =
    useProductsDashboardQuery({
      page,
    });
  const { isOnline } = useAppSelector(selectNetwork);
  const navigate = useNavigate();
  const pagi = data?.meta.pagination;

  useEffect(() => {
    if (isSuccess) navigate(`/dashboard?page=${pagi?.page}`);
  }, [isSuccess, pagi, navigate]);

  return (
    <>
      <Loading
        isLoading={isLoading || isOnline}
        count={5}
        skeletonComp={() => <STableProducts />}
      >
        <ErrorBoundry isError={isError} errorText={error as string}>
          <TableProducts products={data?.data.length ? data.data : []} />
        </ErrorBoundry>
      </Loading>

      {isSuccess && data?.data.length && (
        <Pagination
          page={page}
          setPage={setPage}
          pageCount={pagi?.pageCount as number}
        />
      )}
    </>
  );
}

export default Products;

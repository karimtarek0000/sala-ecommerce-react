import GridLayout from "@components/layout/GridLayout";
import GridList from "@components/layout/GridList";
import ProductCard from "@components/ProductCard";
import SproductCard from "@components/ui/Skeletons/SproductCard";
import ErrorBoundry from "@components/ui/Status/ErrorBoundry";
import Loading from "@components/ui/Status/Loading";
import { selectNetwork } from "@store/features/NetworkSlice";
import { useAppSelector } from "@store/strore";

const ProductsList = (props: IProductsList) => {
  const { data, isLoading, isError, error } = props;
  const { isOnline } = useAppSelector(selectNetwork);

  return (
    <GridLayout>
      <Loading
        isLoading={isLoading || isOnline}
        count={8}
        skeletonComp={() => <SproductCard />}
      >
        <ErrorBoundry isError={isError} errorText={error as string}>
          <GridList
            records={data as []}
            renderComp={(record) => <ProductCard product={record} />}
          />
        </ErrorBoundry>
      </Loading>
    </GridLayout>
  );
};

export default ProductsList;

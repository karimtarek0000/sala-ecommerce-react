import { Flex, VStack } from "@chakra-ui/react";
import ProductDetailsCard from "@components/ProductDetailsCard";
import BackBtn from "@components/ui/BackBtn";
import SproductDetailsCard from "@components/ui/Skeletons/SproductDetailsCard";
import ErrorBoundry from "@components/ui/Status/ErrorBoundry";
import Loading from "@components/ui/Status/Loading";
import { useProduct } from "@hooks/queries/products";
import { selectNetwork } from "@store/features/NetworkSlice";
import { useAppSelector } from "@store/strore";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useProduct(Number(id) ?? 1);
  const { isOnline } = useAppSelector(selectNetwork);

  console.log("run");

  return (
    <Flex
      maxW={"md"}
      justifyContent={"center"}
      alignItems={"center"}
      mx={"auto"}
    >
      <Loading
        isLoading={isLoading || isOnline}
        count={1}
        skeletonComp={() => <SproductDetailsCard />}
      >
        <ErrorBoundry isError={isError} errorText={error as string}>
          <VStack mx={"20px"} alignItems={"start"}>
            <BackBtn />
            <ProductDetailsCard product={data as IProduct} />
          </VStack>
        </ErrorBoundry>
      </Loading>
    </Flex>
  );
};

export default ProductDetails;

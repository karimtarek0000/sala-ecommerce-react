import { Button, Flex } from "@chakra-ui/react";
import ProductsList from "@components/ProductsList";
import NoProducts from "@components/ui/NoProducts";
import { useAllProducts } from "@hooks/queries/products";
import { Link } from "react-router-dom";

const Home = () => {
  const { data, isLoading, isError, error, isSuccess } = useAllProducts();

  if (isSuccess && !data?.data?.length) {
    return <NoProducts />;
  }

  return (
    <>
      <ProductsList
        data={data?.data}
        isLoading={isLoading}
        isError={isError}
        error={error as string}
      />

      {isSuccess && (
        <Flex justifyContent={"center"} my={"50px"}>
          <Button
            as={Link}
            to="/products?page=2"
            colorScheme="teal"
            border={"none"}
            py={7}
            size="lg"
            textTransform={"uppercase"}
            bg={"#9F7AEA"}
            color={"white"}
            _hover={{
              bg: "#9d77ecc4",
            }}
          >
            view more
          </Button>
        </Flex>
      )}
    </>
  );
};

export default Home;

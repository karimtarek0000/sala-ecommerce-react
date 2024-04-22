import { Card, CardBody } from "@chakra-ui/card";
import { Image } from "@chakra-ui/image";
import { Heading, Text } from "@chakra-ui/layout";
import { Button, Stack, VStack } from "@chakra-ui/react";
import { renderImg } from "@utils/index";
import { Link } from "react-router-dom";

const ProductCard = ({ product }: { product: IProduct }) => {
  return (
    <Card border="1px solid #9e576e" bg={"transparent"}>
      <CardBody>
        <Image
          src={renderImg(product)}
          alt="..."
          boxSize="200px"
          rounded="full"
          mx="auto"
          objectFit="cover"
        />

        <Stack mt="6" spacing="6" textAlign="center">
          <VStack>
            <Heading size="md">{product.attributes?.title}</Heading>
            <Text textOverflow={"ellipsis"} minH={"100px"}>
              {product.attributes?.description}
            </Text>
            <Text color="blue.200" fontSize="2xl">
              ${product.attributes?.price.toLocaleString()}
            </Text>
          </VStack>

          <Button
            as={Link}
            to={`/product-details/${product?.id}`}
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
            view details
          </Button>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default ProductCard;

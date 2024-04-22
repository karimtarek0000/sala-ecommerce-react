import {
  Box,
  Button,
  Card,
  CardBody,
  Heading,
  Image,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { addToCart } from "@store/features/cartSlice";
import { useAppDispatch } from "@store/strore";
import { renderImg } from "@utils/index";
import { FaCartShopping } from "react-icons/fa6";

const ProductDetailsCard = ({ product }: { product: IProduct }) => {
  // ----------------- STATE -----------------
  const dispatch = useAppDispatch();

  // ----------------- HANDLER -----------------
  const addToCartHandler = () => dispatch(addToCart(product));

  return (
    <Card minWidth={"400px"} border="1px solid #9e576e" bg={"transparent"}>
      <CardBody>
        <Box
          as="div"
          overflow={"hidden"}
          maxH={"300px"}
          minH={"200px"}
          rounded={"10px"}
        >
          <Image
            src={renderImg(product)}
            alt={product?.attributes.title}
            objectFit="cover"
            width={"100%"}
            height={"100%"}
            maxWidth={"100%"}
          />
        </Box>

        <Stack mt="6" spacing="6" textAlign="center">
          <VStack>
            <Heading as={"h1"} size="md">
              {product?.attributes.title}
            </Heading>
            <Text textOverflow={"ellipsis"} minH={"100px"}>
              {product?.attributes.description}
            </Text>
            <Text color="blue.200" fontSize="2xl">
              ${product?.attributes.price.toLocaleString()}
            </Text>
          </VStack>
          <Button
            onClick={addToCartHandler}
            colorScheme="teal"
            border={"none"}
            py={7}
            size="lg"
            bg={"#9F7AEA"}
            color={"white"}
            _hover={{
              bg: "#9d77ecc4",
            }}
            textTransform={"uppercase"}
          >
            <FaCartShopping />
            <Text mx={"5px"}>add to cart</Text>
          </Button>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default ProductDetailsCard;

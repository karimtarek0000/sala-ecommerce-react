import { Button, Flex, Heading, Image, Text, VStack } from "@chakra-ui/react";
import RenderSVG from "@components/ui/RenderSVG";
import { removeProductFromCart } from "@store/features/cartSlice";
import { useAppDispatch } from "@store/strore";
import { renderImg } from "@utils/index";

const ProductCardInCart = ({ product }: { product: IProdcutCart }) => {
  // ----------------- STATE -----------------
  const dispatch = useAppDispatch();

  // ----------------- HANDLER -----------------
  const removeProductHandler = (): void => {
    dispatch(removeProductFromCart(product));
  };

  return (
    <Flex
      alignItems={"start"}
      position={"relative"}
      gap={"1rem"}
      mb={"1rem"}
      pb={"0.5rem"}
      borderColor={"gray.600"}
      borderBottomWidth={"1px"}
    >
      <Image
        src={renderImg(product)}
        alt="..."
        rounded="full"
        width={"3.75rem"}
        height={"3.75rem"}
        objectFit="cover"
      />

      {/* Remove product from product list */}
      <Button
        onClick={removeProductHandler}
        bg={"transparent"}
        position={"absolute"}
        insetBlockStart={-2}
        insetInlineEnd={-5}
      >
        <RenderSVG name="delete" size="1rem" />
      </Button>

      <VStack alignItems={"start"} flex={3}>
        {/* Title */}
        <Heading noOfLines={1} as={"h5"} size="sm" textTransform={"capitalize"}>
          {product.attributes.title}
        </Heading>

        {/* Desc */}
        <Text noOfLines={1} as={"p"} color="gray.400" fontSize="lg">
          {product.attributes.description}
        </Text>

        {/* Quantity and price */}
        <Flex width={"100%"} justifyContent={"space-between"}>
          <Text as={"span"} color="blue.200" fontSize="lg">
            $
            <Text as={"span"} fontWeight={"bold"}>
              {product.attributes.price.toLocaleString()}
            </Text>
          </Text>
          <Text as={"span"} color="blue.200" fontSize="lg">
            QT:{" "}
            <Text as={"span"} fontWeight={"bold"}>
              {product.quantity}
            </Text>
          </Text>
        </Flex>
      </VStack>
    </Flex>
  );
};

export default ProductCardInCart;

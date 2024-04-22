import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Stack,
  Text,
} from "@chakra-ui/react";
import GridList from "@components/layout/GridList";
import ProductCardInCart from "@components/ProductCardInCart";
import {
  clearAllProductsFromCart,
  selectCart,
} from "@store/features/cartSlice";
import {
  onCloseCartDrawerAction,
  selectGlobal,
  toggleCartDrawer,
} from "@store/features/globalSlice";
import { useAppDispatch, useAppSelector } from "@store/strore";
import { MdOutlineDeleteSweep } from "react-icons/md";

const CartDrawer = () => {
  // ----------------- STATE -----------------
  const { isOpenCartDrawer } = useAppSelector(selectGlobal);
  const { prodcuts } = useAppSelector(selectCart);
  const dispatch = useAppDispatch();

  // ----------------- HANDLER -----------------
  const onCloseHandler = () => dispatch(onCloseCartDrawerAction());
  const clearAllProductsHandler = (): void => {
    dispatch(clearAllProductsFromCart());
    dispatch(toggleCartDrawer());
  };

  return (
    <>
      <Drawer
        isOpen={isOpenCartDrawer}
        placement="right"
        onClose={onCloseHandler}
      >
        <DrawerOverlay />
        <DrawerContent>
          <Stack>
            <DrawerCloseButton />
            <DrawerHeader>Shopping Cart</DrawerHeader>
          </Stack>

          <DrawerBody>
            {!prodcuts.length && (
              <Text textAlign={"center"}>No product yet 🧐</Text>
            )}
            <GridList
              records={prodcuts}
              renderComp={(record) => <ProductCardInCart product={record} />}
            />
          </DrawerBody>

          <DrawerFooter>
            {!!prodcuts.length && (
              <Button onClick={clearAllProductsHandler} colorScheme="red">
                <MdOutlineDeleteSweep transform="scale(1.4)" />
                <Text ms={"5px"}>Clear all</Text>
              </Button>
            )}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CartDrawer;

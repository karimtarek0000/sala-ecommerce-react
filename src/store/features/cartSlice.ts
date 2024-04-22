import { createStandaloneToast } from "@chakra-ui/react";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@store/strore";
import { searchProductExist } from "@utils/index";
const { toast } = createStandaloneToast();

interface InitialState {
  prodcuts: IProdcutCart[];
}

const initialState: InitialState = {
  prodcuts: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<IProduct>) {
      const payload = action.payload;
      const productExist = searchProductExist(payload, state.prodcuts);
      if (productExist?.isExist) {
        state.prodcuts = productExist.productsList;
        toast({
          title: "Quantity incresed",
          description: "This product already exist",
          status: "success",
          position: "top",
          isClosable: true,
        });
        return;
      }
      toast({
        title: "Product added in cart shopping",
        status: "success",
        position: "top",
        isClosable: true,
      });
      state.prodcuts = [...state.prodcuts, { ...action.payload, quantity: 1 }];
    },
    removeProductFromCart(state, action: PayloadAction<IProduct>) {
      const {
        id,
        attributes: { title },
      } = action.payload;

      state.prodcuts = state.prodcuts.filter((product) => product.id !== id);

      toast({
        title: `Product ${title} has been deleted`,
        status: "success",
        position: "top",
        isClosable: false,
      });
    },
    clearAllProductsFromCart(state) {
      state.prodcuts = [];

      toast({
        title: "Has been deleted all products",
        status: "success",
        position: "top",
        isClosable: false,
      });
    },
  },
});

export const { addToCart, removeProductFromCart, clearAllProductsFromCart } =
  cartSlice.actions;
export const selectCart = (state: RootState) => state.cart;
export default cartSlice.reducer;

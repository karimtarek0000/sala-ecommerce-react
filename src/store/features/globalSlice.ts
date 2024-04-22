import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@store/strore";

interface InitialState {
  isOpenCartDrawer: boolean;
  onOpenCartDrawer: boolean;
  onCloseCartDrawer: boolean;
}

const initialState: InitialState = {
  isOpenCartDrawer: false,
  onOpenCartDrawer: false,
  onCloseCartDrawer: false,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    onOpenCartDrawerAction(state) {
      state.isOpenCartDrawer = true;
      state.onOpenCartDrawer = true;
    },
    onCloseCartDrawerAction(state) {
      state.isOpenCartDrawer = false;
      state.onCloseCartDrawer = false;
    },
    toggleCartDrawer(state) {
      state.isOpenCartDrawer = !state.isOpenCartDrawer;
    },
  },
});

export const {
  onOpenCartDrawerAction,
  onCloseCartDrawerAction,
  toggleCartDrawer,
} = globalSlice.actions;
export const selectGlobal = (state: RootState) => state.global;
export default globalSlice.reducer;

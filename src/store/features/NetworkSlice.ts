import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@store/strore";

interface InitialState {
  isOnline: boolean;
}

const initialState: InitialState = {
  isOnline: false,
};

export const networkSlice = createSlice({
  name: "network",
  initialState,
  reducers: {
    setOnlineStatus(state, action: PayloadAction<boolean>) {
      state.isOnline = action.payload;
    },
  },
});

export const { setOnlineStatus } = networkSlice.actions;
export const selectNetwork = (state: RootState) => state.network;
export default networkSlice.reducer;

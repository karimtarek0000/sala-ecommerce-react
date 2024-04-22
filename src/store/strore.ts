import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartSlice from "@store/features/cartSlice";
import globalSlice from "@store/features/globalSlice";
import networkSlice from "@store/features/NetworkSlice";
import { productSlice } from "@store/services/productSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/es/storage";

const cartPersistConfig = {
  key: "cart",
  storage,
};

const rootReducer = combineReducers({
  global: globalSlice,
  network: networkSlice,
  [productSlice.reducerPath]: productSlice.reducer,
  cart: persistReducer(cartPersistConfig, cartSlice),
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([productSlice.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

const persistor = persistStore(store);
export { persistor, store };

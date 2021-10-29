import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import productsReducr from "../features/productsSlice";
import productsCartReducer from "../features/productsCartSlice";
export const store = configureStore({
  reducer: { products: productsReducr, productsCart: productsCartReducer },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

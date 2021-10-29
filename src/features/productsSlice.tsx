import { createSlice } from "@reduxjs/toolkit";
interface product {
  brand: string;
  category: string;
  countInStock: number;
  description: string;
  image: string;
  name: string;
  numReviews: number;
  price: number;
  rating: string;
  _id: string;
  quantity: number;
}
export const productsSlice = createSlice({
  name: "products",
  initialState: {
    value: [],
  },

  reducers: {
    setProducts: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setProducts } = productsSlice.actions;

export const selectProducts = (state: { products: { value: product[] } }) =>
  state.products.value;

export default productsSlice.reducer;

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
export const productsCartSlice = createSlice({
  name: "productsCart",
  initialState: {
    value: [],
  },

  reducers: {
    setProductsCart: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setProductsCart } = productsCartSlice.actions;

export const selectProductsCart = (state: {
  productsCart: { value: product[] };
}) => state.productsCart.value;

export default productsCartSlice.reducer;

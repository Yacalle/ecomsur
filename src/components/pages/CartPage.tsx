import Navbar from "../common/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  selectProductsCart,
  setProductsCart,
} from "../../features/productsCartSlice";
import ProductCardInCart from "../common/ProductCardInCart";
import "../../styles/cart-page.css";
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
const checkDataLocalStorageAndUpdateState = (dispatch: any) => {
  let consultLocalStorage: string | null =
    localStorage.getItem("productsInCart");
  if (consultLocalStorage) {
    let dataSendState: product[] = JSON.parse(consultLocalStorage);
    dispatch(setProductsCart(dataSendState));
  }
};
const CartPage = () => {
  let products: product[] = useSelector(selectProductsCart);
  let dispatch = useDispatch();
  useEffect(() => {
    try {
      checkDataLocalStorageAndUpdateState(dispatch);
    } catch (error) {}
  }, []);
  const valueTotal = (products: product[]) => {
    let total: number = 0;
    if (products.length !== 0) {
      products.forEach((item: product) => {
        total += item.quantity * item.price;
      });
    } else {
      return total;
    }
    return total;
  };

  return (
    <>
      <Navbar />
      <div className="cart-page">
        {products.length !== 0 ? (
          products.map((product: product) => (
            <ProductCardInCart key={product._id} {...product} />
          ))
        ) : (
          <span style={{ textAlign: "center" }}>No products in cart</span>
        )}
        {products.length !== 0 && (
          <div className="cart-page__total-compra">
            <p className="cart-page__text">Summary of purchase</p>
            <div className="cart-page__total">
              <span>Total</span>
              <span>{valueTotal(products).toFixed(2)} USD</span>
            </div>
            <div className="cart-page__container-button-check-out">
              <p className="cart-page__text-button">Choose more products</p>
              <span className="cart-page__button-checkout">
                Finalize purchase
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default CartPage;

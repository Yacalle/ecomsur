import { useState, useEffect } from "react";
import "../../styles/product-display-page.css";
import ProductDetailCard from "../common/ProductDetailCard";
import { useDispatch } from "react-redux";
import Navbar from "../common/Navbar";
import { setProductsCart } from "../../features/productsCartSlice";
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
const ProductDisplayPage = () => {
  const [product, setProduct] = useState<product>();
  let dispatch = useDispatch();
  useEffect(() => {
    try {
      checkDataLocalStorageAndUpdateState(dispatch);
    } catch (error) {}
  }, []);
  /*Para ue el componente no se re-rendrice, utilizamos un useEffect para traer los datos del localStorge y actualizar la variable product */
  useEffect(() => {
    const getProductLocalStorage = localStorage.getItem("product");
    if (getProductLocalStorage) {
      const productToDisplayInfo: product = JSON.parse(getProductLocalStorage);
      setProduct(productToDisplayInfo);
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="product-detail__description">
        <h2 className="product-detail__title-h2">Product page</h2>
        {product && <ProductDetailCard {...product} />}
      </div>
    </>
  );
};
export default ProductDisplayPage;

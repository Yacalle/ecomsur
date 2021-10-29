import { useSelector, useDispatch } from "react-redux";
import {
  selectProductsCart,
  setProductsCart,
} from "../../features/productsCartSlice";
import "../../styles/button.css";
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
const Button = (product: product) => {
  let productsInCart: product[] = useSelector(selectProductsCart);
  const dispatch = useDispatch();
  //sendProductToCart es la función que se encargará de actualizar el estado de productos en el carrito de compras.
  //También actualiza el localStorage para que cuando el usuario recargue la página, la información del carro de compras quede guardada.
  //Como se está usando el localStorage, es necesario usar un try catch porque hay ocasiones que el usuario no permite ingresar a su localStorage y esto devolerá un error. Con el try catch capturamos el error en el catch para que la aplicación no se caiga.
  const sendProductToCart = (product: product) => {
    try {
      let itemInCarr = productsInCart?.find(
        (ele: product) => ele._id === product._id
      );
      if (!itemInCarr) {
        let dataToSendStateAndLocalStorage: product[] = [
          ...productsInCart,
          { ...product, quantity: 1 },
        ];
        dispatch(setProductsCart(dataToSendStateAndLocalStorage));
        localStorage.setItem(
          "productsInCart",
          JSON.stringify(dataToSendStateAndLocalStorage)
        );
      } else {
        let updateProduct = productsInCart.map((item: product) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        dispatch(setProductsCart(updateProduct));
        localStorage.setItem("productsInCart", JSON.stringify(updateProduct));
      }
    } catch (error) {}
  };
  return (
    <button
      onClick={() => sendProductToCart(product)}
      className="button"
      disabled={product.countInStock !== 0 ? false : true}
    >
      {product.countInStock !== 0 ? "Add item to cart" : "No in Stock"}
    </button>
  );
};
export default Button;

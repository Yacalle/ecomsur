import "../../styles/product-card-in-cart.css";
import { useSelector, useDispatch } from "react-redux";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import {
  selectProductsCart,
  setProductsCart,
} from "../../features/productsCartSlice";
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
const ProductCardInCart = (product: product) => {
  let products: product[] = useSelector(selectProductsCart);
  let dispatch = useDispatch();
  // addQuantity se encarga de la lógica de ir sumando de uno en uno a la propiedad quantity de un determinando producto
  const addQuantity = (product: product) => {
    try {
      let addQuantityProduct = products?.map((item) =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      dispatch(setProductsCart(addQuantityProduct));
      localStorage.setItem(
        "productsInCart",
        JSON.stringify(addQuantityProduct)
      );
    } catch (error) {}
  };
  // substractQuantity  se encarga de la lógica de ir restando de uno en uno a la propiedad quantity de un determinando producto
  const substractQuantity = (product: product) => {
    try {
      let substractQuantityProduct: product[] = [];
      products?.map((item: product) => {
        if (item._id === product._id) {
          if (item.quantity - 1 === 0) {
            substractQuantityProduct = products.filter(
              (ele: product) => ele._id !== item._id
            );
          } else {
            substractQuantityProduct = products?.map((item: product) =>
              item._id === product._id
                ? { ...item, quantity: item.quantity - 1 }
                : item
            );
          }
        }
        return substractQuantityProduct;
      });

      dispatch(setProductsCart(substractQuantityProduct));
      localStorage.setItem(
        "productsInCart",
        JSON.stringify(substractQuantityProduct)
      );
    } catch (error) {}
  };
  // deleteProduct se encarga de eliminar un determinado producto del carrito de compras.
  const deleteProduct = (product: product) => {
    try {
      let remainingProducts: product[] = products.filter(
        (item: product) => item._id !== product._id
      );
      dispatch(setProductsCart(remainingProducts));
      localStorage.setItem("productsInCart", JSON.stringify(remainingProducts));
    } catch (error) {}
  };
  return (
    <div className="product-card-in-cart">
      <div className="product-card-in-cart__container-img">
        <img
          className="product-card-in-cart__img"
          src={`http://localhost:5000${product.image}`}
          alt={product.name}
        />
      </div>
      <div className="product-card-in-cart__details-product">
        <h3 className="product-card-in-cart__name-product">{product.name}</h3>
        <div className="product-card-in-cart__container-details-product">
          <div className="product-card-in-cart__container-price">
            <p className="product-card-in-cart__price-text">Price</p>
            <span className="product-card-in-cart__price">
              {product.price} USD
            </span>
          </div>
          <div className="product-card-in-cart__container-quantity">
            <p className="product-card-in-cart__quantity-text">Quantity</p>
            <div className="product-cart-in-cart__container-icons">
              <span className="product-card-in-cart__subtract">
                <IoIosArrowBack onClick={() => substractQuantity(product)} />
              </span>
              <span className="product-card-in-cart__quantity">
                <span>{product.quantity}</span>
              </span>
              <span className="product-card-in-cart__add">
                <IoIosArrowForward onClick={() => addQuantity(product)} />
              </span>
            </div>
          </div>
          <div className="product-card-in-cart__container-total">
            <p className="product-card-in-cart__total-text">Total</p>
            <span className="product-card-in-cart__total">
              {/*Aquí se utiliza el método toFixed porque nos interesa redondear el total a 2 decimmales */}
              {(product.quantity * product.price).toFixed(2)} USD
            </span>
          </div>
          <div className="product-card-in-cart__container-delete-icon">
            <span className="product-card-in-cart__container-icon">
              <MdDeleteOutline
                onClick={() => deleteProduct(product)}
                className="product-card-in-cart__icon"
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductCardInCart;

import { Rating } from "@material-ui/lab";
import { useHistory } from "react-router-dom";
import Button from "./Button";
import "../../styles/product-card.css";

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
const ProductCard = (product: product) => {
  const history = useHistory();
  const removeSpacesToTexts = (text: string) => {
    return text.replace(/ /g, "-");
  };
  const redirectToDetailsProductPage = (product: product) => {
    let dataToSendLocalStorage = JSON.stringify(product);
    localStorage.setItem("product", dataToSendLocalStorage);
    history.push(removeSpacesToTexts(product.name));
  };
  return (
    <div className="product-card">
      <div className="product-card__container-img">
        <img
          onClick={() => redirectToDetailsProductPage(product)}
          className="product-card_img"
          src={`http://localhost:5000${product.image}`}
          alt={product.name}
        />
      </div>
      <h3 className="product-card__title">{product.name}</h3>
      <span className="product-card__container-price">
        Price: <span className="product-card__value">{product.price} USD</span>
      </span>
      <div className="product-card__container-info">
        <div className="product-card__info-rating">
          <span className="product-card__container-stars">
            <Rating
              size="small"
              name="read-only"
              readOnly
              value={parseInt(product.rating)}
            />
          </span>
          <span className="product-card__num-reviews">
            {product.numReviews}
          </span>
        </div>
        <div className="product-card__container-button">
          <Button {...product} />
        </div>
      </div>
    </div>
  );
};
export default ProductCard;

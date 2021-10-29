import { Rating } from "@material-ui/lab";
import "../../styles/product-detail-card.css";
import Button from "./Button";
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
const ProductDetailCard = (product: product) => {
  return (
    <div className="product-detail">
      <div className="product-detail__container-img">
        <img
          className="product-detail__img"
          src={`http://localhost:5000${product.image}`}
          alt={product.name}
        />
      </div>
      <div className="product-detail__container-info">
        <div className="product-detail__text">
          <h2 className="product-detail__title">{product.name}</h2>
          <p className="product-detail__description">{product.description}</p>
        </div>
        <span className="product-detail__price">
          Price:{" "}
          <span className="product-detail__value">{product.price} USD</span>
        </span>
        <div className="product-detail__container-rating">
          <div className="product-detail__container-star-and-review">
            <span className="product-detail__star">
              <Rating
                name="read-only"
                readOnly
                value={parseInt(product.rating)}
              />
            </span>
            <span className="product-detail__reviews">
              {product.numReviews}
            </span>
          </div>
          <Button {...product} />
        </div>
        <div className="product-detail__info-extra">
          <div className="product-detail__container-brand">
            <span className="product-detail_brand">Brand:</span>
            <span className="product-detail_brand-text">{product.brand}</span>
          </div>
          <div className="product-detail__container-category">
            <span className="product-detail__category">Category:</span>
            <span className="product-detail__category-text">
              {product.category}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductDetailCard;

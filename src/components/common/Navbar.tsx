import "../../styles/navbar.css";
import { BiUser } from "react-icons/bi";
import { GrCart } from "react-icons/gr";
import { useSelector } from "react-redux";
import { selectProductsCart } from "../../features/productsCartSlice";
import { useHistory } from "react-router-dom";
const Navbar = () => {
  const history = useHistory();
  let numberProductInCart: number = useSelector(selectProductsCart).length;
  const redirectToCartPage = () => {
    history.push("/cart");
  };
  const redirectToHome = () => {
    history.push("/");
  };
  return (
    <nav className="navbar">
      <div className="navbar__container-logo">
        <span onClick={redirectToHome} className="navbar__logo">
          TechStore
        </span>
      </div>
      <div className="navbar__container-info">
        <BiUser className="navbar__user-icon" />
        <div onClick={redirectToCartPage} className="navbar__cart-container">
          <GrCart
            onClick={() => redirectToCartPage}
            className="navbar__cart-icon"
          />
          <span className="navbar__counter-cart">{numberProductInCart}</span>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;

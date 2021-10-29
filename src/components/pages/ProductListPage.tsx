import axios from "axios";
import { useState, useEffect } from "react";
import ProductCard from "../common/ProductCard";
import "../../styles/product-list-page.css";
import { setProductsCart } from "../../features/productsCartSlice";
import { useDispatch } from "react-redux";
import Navbar from "../common/Navbar";
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
const ProductListPage = () => {
  const [data, setData] = useState<product[]>();
  const dispatch: () => void = useDispatch();
  /* En el siguiente useEffect hacemos 2  tareas principales. Se hace la petición a la API y se actualiza la variable 'data'. */
  /*Con el propósito de mantener la persistencia del estado global de la App,  cada que se renderice el componente se  consultará el localStorage por medio de la función checkDataLocalStorageAndUpdateState (Este guardará todos los productos del cart) y si existe algo, se mandará al estado global de la App*/
  useEffect(() => {
    try {
      const getData = async () => {
        let result = await axios.get("http://localhost:5000/api/products");
        setData(result.data);
      };
      getData();
      checkDataLocalStorageAndUpdateState(dispatch);
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <>
      <Navbar />
      <div className="container-product">
        {data?.length !== 0 &&
          data?.map((product: product) => {
            return <ProductCard key={product._id} {...product} />;
          })}
      </div>
    </>
  );
};

export default ProductListPage;

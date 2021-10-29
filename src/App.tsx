import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CartPage from "./components/pages/CartPage";
import ProductDisplayPage from "./components/pages/ProductDisplayPage";
import ProductListPage from "./components/pages/ProductListPage";
function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/cart">
            <CartPage />
          </Route>
          <Route path="/:productname">
            <ProductDisplayPage />
          </Route>
          <Route path="/">
            <ProductListPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import OliProduct from "../components/product/OliProduct";
import ProductDetails from "../components/product/ProductDetails";
import SimilarProductsPage from "../pages/SimilarProducts";

const NavRoutes = () => {
  return (
    <>
      <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/product/:id" element={<ProductDetails/>} />
          <Route path="/product/:id/similar" element={<SimilarProductsPage/>} />
          <Route path="/oil" element={<OliProduct/>} />
          <Route path="/ghee" element={<h1>Ghee</h1>} />
          <Route path="/dates" element={<h1>Dates</h1>} />
          {/* <Route path="/we-are-different" element={<WeAreDifferent/>} /> */}
      </Routes>
    </>
  )
}

export default NavRoutes;

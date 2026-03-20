import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import OliProduct from "../components/product/OliProduct";
import ProductDetails from "../components/product/ProductDetails";
import SimilarProductsPage from "../pages/SimilarProducts";
import AboutUs from "../components/layout/AboutUs";
import RefundPolicy from "../pages/RefundPolicy";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import ReturnsPolicy from "../pages/ReturnsPolicy";
import TermsCondition from "../pages/TermsCondition";
import HowToOrder from "../pages/HowToOrder";
import OrderTracking from "../common/OrderTracking";
import MeetTeam from "../pages/MeetTeam";

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
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/terms-condition" element={<TermsCondition />} />
          <Route path="/meet-team" element={<MeetTeam/>} />
          <Route path="/how-to-order" element={<HowToOrder />} />
          <Route path="/order-tracking" element={<OrderTracking />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/returns-policy" element={<ReturnsPolicy />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy/>}/>
      </Routes>
    </>
  )
}

export default NavRoutes;

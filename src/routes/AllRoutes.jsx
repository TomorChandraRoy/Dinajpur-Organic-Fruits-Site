import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import ProductDetails from "../components/product/ProductDetails";
import SimilarProductsPage from "../pages/SimilarProducts/SimilarProducts";
import AboutUs from "../pages/Foother/AboutUs";
import RefundPolicy from "../pages/Foother/RefundPolicy";
import PrivacyPolicy from "../pages/Foother/PrivacyPolicy";
import ReturnsPolicy from "../pages/Foother/ReturnsPolicy";
import TermsCondition from "../pages/Foother/TermsCondition";
import HowToOrder from "../pages/Foother/HowToOrder";
import OrderTracking from "../pages/OrderTracking/OrderTracking";
import MeetTeam from "../pages/Foother/MeetTeam";
import ContactUs from "../pages/Foother/ContactUs";
import FAQ from "../pages/Foother/FAQs";
import LiveChat from "../pages/Foother/LiveChart";
import SignIn from "../pages/Auth/SignIn";
import SignUp from "../pages/Auth/SignUp";

const NavRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Auth */}
        <Route path="/signin" element={<SignIn/>}/>
        <Route path="/signup" element={<SignUp/>}/>

        {/* Product Pages */}
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/product/:id/similar" element={<SimilarProductsPage />} />
        {/* <Route path="/oil" element={<OliProduct />} /> */}
        <Route path="/ghee" element={<h1>Ghee</h1>} />
        <Route path="/dates" element={<h1>Dates</h1>} />

        {/* Footer Page */}
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/terms-condition" element={<TermsCondition />} />
        <Route path="/meet-team" element={<MeetTeam />} />
        <Route path="/how-to-order" element={<HowToOrder />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/faqs" element={<FAQ />} />
        <Route path="/chat" element={<LiveChat />} />
        <Route path="/order-tracking" element={<OrderTracking />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/returns-policy" element={<ReturnsPolicy />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>
    </>
  );
};

export default NavRoutes;

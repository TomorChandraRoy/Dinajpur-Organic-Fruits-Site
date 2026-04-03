import { createBrowserRouter } from "react-router-dom";
import App from "../../App";
import Error from "../../pages/Error/Error";
import Home from "../../pages/Home";
import SignIn from "../../pages/Auth/SignIn";
import SignUp from "../../pages/Auth/SignUp";
import OrderTracking from "../../pages/OrderTracking/OrderTracking";
import ProductDetails from "../../components/product/ProductDetails";
import SimilarProductsPage from "../../pages/SimilarProducts/SimilarProducts";
import CategoryShop from "../../pages/CategoryShop";
import Checkout from "../../pages/Checkout";
import Payment from "../../pages/Payment";
import OrderConfirmation from "../../pages/OrderConfirmation";
import AboutUs from "../../pages/Foother/AboutUs";
import RefundPolicy from "../../pages/Foother/RefundPolicy";
import PrivacyPolicy from "../../pages/Foother/PrivacyPolicy";
import ReturnsPolicy from "../../pages/Foother/ReturnsPolicy";
import TermsCondition from "../../pages/Foother/TermsCondition";
import HowToOrder from "../../pages/Foother/HowToOrder";
import MeetTeam from "../../pages/Foother/MeetTeam";
import ContactUs from "../../pages/Foother/ContactUs";
import FAQ from "../../pages/Foother/FAQs";
import LiveChat from "../../pages/Foother/LiveChart";
import DashboardLayout from "../../pages/Dashboard/DashboardLayout";
import AdminDashboardHome from "../../pages/Dashboard/AdminDashboardHome";

export const AllRoutes = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement: <Error></Error>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "/signin",
        element: <SignIn></SignIn>,
      },
      {
        path: "/checkout",
        element: <Checkout></Checkout>,
      },
      {
        path: "/payment",
        element: <Payment></Payment>,
      },
      {
        path: "/order-confirmation",
        element: <OrderConfirmation></OrderConfirmation>,
      },

      // All Page

      {
        path: "/order-tracking",
        element: <OrderTracking></OrderTracking>,
      },
      {
        path: "/product/:id",
        element: <ProductDetails></ProductDetails>,
      },
      {
        path: "/product/:id/similar",
        element: <SimilarProductsPage></SimilarProductsPage>,
      },
      {
        path: "/shop/:categoryName",
        element: <CategoryShop></CategoryShop>,
      },

      //Footer Page
      {
        path: "/about-us",
        element: <AboutUs></AboutUs>,
      },
      {
        path: "/terms-condition",
        element: <TermsCondition></TermsCondition>,
      },
      {
        path: "/meet-team",
        element: <MeetTeam></MeetTeam>,
      },
      {
        path: "/how-to-order",
        element: <HowToOrder></HowToOrder>,
      },
      {
        path: "/contact",
        element: <ContactUs></ContactUs>,
      },
      {
        path: "/faqs",
        element: <FAQ></FAQ>,
      },
      {
        path: "/chat",
        element: <LiveChat></LiveChat>,
      },
      {
        path: "/refund-policy",
        element: <RefundPolicy></RefundPolicy>,
      },
      {
        path: "/returns-policy",
        element: <ReturnsPolicy></ReturnsPolicy>,
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy></PrivacyPolicy>,
      },
    ],
  },
  {
    path: "dashboard",
    element: <DashboardLayout></DashboardLayout>,
    children: [
      {
        index: true,
        element: <AdminDashboardHome></AdminDashboardHome>,
      },
    ],
  },
]);

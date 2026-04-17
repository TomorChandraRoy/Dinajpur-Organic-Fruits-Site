import { Outlet, useLocation } from "react-router-dom";
import Footer from "./common/Footer";
import Header from "./components/header/Header";
import ScrollToTop from "./utils/ScrollToTop";

const App = () => {
  const location = useLocation();
  const isShopPage = location.pathname.startsWith("/shop/");

  return (
    <>
      <ScrollToTop />
      <Header />
      <Outlet />
      {!isShopPage && <Footer />}
    </>
  );
};

export default App;

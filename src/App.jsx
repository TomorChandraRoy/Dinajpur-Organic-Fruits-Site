import { Outlet } from "react-router-dom";
import Footer from "./common/Footer";
import Header from "./components/home/header/Header";
import ScrollToTop from "./utils/ScrollToTop";

const App = () => {

  return (
    <>
      <ScrollToTop />
      <Header />
      <Outlet/>
     <Footer />
    </>
  );
};

export default App;

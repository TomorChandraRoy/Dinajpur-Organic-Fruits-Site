import Footer from "./common/Footer";
import Header from "./components/home/Header";
import AllRoutes from "./routes/AllRoutes";
import ScrollToTop from "./utils/ScrollToTop";


const App = () => {
  return (
    <>
      <ScrollToTop />
      <Header />
      <AllRoutes />
      <Footer />
    </>
  );
};

export default App;

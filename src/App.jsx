import Footer from "./common/Footer";
import Header from "./components/home/Header";
import ToolBar from "./components/home/ToolBar";
import AllRoutes from "./routes/AllRoutes";
import ScrollToTop from "./services/ScrollToTop";

const App = () => {
  return (
    <>
      <ScrollToTop />
      <ToolBar />
      <Header />
      <AllRoutes />
      <Footer />
    </>
  );
};

export default App;

import Footer from "./components/layout/Footer";
import Header from "./components/ui/Header";
import ToolBar from "./components/layout/ToolBar";
import NavRoutes from "./routes/NavRoutes";
import ScrollToTop from "./services/ScrollToTop";

const App = () => {
  return (
    <>
      <ScrollToTop />
      <ToolBar />
      <Header />
      <NavRoutes />
      <Footer />
    </>
  );
};

export default App;

import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import OliProduct from "../components/product/OliProduct";

const NavRoutes = () => {
  return (
    <>
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/oil" element={<OliProduct/>} />
        <Route path="/ghee" element={<h1>Ghee</h1>} />
        <Route path="/dates" element={<h1>Dates</h1>} />
    </Routes>
    </>
  )
}

export default NavRoutes;

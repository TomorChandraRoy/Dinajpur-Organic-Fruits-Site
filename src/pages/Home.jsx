import AllProducts from "../components/home/AllProducts";
import Categories from "../components/home/Categories";
import HeroSection from "../components/home/HeroSection";
import Trust from "../components/home/Trust";
import WeAreDifferent from "../components/home/WeAreDifferent";

const Home = () => {
  return (
    <>
      <HeroSection />
      <Trust />
      <Categories />
      <AllProducts />
      <WeAreDifferent  />
    </>
  );
};

export default Home;

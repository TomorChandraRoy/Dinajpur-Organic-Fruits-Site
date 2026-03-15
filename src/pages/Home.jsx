import AllProducts from "../components/ui/AllProducts";
import Categories from "../components/ui/Categories";
import HeroSection from "../components/ui/HeroSection";
import Trust from "../components/ui/Trust";
import WeAreDifferent from "../components/ui/WeAreDifferent";
import { weAreDifferent } from "../data/WeAreDifferent";

console.log(weAreDifferent);

const Home = () => {
  return (
    <>
      <HeroSection />
      <Trust />
      <Categories/>
      <AllProducts />
      <WeAreDifferent data={weAreDifferent} />
    </>
  )
}

export default Home;

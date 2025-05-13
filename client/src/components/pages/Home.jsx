import Hero from "../Hero";
import FeaturedProducts from "../FeaturedProducts";
import Categories from "../Categories";
import CartSection from "../Cartsection";
import Auth from "../Login";

const Home = () => {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <Categories />
      <CartSection />
      <Login />
    </>
  );
};

export default Home;

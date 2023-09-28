import Filter from "../../components/filter/Filter";
import HeroSection from "../../components/heroSection/heroSection";
import Layout from "../../components/layout/Layout";
import ProductCard from "../../components/productCard/ProductCard";
import Track from "../../components/track/Track";

const Home = () => {
  return (
    <Layout>
      <HeroSection />
      <Filter />
      <ProductCard />
      <Track />
    </Layout>
  );
};

export default Home;

import hero from "../../assets/hero.jpg";

const HeroSection = () => {
  return (
    <div>
      {/* <img
        src="https://static.vecteezy.com/system/resources/previews/004/299/835/original/online-shopping-on-phone-buy-sell-business-digital-web-banner-application-money-advertising-payment-ecommerce-illustration-search-free-vector.jpg"
        alt=""
      /> */}
      <img
        src={hero}
        alt=""
        style={{ width: "100%", height: "70vh", objectFit: "cover" }}
      />
    </div>
  );
};

export default HeroSection;

import React from "react";
import Landing from "./Landing/Landing";
import OurFeatures from "./Our Features/OurFeatures";
import Footer from "./../../Components/Footer/Footer";
import Delivery from "./Delivery/Delivery";
import Dishes from "./Dishes/Dishes";
import Reservation from "./Reservation/Reservation";
import Testimonios from "./Testimonios/Testimonios";
import Recommendation from "../../Components/Recommendation/Recommendation";

function Home({ HandleISInCart }) {
  return (
    <React.Fragment>
      <div className="home">
        {/*=========================================================
        # Landing 
        =========================================================*/}
        <Landing />
        {/*=========================================================
        # Dishes
         =========================================================*/}
        <Dishes HandleISInCart={HandleISInCart} />
        {/*=========================================================
         # Recommendation
        =========================================================*/}
        <Recommendation HandleISInCart={HandleISInCart} min="0" max="8" />
        {/*=========================================================
         # Our features 
        =========================================================*/}
        <OurFeatures />
        {/*=========================================================
        # Delivery
        =========================================================*/}
        <Delivery />
        {/*=========================================================
        # Reservation
        =========================================================*/}
        <Reservation />
        {/*=========================================================
        # Testimonio
         =========================================================*/}
        <Testimonios />
        {/*=========================================================
        # Footer
        =========================================================*/}
        <Footer />
      </div>
    </React.Fragment>
  );
}
export default Home;

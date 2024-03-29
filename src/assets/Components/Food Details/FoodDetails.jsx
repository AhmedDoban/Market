import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import "./FoodDetails.css";
import { useContext } from "react";
import { FoodContext } from "../../Auth/Auth";
import { Player } from "@lottiefiles/react-lottie-player";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import RemoveShoppingCartOutlinedIcon from "@mui/icons-material/RemoveShoppingCartOutlined";
import Recommendation from "../Recommendation/Recommendation";
import Footer from "../Footer/Footer";
import Waves from "./../Waves/Waves";
import Testimonios from "../../Auth/Home/Testimonios/Testimonios";

function FoodDetails({ HandleISInCart, scrollToTop }) {
  const Params = useParams();
  const FoodId = useContext(FoodContext);
  const [CurrentFood, SetCureentFood] = useState({});

  useEffect(() => {
    const GetFood = () => {
      const Data = [...FoodId];
      const Element = Data.filter((ele) => ele.id == Params.id)[0];
      if (Element === undefined) {
        SetCureentFood("undefined");
      } else {
        SetCureentFood(Element);
      }
    };
    GetFood();
  }, [Params.id, FoodId]);

  return (
    <React.Fragment>
      <div
        className={
          CurrentFood === "undefined" ? "FoodDetails" : "FoodDetails active"
        }
      >
        <div className="container" data-aos="fade-up">
          <div className="links">
            <div className="menu-nav">
              <NavLink to="/">Home </NavLink>
              <NavLink to="/Menu">Menu </NavLink>
              <NavLink to={`/Details/${Params.id}`}>{CurrentFood.name}</NavLink>
            </div>
            {CurrentFood === "undefined" ? null : (
              <i className="fa-regular fa-heart Favorite-ele" />
            )}
          </div>
          {CurrentFood === "undefined" ? (
            <div className="notfounded-element">
              <Player
                autoplay
                loop
                src="https://lottie.host/2f5f668c-3671-4831-a2a4-8101b7d334bc/281Jrokgmv.json"
                className="notfounded-elementPlayer"
              />
              <p>Sorry We Couldn't Find The element</p>
            </div>
          ) : (
            <React.Fragment>
              <div className="content">
                <div className="left">
                  <img src={CurrentFood.img} alt={CurrentFood.name} />
                </div>
                <div className="right">
                  <h1>{CurrentFood.name}</h1>
                  <div className="health-info">
                    <p>
                      Calories : <span>{CurrentFood.cal} cal</span>
                    </p>
                    <p>
                      Proteins : <span>30g</span>
                    </p>
                    <p>
                      Fats : <span>100g</span>
                    </p>
                  </div>
                  <p>{CurrentFood.Details}</p>
                  <div className="actions">
                    <div className="price">${CurrentFood.price}.00</div>
                    <div className="btn-animation">
                      <button
                        onClick={() => HandleISInCart(CurrentFood.id)}
                        className={CurrentFood.isInCart ? "active" : ""}
                      >
                        {CurrentFood.isInCart ? (
                          <RemoveShoppingCartOutlinedIcon />
                        ) : (
                          <ShoppingCartOutlinedIcon />
                        )}
                      </button>
                      <p>
                        {CurrentFood.isInCart
                          ? "Remove From Cart"
                          : "Add To Cart"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </React.Fragment>
          )}
        </div>
      </div>
      {CurrentFood === "undefined" ? null : (
        <React.Fragment>
          <Waves styleWave="up" />
          {/************************** Start Recommendation *****************************/}
          <Recommendation
            HandleISInCart={HandleISInCart}
            min="40"
            max="48"
            scrollToTop={scrollToTop}
          />
          {/************************** End Recommendation *****************************/}
          {/************************** Start Testimonios *****************************/}
          <Testimonios />
          {/************************** End Testimonios *****************************/}
          {/************************** Start Footer *****************************/}
          <Footer />
          {/************************** End Footer *****************************/}
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
export default FoodDetails;

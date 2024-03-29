import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import WindowIcon from "@mui/icons-material/Window";
import ReorderIcon from "@mui/icons-material/Reorder";
import MenuController from "./MenuController";
import "./Menu.css";
import { FoodContext } from "../Auth";
import Footer from "../../Components/Footer/Footer";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Player } from "@lottiefiles/react-lottie-player";
import Recommendation from "../../Components/Recommendation/Recommendation";
import Testimonios from "../Home/Testimonios/Testimonios";

function Menu({ HandleISInCart, scrollToTop }) {
  const FoodData = useContext(FoodContext);
  const [SeeMore, SetSeeMore] = useState(9);
  const [BulletNumber, SetBulletNumber] = useState(1);

  const [StyleCard, SetStyleCard] = useState("Grid");
  const [ControlFilter, SetControlFilter] = useState(false);
  const [FoodType, SetFoodType] = useState("");

  const [Calories, SetCalories] = useState([0, 1000]);
  const [Price, SetPrice] = useState([0, 1000]);
  const [Width_length, SetWidth_length] = useState("16.5-25");
  const [Spicy, SetSpicy] = useState(false);

  const HandelNextNavigation = () => {
    if (
      FoodType === "" &&
      Calories[0] === 0 &&
      Calories[1] === 1000 &&
      Price[0] === 0 &&
      Price[1] === 1000 &&
      Spicy === false
    ) {
      if (FoodData.length < SeeMore) {
        return;
      }
      SetBulletNumber(BulletNumber + 1);
      SetSeeMore(SeeMore + 9);
      scrollToTop();
    } else {
      if (FoodType === "") {
        if (
          FoodData.filter(
            (Food) => Food.cal >= Calories[0] && Food.cal <= Calories[1]
          )
            .filter((Food) => Food.price >= Price[0] && Food.price <= Price[1])
            .filter((Food) => (Spicy ? Food.Spicy : Food)).length <= SeeMore
        ) {
          return;
        }
      } else if (
        FoodData.filter((Foods) => Foods.type === FoodType)
          .filter((Food) => Food.cal >= Calories[0] && Food.cal <= Calories[1])
          .filter((Food) => Food.price >= Price[0] && Food.price <= Price[1])
          .filter((Food) => (Spicy ? Food.Spicy : Food)).length <= SeeMore
      ) {
        return;
      }
      SetBulletNumber(BulletNumber + 1);
      SetSeeMore(SeeMore + 9);
      scrollToTop();
    }
  };
  const HandelPreviousNavigation = () => {
    if (SeeMore <= 0 || SeeMore === 9) {
      SetBulletNumber(1);
      SetSeeMore(9);
      return;
    }
    if (BulletNumber === 1) {
      SetBulletNumber(1);
    } else {
      SetBulletNumber(BulletNumber - 1);
    }
    SetSeeMore(SeeMore - 9);
    scrollToTop();
  };
  const HandleBulletNumberNavigation = (index) => {
    SetSeeMore((+index + 1) * 9);
    if (index === 0) {
      SetBulletNumber(1);
      return;
    }
    SetBulletNumber(index);
  };
  const HandleFoodType = (type) => {
    SetFoodType(type);
    SetSeeMore(9);
  };

  return (
    <React.Fragment>
      <div className="menu-food">
        <div className="container">
          <div className="links">
            <div className="menu-nav">
              <NavLink to="/">Home </NavLink>
              <NavLink to="/Menu">Menu </NavLink>
            </div>
            <div className="style-card">
              <i
                className="fa-solid fa-gear Filter-Setting"
                onClick={() => SetControlFilter(!ControlFilter)}
              />
              <WindowIcon
                className={StyleCard === "Grid" ? "active" : ""}
                onClick={() => SetStyleCard("Grid")}
              />
              <ReorderIcon
                className={StyleCard === "List" ? "active" : ""}
                onClick={() => SetStyleCard("List")}
              />
            </div>
          </div>
          <div className="content">
            <MenuController
              FoodType={FoodType}
              HandleFoodType={HandleFoodType}
              SetCalories={SetCalories}
              SetWidth_length={SetWidth_length}
              SetPrice={SetPrice}
              ControlFilter={ControlFilter}
              SetControlFilter={SetControlFilter}
              SetSpicy={SetSpicy}
            />

            {FoodData.filter((Foods) =>
              FoodType === "" ? Foods : Foods.type === FoodType
            )
              .filter(
                (Food) => Food.cal >= Calories[0] && Food.cal <= Calories[1]
              )
              .filter(
                (Food) => Food.price >= Price[0] && Food.price <= Price[1]
              )
              .filter((Food) => (Spicy ? Food.Spicy : Food)).length > 0 ? (
              <div className={`right ${StyleCard}`}>
                {FoodData.filter((Foods) =>
                  FoodType === "" ? Foods : Foods.type === FoodType
                )
                  .filter(
                    (Food) => Food.cal >= Calories[0] && Food.cal <= Calories[1]
                  )
                  .filter(
                    (Food) => Food.price >= Price[0] && Food.price <= Price[1]
                  )
                  .filter((Food) => (Spicy ? Food.Spicy : Food))
                  .slice(SeeMore - 9, SeeMore)
                  .map((item) => (
                    <React.Fragment>
                      {StyleCard === "Grid" ? (
                        <div className="food-box" key={item.id}>
                          <i className="fa-regular fa-heart Favorite-ele" />
                          <Link
                            to={`/Details/${item.id}`}
                            onClick={() => scrollToTop()}
                          >
                            <img src={item.img} alt={item.name} />
                            <h5>
                              {item.name.length > 10
                                ? `${item.name.slice(0, 10) + `...`}`
                                : item.name}
                            </h5>
                            <p>
                              {item.Details.length > 50
                                ? `${item.Details.slice(0, 50)}...`
                                : item.Details}
                            </p>
                          </Link>

                          <div className="actions">
                            <div className="price">{item.price} $</div>
                            <button
                              className={item.isInCart ? "btn active" : "btn"}
                              onClick={() => HandleISInCart(item.id)}
                            >
                              <ShoppingCartOutlinedIcon />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="food-box" key={item.id}>
                          <Link
                            className="left"
                            to={`/Details/${item.id}`}
                            onClick={() => scrollToTop()}
                          >
                            <img src={item.img} alt={item.name} />
                          </Link>

                          <div className="right">
                            <Link
                              className="info"
                              to={`/Details/${item.id}`}
                              onClick={() => scrollToTop()}
                            >
                              <h5>{item.name}</h5>
                              <p>{item.Details}</p>
                            </Link>
                            <div className="info actions">
                              <div className="price">{item.price}$</div>
                              <button
                                className={item.isInCart ? "btn active" : "btn"}
                                onClick={() => HandleISInCart(item.id)}
                              >
                                <ShoppingCartOutlinedIcon />
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </React.Fragment>
                  ))}
              </div>
            ) : (
              <div className="not-found">
                <Player
                  autoplay
                  loop
                  src="https://lottie.host/593ba6a9-716f-43b6-908a-2c48b99d0b40/e6Bkgj0XMe.json"
                  style={{ height: "300px", width: "300px" }}
                />
                <p>Sorry We Couldn't Find what are searching for</p>
              </div>
            )}
          </div>
          {FoodData.filter((Foods) =>
            FoodType === "" ? Foods : Foods.type === FoodType
          )
            .filter(
              (Food) => Food.cal >= Calories[0] && Food.cal <= Calories[1]
            )
            .filter((Food) => Food.price >= Price[0] && Food.price <= Price[1])
            .filter((Food) => (Spicy ? Food.Spicy : Food)).length > 0 ? (
            <div className="nav-seemore">
              <button
                onClick={() => HandelPreviousNavigation()}
                className={SeeMore <= 9 ? "" : "active"}
              >
                <i className="fa-solid fa-angle-left"></i>
              </button>
              <div className="nav-Bullets-numbers">
                {Array(
                  Math.ceil(
                    FoodData.filter((Foods) =>
                      FoodType === "" ? Foods : Foods.type === FoodType
                    )
                      .filter(
                        (Food) =>
                          Food.cal >= Calories[0] && Food.cal <= Calories[1]
                      )
                      .filter(
                        (Food) =>
                          Food.price >= Price[0] && Food.price <= Price[1]
                      )
                      .filter((Food) => (Spicy ? Food.Spicy : Food)).length / 9
                  )
                )
                  .fill(0)
                  .map((value, index) => (
                    <button
                      onClick={() => HandleBulletNumberNavigation(index)}
                      className={SeeMore === (+index + 1) * 9 ? "active" : ""}
                    >
                      {index + 1}
                    </button>
                  ))
                  .slice(BulletNumber - 1, BulletNumber + 2)}
              </div>

              <button
                className={
                  SeeMore >=
                  FoodData.filter((Foods) =>
                    FoodType === "" ? Foods : Foods.type === FoodType
                  )
                    .filter(
                      (Food) =>
                        Food.cal >= Calories[0] && Food.cal <= Calories[1]
                    )
                    .filter(
                      (Food) => Food.price >= Price[0] && Food.price <= Price[1]
                    )
                    .filter((Food) => (Spicy ? Food.Spicy : Food)).length
                    ? ""
                    : "active"
                }
                onClick={() => HandelNextNavigation()}
              >
                <i className="fa-solid fa-angle-right"></i>
              </button>
            </div>
          ) : null}
        </div>
      </div>
      {/************************** Recommendation *****************************/}
      <Recommendation
        HandleISInCart={HandleISInCart}
        min="58"
        max="68"
        ActiveBorder={true}
        scrollToTop={scrollToTop}
      />
      {/************************** End Recommendation *****************************/}
      {/************************** Testimonios *****************************/}
      <Testimonios />
      {/************************** End Testimonios *****************************/}
      {/************************** Footer *****************************/}
      <Footer />
      {/************************** End Footer *****************************/}
    </React.Fragment>
  );
}

export default Menu;

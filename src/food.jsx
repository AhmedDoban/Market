import React, { useState} from 'react';
import './navbarCSS.css';
import Cart from './cart';
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import 'swiper/components/navigation/navigation.min.css'
import 'swiper/components/pagination/pagination.min.css'
import {Button} from 'react-bootstrap';
import { Navigation, Pagination, Scrollbar, A11y ,EffectFade ,Autoplay} from 'swiper';
import { SwiperSlide,Swiper } from 'swiper/react';
import './vendor/bootstrap-icons/bootstrap-icons.css';
import './vendor/boxicons/css/boxicons.min.css';
import AOS from 'aos'; 
import 'aos/dist/aos.css';

AOS.init();
const Food = (props) => {
    const [swiperRef, setSwiperRef] = useState(null);
    return (  
        <React.Fragment>

<div id="FoodBAck">
        <div class="container" data-aos="fade-up">
          <div class="section-title">
            <h2>Food Menu</h2>
          </div>
        </div>
        <Swiper
         breakpoints={{
          640: {
            width: 640,
            slidesPerView: 1,
          },
          650: {
            width: 768,
            slidesPerView: 2,
          },
          480:{
            width: 500,
            slidesPerView: 1
          },
          200:{
            width: 400,
            slidesPerView: 1
          }
        }}
        modules={[Navigation, Pagination, Scrollbar, A11y,EffectFade,Autoplay]}
        onSwiper={setSwiperRef}
        slidesPerView={3}
        spaceBetween={100}
        loop= 'true'
        centeredSlides= 'true'
        roundLengths= 'true'
        mousewheel= 'true'
        grabCursor= 'true'  
        pagination={{
          type: "fraction",
        }}
        className="mySwiper"
        data-aos="fade-up"
      >
        <div id="food" class="cards" >
             {props.Food.map(
                   p=>(
                  <SwiperSlide >      
                  <a class="card">
                    <img src={p.imdSrc} class="card__image" alt="" />
                    <div class="card__overlay">
                      <div class="card__header">
                      <Button style={{backgroundColor:'#fff'}}  onClick={()=>props.handle(p)}>
                        <Cart onClick={props.handle}  CartInFood={p} />
                          </Button>{''}
                        <div class="card__header-text">
                          <h3 class="card__title">{p.name}</h3>            
                          <span class="card__status">price : {p.price} $</span>
                        </div>
                      </div>
                      <p class="card__description">{p.Details}</p>
                    </div>
                  </a>      
                    </SwiperSlide>
                ))}
            
            </div> 
      </Swiper>
    </div>

        </React.Fragment>

        
        );
}
 
export default Food;



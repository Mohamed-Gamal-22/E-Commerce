import React from "react";
import "./MainSlider.module.css";
import mainImg1 from "../../Assets/images/slider-image-1.jpeg";
import mainImg2 from "../../Assets/images/slider-image-2.jpeg";
import mainImg3 from "../../Assets/images/slider-image-3.jpeg";
import img1 from "../../Assets/images/slider-image-1.jpeg";
import img2 from "../../Assets/images/slider-image-2.jpeg";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export default function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  return (
    <>
      <div className="container my-5">
        <div className="row g-0">
          <div className="col-md-9">
            <Slider {...settings}>
              <img height={400} className="w-100" src={mainImg1} alt="a" />
              <img height={400} className="w-100" src={mainImg2} alt="s" />
              <img height={400} className="w-100" src={mainImg3} alt="d" />
            </Slider>
          </div>
          <div className="col-md-3">
            <img height={200} className="w-100" src={img1} alt="one" />
            <img height={200} className="w-100" src={img2} alt="two" />
          </div>
        </div>
      </div>
    </>
  );
}

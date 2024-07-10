import React from "react";
import "./CategorySlider.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useQuery } from "react-query";
import axios from "axios";

export default function CategorySlider() {
  function getCategory() {
    return axios.get(`https://route-ecommerce.onrender.com/api/v1/categories`);
  }

  const {  data } = useQuery("categorySlider", getCategory);
  console.log(data?.data.data);

  var settings = {
    dots: true,
    infinite: true,
    // draggable: false,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
  };

  return (
    <>
      <div className="container my-5">
        {data?.data.data ? (
          <Slider {...settings}>
            {data?.data.data.map((category) => (
              <img
                height={200}
                key={category._id}
                src={category.image}
                alt="category aa alt"
              />
            ))}
          </Slider>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

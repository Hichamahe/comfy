"use client";
import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style.css";
import ProductItem from "@/app/products/productItem";

function CarouselProducts({ data }) {
  const [slidesToShow, setSlidesToShow] = useState(4);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Set isClient to true after component mounts
    setIsClient(true);

    const handleResize = () => {
      if (window.innerWidth <= 550) {
        setSlidesToShow(1);
      } else if (window.innerWidth <= 700) {
        setSlidesToShow(2);
      } else if (window.innerWidth <= 990) {
        setSlidesToShow(3);
      } else {
        setSlidesToShow(4);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const settings = {
    dots: false,
    infinite: data?.length > 4,
    autoplay: data?.length > 4,
    speed: 1000,
    autoplaySpeed: 5000,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    arrows: data?.length > 4,
  };

  return (
    <div className="m-6">
      {isClient && (
        <Slider
          {...settings}
          className={`gap-4 ${
            data?.length <= 4
              ? "slick-disabled sm:mx-24 xs:mx-0 md:mx-32 lg:mx-48"
              : ""
          }`}
        >
          {data?.map((product) => (
            <ProductItem
              product={product}
              key={product._id}
            />
          ))}
        </Slider>
      )}
    </div>
  );
}

export default CarouselProducts;

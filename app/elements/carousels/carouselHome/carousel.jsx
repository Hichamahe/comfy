"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import image1 from "../../../../public/images/image1.jpeg";
import image2 from "../../../../public/images/image2.jpg";
import image3 from "../../../../public/images/image3.jpg";
import Link from "next/link";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Carousel } from "antd";
import "./style.css";
import { motion } from "framer-motion";

const slide = [
  {
    src: image1,
    title: "UP TO 10% OFF",
    discreption: "Nano Tube Suspension Pendant Lamp",
    priority: "true",
  },
  {
    src: image2,
    title: "UP TO 70% OFF",
    discreption: "Ray Pendant Lamp Choose Your Comfort",
    priority: "true",
  },
  {
    src: image3,
    title: "UP TO 50% OFF",
    discreption: "Outdoor Wicker Hanging Chair",
    priority: "true",
  },
];

function CarouselHome() {
  const ref = useRef();
  const [animating, setAnimating] = useState(true);
  const [uniqueKey, setUniqueKey] = useState(Date.now());

  const handleBeforeChange = () => {
    setAnimating(false);
    setUniqueKey(Date.now());
  };

  const handleAfterChange = () => {
    setAnimating(true);
  };
  return (
    <div className="relative h-full">
      <Carousel
        autoplay
        dots={true}
        dotPosition="top"
        infinite={true}
        ref={ref}
        effect="fad"
        fade={true}
        autoplaySpeed={3000}
        beforeChange={handleBeforeChange}
        afterChange={handleAfterChange}
        className="h-full"
      >
        {slide.map((item, index) => (
          <div
            key={index}
            className="h-full"
          >
            <Image
              src={item.src}
              alt={`Slide ${index + 1}`}
              className="z-primary-Zindex w-full h-full object-cover"
              fill={false}
              priority={item.priority}
            />
            <motion.div
              key={`${item.title}-${uniqueKey}`}
              initial={{ scale: 0, opacity: 0 }}
              animate={
                animating
                  ? { scale: 1, opacity: 1, left: "6%", top: "25%" }
                  : {}
              }
              transition={{ duration: 1 }}
              className="absolute z-second-Zindex top-[50%] space-y-2"
            >
              <span className="text-white bg-mainColor rounded-sm font-bold text-font-size-two p-2">
                {item.title}
              </span>
              <h1 className="font-bold text-font-size-one">
                {item.discreption}
              </h1>
              <Link
                href="/shop"
                className="text-font-size-two flex items-center text-black"
              >
                Explore Now <FaLongArrowAltRight className="ml-2" />
              </Link>
            </motion.div>
          </div>
        ))}
      </Carousel>
      <div className="absolute top-1/2 flex justify-between w-full">
        <button
          className="slick-arrow slick-prev"
          onClick={() => ref.current.prev()}
        ></button>
        <button
          className="slick-arrow slick-next"
          onClick={() => ref.current.next()}
        ></button>
      </div>
    </div>
  );
}

export default CarouselHome;

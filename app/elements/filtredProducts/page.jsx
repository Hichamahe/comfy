"use client";
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import { FaLongArrowAltRight } from "react-icons/fa";

function FiltredProducts({ product }) {
  const [hoverStates, setHoverStates] = useState(
    Array(product.length).fill({ hover: false, isHovered: false })
  );

  const firstProduct = product[0];
  const otherProducts = product.slice(1);

  const handleMouseEnter = (index) => {
    const newHoverStates = [...hoverStates];
    newHoverStates[index] = {
      ...newHoverStates[index],
      hover: true,
      isHovered: true,
    };
    setHoverStates(newHoverStates);
  };

  const handleMouseLeave = (index) => {
    const newHoverStates = [...hoverStates];
    newHoverStates[index] = {
      ...newHoverStates[index],
      hover: false,
      isHovered: false,
    };
    setHoverStates(newHoverStates);
  };

  const getColumnSpan = (category) => {
    switch (category) {
      case "Decors":
        return "col-span-5 xs:col-span-12";
      case "Lighting":
        return "col-span-7 xs:col-span-12";
      case "Sofas":
        return "col-span-7 xs:col-span-12";
      case "Tables":
        return "col-span-5 xs:col-span-12";
      default:
        return "col-span-8 xs:col-span-12";
    }
  };

  return (
    <section className="m-10">
      <div className="grid grid-cols-12 gap-4">
        <div
          className="col-span-4 xs:col-span-12 relative overflow-hidden h-[500px] xs:h-full"
          onMouseEnter={() => handleMouseEnter(0)}
          onMouseLeave={() => handleMouseLeave(0)}
        >
          <Image
            src={`/images/${firstProduct?.product?.images[0].primary}`}
            alt={`images/${firstProduct?.product?.images[0].primary}`}
            width={700}
            height={700}
            priority={true}
            className="w-full h-full object-cover"
          />
          <Image
            src={`/images/${firstProduct?.product?.images[0].secondary}`}
            className={`absolute top-0 left-0 w-full h-full transition duration-700 ease-out object-cover ${
              hoverStates[0]?.isHovered
                ? "opacity-100 scale-125"
                : "opacity-0 scale-100"
            }`}
            width={700}
            height={700}
            alt={`Secondary image of ${firstProduct?.product?.title}`}
            priority={true}
          />
          <div className="absolute top-0 space-y-2 translate-x-4 translate-y-4">
            <h1 className="text-white bg-mainColor rounded-md p-1 font-bold">
              {firstProduct?.count} Products
            </h1>
            <p className="font-bold">{firstProduct?.category}</p>
            <Link
              href={`/shop?category=${firstProduct?.category}`}
              className={`flex items-center justify-center transition-opacity duration-300 hover:text-mainColor ${
                hoverStates[0]?.hover ? "opacity-100" : "opacity-0"
              }`}
            >
              Go To Shopping
              <FaLongArrowAltRight className="ml-2" />
            </Link>
          </div>
        </div>
        <div className="col-span-8 xs:col-span-12 grid grid-cols-12 gap-4 h-[500px] xs:h-full">
          {otherProducts?.map((item, index) => (
            <div
              className={`relative w-full h-auto overflow-hidden ${getColumnSpan(
                item.category
              )}`}
              onMouseEnter={() => handleMouseEnter(index + 1)}
              onMouseLeave={() => handleMouseLeave(index + 1)}
              key={index}
            >
              <Image
                src={`/images/${item?.product?.images[0].primary}`}
                alt={`/images/${item?.product?.images[0].primary}`}
                width={700}
                height={700}
                priority="true"
                className="w-full h-full object-cover"
              />
              <Image
                src={`/images/${item?.product?.images[0].secondary}`}
                alt={`/images/${item?.product?.images[0].secondary}`}
                className={`absolute top-0 left-0 w-full h-full transition duration-700 ease-out ${
                  hoverStates[index + 1]?.isHovered
                    ? "opacity-100 scale-125"
                    : "opacity-0 scale-100"
                }`}
                width={700}
                height={700}
                priority="true"
              />
              <div className="absolute top-0 space-y-2 translate-x-4 translate-y-4">
                <h1 className="text-white bg-mainColor rounded-md p-1 font-bold">
                  {item?.count} Products
                </h1>
                <p className="font-bold">{item?.category}</p>
                <Link
                  href={`/shop?category=${item?.category}`}
                  className={`flex items-center justify-center transition-opacity duration-300 hover:text-mainColor ${
                    hoverStates[index + 1]?.hover ? "opacity-100" : "opacity-0"
                  }`}
                >
                  Go To Shopping
                  <FaLongArrowAltRight className="ml-2" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FiltredProducts;

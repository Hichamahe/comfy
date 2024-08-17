"use client";
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

const SingleProduct = ({ product }) => {
  const [selectedImage, setSelectedImage] = useState(
    product?.images[0]?.primary || ""
  );
  const [hoverImage, setHoverImage] = useState(false);
  const [backgroundImageUrl, setBackgroundImageUrl] = useState("");
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const { status } = useSession();
  const maxLength = 250;

  const handleMouseEnter = () => {
    setHoverImage(true);
    setBackgroundImageUrl(`/images/${selectedImage}`);
  };

  const handleMouseLeave = () => {
    setHoverImage(false);
  };

  const handleMouseMove = (e) => {
    const { offsetX, offsetY, target } = e.nativeEvent;
    const { offsetWidth, offsetHeight } = target;

    const x = (offsetX / offsetWidth) * 100;
    const y = (offsetY / offsetHeight) * 100;

    setCursorPosition({ x, y });
  };

  const truncateDescription = (description) => {
    return description?.length > maxLength
      ? description?.substring(0, maxLength) + "..."
      : description;
  };

  return (
    <div className="">
      <div className="grid grid-cols-12 gap-4 py-5 px-3">
        <div className="grid grid-cols-12 col-span-6 xs:col-span-12 gap-4">
          <div className="col-span-2 xs:col-span-12 xs:flex">
            <button
              className={`${
                selectedImage === product?.images[0].primary
                  ? "border-2 border-mainColor"
                  : ""
              }`}
              onClick={() => setSelectedImage(product?.images[0].primary)}
            >
              <Image
                src={`/images/${product?.images[0].primary}`}
                className={`w-full h-full`}
                width={700}
                height={700}
                alt={`Primary image of ${product?.title}`}
                fill={false}
                priority="true"
              />
            </button>
            <button
              className={`${
                selectedImage === product?.images[0].secondary
                  ? "border-2 border-mainColor"
                  : ""
              }`}
              onClick={() => setSelectedImage(product?.images[0].secondary)}
            >
              <Image
                src={`/images/${product?.images[0].secondary}`}
                className={`w-full h-full`}
                width={700}
                height={700}
                alt={`secondary image of ${product?.title}`}
                fill={false}
                priority="true"
              />
            </button>
          </div>
          <div className="col-span-10 xs:col-span-12 relative flex flex-wrap">
            <div className="sticky top-5 w-full h-fit">
              <Image
                src={`/images/${
                  selectedImage
                    ? `${selectedImage}`
                    : `${product?.images[0].primary}`
                }`}
                className="w-full h-auto"
                width={700}
                height={700}
                alt={`Primary image of ${product?.title}`}
                fill={false}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onMouseMove={handleMouseMove}
              />
            </div>
            <div
              className={`absolute pointer-events-none w-28 h-28 opacity-100 border border-solid bg-white bg-no-repeat bg-bgSize ${
                hoverImage ? "" : "hidden"
              } bg-[image:var(selectedImage)]`}
              style={{
                top: `${cursorPosition.y}%`,
                left: `${cursorPosition.x}%`,
                backgroundImage: `url(${backgroundImageUrl})`,
                backgroundPosition: `${cursorPosition.x}% ${cursorPosition.y}%`,
              }}
            ></div>
          </div>
        </div>
        <div className="col-span-6 xs:col-span-12 space-y-4">
          <h1 className="text-font-size-one font-bold">{product?.title}</h1>
          <span
            className={`text-mainColor px-[5px] py-[3px] rounded-md text-sm ${
              product?.discountedPercentage === 0 ? "hidden" : ""
            }`}
          >
            Discount : ({product?.discountedPercentage}%)
          </span>
          <div className="flex space-x-3">
            <span className="">{product?.price}$</span>
            <span
              className={`font-medium text-decoration-line-through text-priceColor ${
                product?.discountedPrice ? "" : "hidden"
              }`}
            >
              {product?.discountedPrice}$
            </span>
          </div>
          <p className="text-textColor">
            {truncateDescription(product?.description)}
          </p>
          <div className="flex flex-col space-y-3 border-t border-borderColor border-solid py-3">
            <div className="space-x-3">
              <span className="font-bold text-lg">stock:</span>
              <span
                className={`${
                  product?.stock === 0 ? "text-red-700" : "text-black"
                }`}
              >
                {`${
                  product?.stock === 0 ? "Out Of Stock" : `${product?.stock}`
                }`}
              </span>
            </div>
            <div className="space-x-3">
              <span className="font-bold text-lg">Color:</span>
              <span className="rounded-full outline-black"></span>
            </div>
            <button
              className={`bg-black text-white hover:bg-mainColor transition duration-500 capitalize px-5 py-2 rounded-md w-fit mx-auto ${
                status === "authenticated"
                  ? ""
                  : "pointer-events-none opacity-btn-disabled"
              }`}
            >
              add to cart
            </button>
          </div>
          <div className="space-y-3 border-t border-borderColor border-solid py-3">
            <form className="space-x-3">
              <input
                type="checkbox"
                className=""
              />
              <label className="space-x-1">
                <span className="text-linkColor">I agree whith the</span>
                <Link
                  href="/faq"
                  className="text-decoration-underline"
                >
                  terms and conditions
                </Link>
              </label>
            </form>
            <button
              className={`bg-black text-white hover:bg-mainColor transition duration-500 uppercase px-5 py-2 rounded-md w-full ${
                status === "authenticated"
                  ? ""
                  : "pointer-events-none opacity-btn-disabled"
              }`}
            >
              buy it now
            </button>
            <ul className="space-y-3">
              <li className="">Vendor: {product?.vendor}</li>
              <li className="">SKU: {product?.sku}</li>
              <li className="">Category: {product?.category}</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-b border-borderColor">
        <h1 className="border-y border-borderColor py-3 flex justify-center">
          <span className="font-bold text-lg border-b-2 border-b-black  ">
            Description
          </span>
        </h1>
        <p className="text-textColor w-[75%] xs:w-full xs:px-5 text-center mx-auto py-5 leading-8">
          {product?.description}
        </p>
      </div>
    </div>
  );
};

export default SingleProduct;

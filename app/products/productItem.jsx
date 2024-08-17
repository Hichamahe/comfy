"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useMenuContext } from "@/context/MenuContext";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/store/slices/cartSlice";
import { IoCart } from "react-icons/io5";
import Loadingbtn from "../elements/loadingbtn/loadingbtn";

function ProductItem({ product }) {
  const { data: session, status } = useSession();
  const { isAccountOpen, setIsAccountOpen, toggleCart } = useMenuContext();
  const [ishover, setIshover] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const isInCart = useSelector((state) => state.cart.isInCart[product._id]);

  const handleAddToCart = async () => {
    if (status === "authenticated" && session) {
      setIsLoading(true);
      const userId = session?.user?._id; // ou session.user._id selon votre implémentation
      await dispatch(addToCart({ userId, productId: product._id }));
      setIsLoading(false);
    } else {
      setIsAccountOpen(!isAccountOpen);
    }
  };

  return (
    <div className="xs:mx-5">
      <div className="relative">
        <div className="absolute z-primary-Zindex p-2 text-white w-full flex justify-between">
          <span
            className={`bg-mainColor px-[5px] py-[3px] rounded-md text-sm ${
              product?.stock > 0 ? "hidden" : ""
            }`}
          >
            {`${product?.stock === 0 ? "Out Of Stock" : ""}`}
          </span>
          <span
            className={`bg-mainColor px-[5px] py-[3px] rounded-md text-sm ${
              product?.discountedPercentage === 0 ? "hidden" : ""
            }`}
          >
            {`${
              product?.discountedPercentage === 0
                ? ""
                : `${product?.discountedPercentage}%`
            }`}
          </span>
        </div>
        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setIshover(true)}
          onMouseLeave={() => setIshover(false)}
        >
          <Link href={`/product-details/${product?._id}`}>
            <Image
              src={`/images/${product?.images[0].primary}`}
              className="w-full h-full object-cover"
              width={700}
              height={700}
              alt={`Primary image of ${product?.title}`}
              property="true"
            />
            <Image
              src={`/images/${product?.images[0].secondary}`}
              className={`absolute top-0 left-0 w-full h-full transition duration-700 ease-out ${
                ishover ? "opacity-100 scale-125" : "opacity-0 scale-100"
              }`}
              alt={`Secondary image of ${product?.title}`}
              width={700}
              height={700}
              priority="true"
            />
          </Link>
          {product?.stock > 0 ? (
            <button
              className={`flex justify-evenly items-center bg-white absolute left-1/2 bottom-4 transform -translate-x-1/2 w-5/6 p-1 tracking-[1px] hover:bg-mainColor hover:text-white rounded-md transition duration-500 ${
                ishover ? "opacity-100" : "opacity-0"
              }`}
              onClick={isInCart ? toggleCart : handleAddToCart}
            >
              {isLoading ? (
                <Loadingbtn />
              ) : isInCart ? (
                <>
                  <IoCart className="text-xl" />
                  IN CART
                </>
              ) : (
                "+ ADD TO CART"
              )}
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="space-y-2 flex flex-col items-center justify-center p-3 w-full">
        <h3 className="font-bold text-slate-600 w-full text-center">
          {product?.title}
        </h3>
        <div className="space-x-6">
          <span className="font-bold">{product?.price}$</span>
          <span
            className={`font-medium text-decoration-line-through text-priceColor ${
              product?.discountedPrice ? "" : "hidden"
            }`}
          >
            {`${product?.discountedPrice ? product?.discountedPrice : ""}$`}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;

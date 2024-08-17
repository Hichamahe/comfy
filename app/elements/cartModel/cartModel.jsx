"use client";
import React, { useEffect, useState } from "react";
import { useMenuContext } from "@/context/MenuContext";
import Image from "next/image";
import Link from "next/link";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";
import { useSession } from "next-auth/react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCartItems,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} from "@/store/slices/cartSlice";

function CartModel() {
  const { isCartOpen, toggleCart, openAlert, closeAlert } = useMenuContext();
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const cartItems = items || [];

  useEffect(() => {
    if (userId) {
      dispatch(fetchCartItems(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (isCartOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isCartOpen]);

  const openRemoveAlert = (product) => {
    openAlert({
      productTitle: product.productTitle,
      onConfirm: () => {
        dispatch(removeFromCart({ userId, productId: product.productId }));
        closeAlert();
      },
      onCancel: closeAlert,
    });
  };

  const handleIncrementQuantity = (productId) => {
    dispatch(incrementQuantity({ userId, productId }));
  };

  const handleDecrementQuantity = (productId) => {
    dispatch(decrementQuantity({ userId, productId }));
  };

  return (
    <div
      className={`flex justify-end fixed top-0 right-0 z-Seventh-Zindex h-full bg-bgColor ${
        isCartOpen ? "w-full" : "w-0"
      }`}
    >
      <aside
        className={`fixed z-eighth-Zindex right-0 top-0 w-[40vw] xs:w-[80vw] h-screen bg-white transition-transform duration-700 ease-in-out overflow-y-auto ${
          isCartOpen
            ? "transform translate-x-0"
            : "transform translate-x-[101%]"
        }`}
      >
        <div className="flex justify-between items-center p-4 bg-darkColor">
          <h1 className="text-white uppercase font-bold">shopping cart</h1>
          <IoClose
            onClick={toggleCart}
            className="text-white text-2xl font-bold cursor-pointer"
          />
        </div>
        <div className="overflow-y-auto h-[calc(100vh-100px)] flex flex-col items-center justify-between">
          {cartItems.length === 0 ? (
            <div className="space-y-4 p-4">
              <p className="text-center">Your cart is empty.</p>
              <button
                className="font-sans px-6 py-2 text-white bg-darkColor uppercase hover:bg-mainColor transition duration-500"
                onClick={toggleCart}
              >
                Return to shop
              </button>
            </div>
          ) : (
            <>
              {cartItems.map((item, index) => (
                <div
                  className="p-3 grid grid-cols-10 gap-2 w-full"
                  key={index}
                >
                  <div className="col-span-3">
                    <Image
                      src={`/images/${item.productImage}`}
                      alt={`image of ${item.productTitle}`}
                      width={100}
                      height={100}
                      className=""
                    />
                  </div>
                  <div className="col-span-7 grid-rows-5">
                    <div className="row-span-2">
                      <Link href={`/product-details/${item?.productId}`}>
                        <strong className="">{item.productTitle}</strong>
                      </Link>
                    </div>
                    <div className="grid grid-cols-10 row-span-3">
                      <div className="col-span-5 space-y-8 h-full">
                        <div className="space-x-3">
                          <span className="font-bold">
                            {item.productPrice}$
                          </span>
                          <span
                            className={`text-decoration-line-through text-priceColor ${
                              item.productDiscountedPrice <= 0 ? "hidden" : ""
                            }`}
                          >
                            {item.productDiscountedPrice}$
                          </span>
                        </div>
                        <RiDeleteBinLine
                          onClick={() => openRemoveAlert(item)}
                          className="cursor-pointer"
                        />
                      </div>
                      <div className="col-span-5">
                        <div className="space-x-3">
                          <button
                            className=""
                            onClick={() =>
                              handleDecrementQuantity(item.productId)
                            }
                            disabled={item.quantity === 1}
                          >
                            <FaMinus
                              className={`${
                                item.quantity === 1
                                  ? "bg-gray-400 cursor-not-allowed"
                                  : "hover:bg-mainColor bg-darkColor text-white cursor-pointer"
                              } p-1 rounded-sm text-lg`}
                            />
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            className=""
                            onClick={() =>
                              handleIncrementQuantity(item.productId)
                            }
                            disabled={item.quantity === item.productStock}
                          >
                            <FaPlus
                              className={`${
                                item.quantity === item.productStock
                                  ? "bg-gray-400 cursor-not-allowed"
                                  : "hover:bg-mainColor bg-darkColor text-white cursor-pointer"
                              } p-1 rounded-sm text-lg`}
                            />
                          </button>
                        </div>
                        <div className="">
                          <span
                            className={`p-2 text-center ${
                              item.productStock <= 2 ? "text-red-700" : ""
                            }`}
                          >
                            stock : {item.productStock}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
          <div className="sticky bottom-0 bg-white w-full">
            <div className="flex justify-between items-center w-full p-3">
              <span className="font-bold">Total Price</span>
              <span className="font-bold">
                {" "}
                {cartItems.reduce(
                  (acc, item) => acc + item.productPrice * item.quantity,
                  0
                )}
                $
              </span>
            </div>
            <div className="flex flex-col items-center justify-center space-y-3 mx-3">
              <button className="font-bold px-4 py-2 bg-gray-100 hover:bg-gray-200 w-full transition duration-500">
                Checkout
              </button>
              <Link
                href="/cart"
                onClick={toggleCart}
              >
                <span>View cart</span>
              </Link>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

export default CartModel;

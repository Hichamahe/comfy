"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoIosClose } from "react-icons/io";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiArrowLeftCircle } from "react-icons/fi";
import { useSession } from "next-auth/react";
import { useSelector, useDispatch } from "react-redux";
import { useMenuContext } from "@/context/MenuContext";
import {
  fetchCartItems,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} from "@/store/slices/cartSlice";
import Loading from "@/app/elements/loadingtwo/loading";

function Cart() {
  const { isCartOpen, toggleCart, openAlert, isAlertOpen, closeAlert } =
    useMenuContext();
  const { data: session, status } = useSession();
  const userId = session?.user?.id;
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const cartItems = items || [];

  useEffect(() => {
    if (isAlertOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isAlertOpen]);

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

  const openClearAlert = () => {
    openAlert({
      productTitle: "all items",
      onConfirm: () => {
        dispatch(clearCart({ userId }));
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
    <div>
      <div className="bg-bgCoverImage bg-cover h-[50vh] flex items-center justify-center">
        <div className="flex flex-col items-center justify-center space-y-3">
          <h1 className="font-bold text-5xl">Cart</h1>
          <ol className="flex space-x-2">
            <li>
              <Link
                href="/"
                className=""
              >
                home
              </Link>
            </li>
            <li>/ Cart</li>
          </ol>
        </div>
      </div>
      <div className="w-full px-6 ml-auto mr-auto py-16 overflow-x-auto min-h-[80vh]">
        {status === "loading" ? (
          <Loading />
        ) : cartItems.length === 0 ? (
          <div className="flex flex-col justify-center items-center space-y-3">
            <span className="font-bold">Your cart is empty.</span>
            <Link href="/shop">
              <button className="font-sans rounded-md px-6 py-2 text-white bg-darkColor uppercase hover:bg-mainColor transition duration-500">
                continue shopping
              </button>
            </Link>
          </div>
        ) : (
          <div className="">
            <div className="overflow-x-auto w-full">
              <table className="border-collapse table-auto w-full xs:w-customWidth">
                <thead>
                  <tr className="border-b border-solid">
                    <th className="p-2 text-center uppercase">product</th>
                    <th className="p-2 text-center uppercase">price</th>
                    <th className="p-2 text-center uppercase">stock</th>
                    <th className="p-2 text-center uppercase">quantity</th>
                    <th className="p-2 text-center uppercase">total</th>
                  </tr>
                </thead>
                <tbody className="">
                  {cartItems.map((item, index) => (
                    <tr
                      className="border-b border-solid"
                      key={index}
                    >
                      <td className="p-2 w-1/2">
                        <div className="flex items-center space-x-2 text-center">
                          <IoIosClose
                            onClick={() => openRemoveAlert(item)}
                            className="text-3xl cursor-pointer"
                          />
                          <Image
                            src={`/images/${item.productImage}`}
                            alt={`image of ${item.productTitle}`}
                            width={100}
                            height={100}
                            className="w-20 h-20"
                          />
                          <Link href={`/product-details/${item?.productId}`}>
                            <p className="font-bold hover:text-mainColor">
                              {item.productTitle}
                            </p>
                          </Link>
                        </div>
                      </td>

                      <td className="space-x-3 p-2 text-center">
                        <span className="font-bold">{item.productPrice}$</span>
                        <span
                          className={`text-decoration-line-through text-priceColor ${
                            item.productDiscountedPrice <= 0 ? "hidden" : ""
                          }`}
                        >
                          {item.productDiscountedPrice}$
                        </span>
                      </td>

                      <td
                        className={`p-2 text-center ${
                          item.productStock <= 2 ? "text-red-500" : ""
                        }`}
                      >
                        {item.productStock}
                      </td>

                      <td className="p-2 text-center space-x-3">
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
                      </td>

                      <td className="p-2 text-center font-bold">
                        {item.productPrice * item.quantity}$
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-around items-center mt-4 xs:flex-col-reverse space-y-2">
              <Link href="/shop">
                <button className="rounded-md px-6 py-2 text-white bg-darkColor font-bold hover:bg-mainColor transition duration-500 flex items-center space-x-3 mt-2">
                  <FiArrowLeftCircle />
                  <span>Continue Shopping</span>
                </button>
              </Link>
              <button
                className="rounded-md px-6 py-2 text-white bg-darkColor font-bold hover:bg-mainColor transition duration-500 flex items-center space-x-3"
                onClick={openClearAlert}
              >
                <RiDeleteBin6Line />
                <span className="">Empty Shopping Cart</span>
              </button>
              <span>
                <span>TOTAL PRICE:</span>
                <span className="text-mainColor">
                  {cartItems.reduce(
                    (acc, item) => acc + item.productPrice * item.quantity,
                    0
                  )}
                  $
                </span>
              </span>
            </div>
            <div className="text-center mt-4">
              <button className="rounded-md px-6 py-2 text-white bg-darkColor font-bold my-3 w-1/2 hover:bg-mainColor transition duration-500">
                checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;

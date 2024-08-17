"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import Logo from "../../../public/images/logo-header.png";
import Navbar from "../navbar/navbar";
import { FaSearch, FaShoppingCart, FaUnlock, FaBars } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { FaUser } from "react-icons/fa";
import { useMenuContext } from "@/context/MenuContext";
import { useSelector, useDispatch } from "react-redux";
import { fetchCartItems } from "@/store/slices/cartSlice";

const listItems = ["home", "shop", "about", "contact", "faq"];

function Header() {
  const {
    isAccountOpen,
    setIsAccountOpen,
    toggleMenu,
    toggleAccount,
    toggleCart,
  } = useMenuContext();
  const { data: session, status } = useSession();
  const userId = session?.user?._id;
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);
  const cartItems = items || [];

  const handleAccountClick = () => {
    setIsAccountOpen(!isAccountOpen);
  };

  useEffect(() => {
    if (userId) {
      dispatch(fetchCartItems(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (isAccountOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isAccountOpen]);

  return (
    <header className="flex items-center justify-between h-16 px-6 border-b bg-white border-b-borderColor border-solid md:sticky lg:sticky top-0 z-third-Zindex">
      <div className="">
        <Link href="/">
          <Image
            src={Logo}
            alt="logo"
            width={100}
            height={"auto"}
            priority={true}
          />
        </Link>
      </div>
      <Navbar
        className=""
        ListItems={listItems}
      />
      <div className=" flex items-center space-x-8 justify-end sm:hidden xs:hidden">
        <div className="">
          {status === "authenticated" ? (
            <Link href="/profil">
              <FaUser className="text-lg text-primaryColor" />
            </Link>
          ) : (
            <button
              className="flex space-x-1 group"
              onClick={handleAccountClick}
            >
              <FaUnlock className="text-lg text-primaryColor group-hover:text-mainColor" />
              <span className="text-md text-primaryColor font-bold group-hover:text-mainColor">
                Login/Register
              </span>
            </button>
          )}
        </div>
        <div className="">
          <Link href="/search">
            <FaSearch className="text-lg text-primaryColor hover:text-mainColor" />
          </Link>
        </div>
        <div className="">
          <span className="absolute top-0 -translate-x-3 translate-y-2 text-sm font-bold bg-mainColor text-white rounded-full w-5 h-4 flex items-center justify-center">
            {status === "authenticated" ? cartItems.length : 0}
          </span>
          <FaShoppingCart
            className="text-lg text-primaryColor hover:text-mainColor cursor-pointer"
            onClick={status === "authenticated" ? toggleCart : toggleAccount}
          />
        </div>
      </div>
      <div className="md:hidden lg:hidden">
        <FaBars
          className="border text-3xl p-1 rounded-md text-primaryColor cursor-pointer"
          onClick={toggleMenu}
        />
      </div>
    </header>
  );
}

export default Header;

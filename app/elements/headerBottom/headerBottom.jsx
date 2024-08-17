"use client";
import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUser, FaSearch, FaShoppingCart } from "react-icons/fa";
import { FaShop } from "react-icons/fa6";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useMenuContext } from "@/context/MenuContext";
import { useSelector } from "react-redux";

function HeaderBottom() {
  const { status } = useSession();
  const { isAccountOpen, setIsAccountOpen, toggleAccount, toggleCart } =
    useMenuContext();
  const { items } = useSelector((state) => state.cart);
  const cartItems = items || [];

  const handleAccountClick = () => {
    setIsAccountOpen(!isAccountOpen);
  };

  useEffect(() => {
    if (isAccountOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isAccountOpen]);

  useEffect(() => {
    if (status === "authenticated") {
      setIsAccountOpen(false);
    }
  }, [status, setIsAccountOpen]);

  return (
    <>
      <div className="w-full md:hidden lg:hidden bg-white overflow-x-hidden sticky bottom-0 z-third-Zindex">
        <div className="row p-3">
          <div className="col-3 flex justify-center">
            {status === "authenticated" ? (
              <Link href="/profil">
                <FaUser className="text-xl hover:text-mainColor cursor-pointer text-primaryColor" />
              </Link>
            ) : (
              <FaUser
                className="text-xl hover:text-mainColor cursor-pointer text-primaryColor"
                onClick={handleAccountClick}
              />
            )}
          </div>
          <div className="col-3 flex justify-center">
            <Link href="/shop">
              <FaShop className="text-xl hover:text-mainColor cursor-pointer text-primaryColor " />
            </Link>
          </div>
          <div className="col-3 flex justify-center">
            <Link href="/search">
              <FaSearch className="text-xl hover:text-mainColor cursor-pointer text-primaryColor " />
            </Link>
          </div>
          <div className="col-3 flex justify-center">
            <span className="absolute top-0 -translate-x-3 translate-y-2 text-sm font-bold bg-mainColor text-white rounded-full w-5 h-4 flex items-center justify-center">
              {status === "authenticated" ? cartItems.length : 0}
            </span>
            <FaShoppingCart
              className="text-xl hover:text-mainColor cursor-pointer text-primaryColor"
              onClick={status === "authenticated" ? toggleCart : toggleAccount}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default HeaderBottom;

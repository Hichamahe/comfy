"use client";
import React from "react";
import { IoIosClose } from "react-icons/io";
import { useMenuContext } from "@/context/MenuContext";

function Alert() {
  const { isAlertOpen, alertProps, closeAlert } = useMenuContext();

  if (!isAlertOpen) return null;

  const { productTitle, onConfirm } = alertProps;
  return (
    <div className="fixed top-0 left-0 start-0 z-eighth-Zindex w-screen h-screen bg-bgColor">
      <div className="bg-AlertColor absolute start-50 top-50 translate-middle px-2 py-4 space-y-4 rounded-md xs:w-[80%] mx-auto">
        <div className="flex justify-end items-center">
          <IoIosClose
            className="text-2xl cursor-pointer"
            onClick={closeAlert}
          />
        </div>
        <div className="">
          <p className="text-center">
            Are you sure you want to delete {productTitle} from cart?
          </p>
        </div>
        <div className="flex justify-center items-center space-x-5">
          <button
            className="bg-darkColor text-white rounded-md p-2 hover:bg-mainColor transition duration-500"
            onClick={onConfirm}
          >
            confirm
          </button>
          <button
            className="bg-darkColor text-white rounded-md p-2 hover:bg-mainColor transition duration-500"
            onClick={closeAlert}
          >
            cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default Alert;

"use client";
import React, { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { useSession } from "next-auth/react";

function SeccessAuth() {
  const { status } = useSession();
  const [isVisible, setIsVisible] = useState(status === "authenticated");

  useEffect(() => {
    if (status === "authenticated") {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [status]);

  return (
    <div
      className={`absolute z-eighth-Zindex start-50 top-50 translate-middle rounded-lg w-[40%]  mx-auto ${
        isVisible ? "" : "hidden"
      }`}
    >
      <div className="flex justify-between items-center bg-white p-2">
        <span className="text-textColor">Comfy</span>
        <IoIosClose
          className="text-2xl cursor-pointer"
          onClick={() => {
            setIsVisible(false);
          }}
        />
      </div>
      <div className="bg-darkColor p-2">
        <span className="text-white">Login successfully!</span>
      </div>
    </div>
  );
}

export default SeccessAuth;

"use client";
import React from "react";
import "../../(components)/shop/style.css";
import { IoClose } from "react-icons/io5";

function MenuFilters({
  category,
  handleCategoryChange,
  price,
  handlePriceChange,
  sidebarVisible,
  isXsScreen,
  toggleSidebar,
}) {
  return (
    <aside
      className={`${
        isXsScreen
          ? `fixed right-0 top-0 z-eighth-Zindex w-[60vw] h-screen bg-white space-y-5 transition-transform duration-700 ease-in-out ${
              sidebarVisible
                ? "transform translate-x-0"
                : "transform translate-x-full"
            }`
          : ""
      }`}
    >
      <div className="bg-black xs:flex justify-between p-3 hidden">
        <h3 className="text-white">FILTERS</h3>
        <IoClose
          className="text-white cursor-pointer text-xl"
          onClick={toggleSidebar}
        />
      </div>
      <div className="space-y-4 p-2">
        <h2
          className="relative pb-4 font-bold before:content-[''] before:left-0 before:absolute before:h-[2px] before:bottom-[2px] before:bg-slate-300 before:w-full 
                            after:content-[''] after:left-0 after:absolute after:h-[2px] after:bottom-[2px] after:bg-mainbgColor after:w-2/6"
        >
          Categories
        </h2>
        <div className="flex space-x-1">
          <input
            type="radio"
            name="category"
            value="all"
            checked={category === "all"}
            onChange={handleCategoryChange}
            className="custom-radio"
          />
          <label className="text-textColor">All Categories</label>
        </div>
        <div className="flex space-x-1">
          <input
            type="radio"
            name="category"
            value="Decors"
            checked={category === "Decors"}
            onChange={handleCategoryChange}
            className="custom-radio"
          />
          <label className="text-textColor">Decors</label>
        </div>
        <div className="flex space-x-1">
          <input
            type="radio"
            name="category"
            value="Chairs"
            checked={category === "Chairs"}
            onChange={handleCategoryChange}
            className="custom-radio"
          />
          <label className="text-textColor">Chairs</label>
        </div>
        <div className="flex space-x-1">
          <input
            type="radio"
            name="category"
            value="Sofas"
            checked={category === "Sofas"}
            onChange={handleCategoryChange}
            className="custom-radio"
          />
          <label className="text-textColor">Sofas</label>
        </div>
        <div className="flex space-x-1">
          <input
            type="radio"
            name="category"
            value="Tables"
            checked={category === "Tables"}
            onChange={handleCategoryChange}
            className="custom-radio"
          />
          <label className="text-textColor">Tables</label>
        </div>
        <div className="flex space-x-1">
          <input
            type="radio"
            name="category"
            value="Lighting"
            checked={category === "Lighting"}
            onChange={handleCategoryChange}
            className="custom-radio"
          />
          <label className="text-textColor">Lighting</label>
        </div>
      </div>
      <div className="space-y-4 p-2">
        <h2
          className="relative pb-4 font-bold before:content-[''] before:left-0 before:absolute before:h-[2px] before:bottom-[2px] before:bg-slate-300 before:w-full 
                            after:content-[''] after:left-0 after:absolute after:h-[2px] after:bottom-[2px] after:bg-mainbgColor after:w-1/6"
        >
          Price
        </h2>
        <input
          type="range"
          min={150}
          max={1000}
          value={price}
          onChange={handlePriceChange}
          className="w-full custom-range"
        />
        <div className="flex justify-between">
          <span className="">150$</span>
          <span className="">1000$</span>
        </div>
      </div>
    </aside>
  );
}

export default MenuFilters;

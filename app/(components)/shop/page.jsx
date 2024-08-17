"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaFilter } from "react-icons/fa6";
import "./style.css";
import axios from "axios";
import ListProducts from "@/app/products/listProducts";
import Loading from "@/app/elements/loadingtwo/loading";
import { useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
import MenuFilters from "@/app/elements/MenuFilters/MenuFilters";

const getProducts = async (searchParams) => {
  const urlParams = {
    category: searchParams.category,
    page: searchParams.page,
    "price[lte]": searchParams.price,
    sort: searchParams.sort,
  };

  const searchQuery = queryString.stringify(urlParams);

  try {
    const { data } = await axios.get(`/api/product?${searchQuery}`);
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

function Shop() {
  const [sort, setSort] = useState("default");
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [price, setPrice] = useState(1000);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [isXsScreen, setIsXsScreen] = useState(false);

  const router = useRouter();
  const searchParamsNext = useSearchParams();

  const updateUrl = (category, page, price, sort) => {
    const params = new URLSearchParams();
    params.set("category", category);
    params.set("page", page);
    params.set("price", price);
    params.set("sort", sort);
    router.push(`/shop?${params}`);
  };

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setCategory(selectedCategory);
    setCurrentPage(1);
    updateUrl(selectedCategory, 1, price, sort);
  };

  const handlePriceChange = (event) => {
    const rangePrice = event.target.value;
    setPrice(rangePrice);
    setCurrentPage(1);
    updateUrl(category, 1, rangePrice, sort);
  };

  const handleSort = (event) => {
    const option = event.target.value;
    setSort(option);
    updateUrl(category, 1, price, option);
  };

  const fetchData = async (params) => {
    setLoading(true);
    try {
      const productsData = await getProducts(params);
      setData(productsData);
      const resPerPage = productsData.resPerPage;
      const totalProducts = productsData.filteredProductsCount;
      setTotalPage(Math.ceil(totalProducts / resPerPage));
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const category = searchParamsNext.get("category") || "all";
    const page = parseInt(searchParamsNext.get("page"), 10) || 1;
    const price = parseInt(searchParamsNext.get("price") || 1000);
    const sort = searchParamsNext.get("sort") || "default";

    // Mise à jour des états locaux
    setCategory(category);
    setCurrentPage(page);
    setPrice(price);
    setSort(sort);

    // Si les paramètres ne sont pas présents dans l'URL, les ajouter
    if (
      !searchParamsNext.get("category") ||
      !searchParamsNext.get("page") ||
      !searchParamsNext.get("price") ||
      !searchParamsNext.get("sort")
    ) {
      updateUrl(category, page, price, sort);
    } else {
      fetchData({ category, page, price, sort });
    }
  }, [searchParamsNext]);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };
  const handleScreenWidth = () => {
    setIsXsScreen(window.innerWidth < 767);
  };

  useEffect(() => {
    handleScreenWidth();

    window.addEventListener("resize", handleScreenWidth);
    return () => {
      window.removeEventListener("resize", handleScreenWidth);
    };
  }, []);

  useEffect(() => {
    if (sidebarVisible) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [sidebarVisible]);

  return (
    <section>
      <div className="bg-bgCoverImage bg-cover h-[50vh] flex items-center justify-center">
        <div className="flex flex-col items-center justify-center space-y-3">
          <h1 className="font-bold text-5xl">Shop</h1>
          <ol className="flex space-x-2">
            <li className="">
              <Link
                href="/"
                className=""
              >
                home
              </Link>
            </li>
            <li className="">/ Shop</li>
          </ol>
        </div>
      </div>
      <div className="grid grid-cols-12 my-5 px-6 gap-4">
        <div className="col-span-9 xs:col-span-12 space-y-4">
          <div className="flex justify-between xs:flex-col space-y-2">
            <p className="font-medium flex items-center">
              Showing page {currentPage} of {totalPage} pages
            </p>
            <div className="flex justify-between items-center flex-wrap">
              <button
                className="xs:flex items-center justify-center border border-borderColor p-2 rounded-md hidden cursor-pointer"
                onClick={toggleSidebar}
              >
                <FaFilter className="text-xl mr-1" />
                Filters
              </button>
              <div className="space-y-1">
                <div className="flex justify-center items-center border border-borderColor rounded-md">
                  <span className="text-linkColor">Sort By:</span>
                  <select
                    name="option"
                    id="option"
                    value={sort}
                    onChange={handleSort}
                    className="p-2 space-y-3 cursor-pointer"
                  >
                    <option
                      value="default"
                      className="text-textColor"
                    >
                      default
                    </option>
                    <option
                      value="price"
                      className="text-textColor"
                    >
                      Price : Low To High
                    </option>
                    <option
                      value="-price"
                      className="text-textColor"
                    >
                      Price : High To Low
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-4 justify-center items-center xs:flex-col">
            {loading ? <Loading /> : <ListProducts data={data} />}
          </div>
        </div>
        <div
          className={`col-span-3 space-y-4 ${
            isXsScreen
              ? `fixed top-0 right-0 z-eighth-Zindex  bg-bgColor h-full 
          ${sidebarVisible ? "w-full" : "w-0"}`
              : ""
          }`}
        >
          <MenuFilters
            category={category}
            handleCategoryChange={handleCategoryChange}
            price={price}
            handlePriceChange={handlePriceChange}
            sidebarVisible={sidebarVisible}
            toggleSidebar={toggleSidebar}
            isXsScreen={isXsScreen}
          />
        </div>
      </div>
    </section>
  );
}

export default Shop;

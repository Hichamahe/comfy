"use client";
import React, { useState, useEffect } from "react";
import CarouselHome from "@/app/elements/carousels/carouselHome/carousel";
import image1 from "@/public/images/eco-friendly.jpg";
import image2 from "@/public/images/luxury.jpg";
import Image from "next/image";
import Link from "next/link";
import { FaLongArrowAltRight } from "react-icons/fa";
import Brands from "@/app/elements/brands/brands";
import HomeServeces from "@/app/elements/homeServices/homeServeces";
import Loading from "@/app/elements/loadingtwo/loading";
import CarouselProducts from "@/app/elements/carousels/carouselProducts/carouselProducts";
import FiltredProducts from "@/app/elements/filtredProducts/page";
import axios from "axios";

const brand = [
  { src: image1, category: "MID-SEASON", title: "Eco-Friendly" },
  { src: image2, category: "Top Trending", title: "Outdoor" },
];

function HomePage() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [product, setProduct] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const filterProducts = await axios.get(`/api/product/FilterProducts`);
      const CategoriesProducts = await axios.get(
        `/api/product/CategoriesProducts`
      );

      setData(filterProducts.data.data);
      setProduct(CategoriesProducts.data.products);
    } catch (e) {
      setError(e);
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="">
      <CarouselHome />
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-font-size-one p-6 sm:p-12 md:p-12 lg:p-12 font-bold">
          Top Trending
        </h1>
      </div>
      {loading ? <Loading /> : <CarouselProducts data={data} />}
      <div className="flex xs:flex-col gap-4 p-6 w-full xs:h-[800px] flex-wrap">
        {brand.map((item, index) => (
          <div
            key={index}
            className="flex-1 relative overflow-hidden flex justify-start items-center h-[400px]"
          >
            <Image
              src={item.src}
              alt={item.src}
              width="auto"
              height="auto"
              fill={false}
              className="absolute top-0 left-0 w-full h-full transition duration-700 ease-out hover:scale-125"
            />
            <div className="absolute left-[10%] space-y-6">
              <span className="text-mainColor font-bold">{item.category}</span>
              <h1 className="font-bold text-font-size-one">{item.title}</h1>
              <Link
                href="/shop"
                className="font-bold flex items-center w-fit hover:text-mainColor"
              >
                Shop-now
                <FaLongArrowAltRight className="ml-2" />
              </Link>
            </div>
          </div>
        ))}
      </div>
      {loading ? <Loading /> : <FiltredProducts product={product} />}
      <HomeServeces />
      <Brands />
    </section>
  );
}

export default HomePage;

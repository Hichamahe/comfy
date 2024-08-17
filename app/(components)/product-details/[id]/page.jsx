"use client";
import Brands from "@/app/elements/brands/brands";
import CarouselProducts from "@/app/elements/carousels/carouselProducts/carouselProducts";
import SingleProduct from "@/app/products/SingleProduct";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "@/app/elements/loadingtwo/loading";

const getData = async (id) => {
  const { data } = await axios.get(`/api/product/${id}`);
  return data;
};

function ProductDetails({ params }) {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!params?.id) return;
    const fetchData = async (id) => {
      setLoading(true);
      try {
        const productData = await getData(id);
        setProduct(productData.product);
        setData(productData.products);
      } catch (error) {
        console.error("Error fetching product data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData(params.id);
  }, [params?.id]);

  return (
    <section className="">
      {loading ? <Loading /> : <SingleProduct product={product} />}
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-font-size-one p-6 sm:p-12 md:p-12 lg:p-12 font-bold">
          Related Products
        </h1>
      </div>
      {loading ? <Loading /> : <CarouselProducts data={data} />}
      <Brands />
    </section>
  );
}

export default ProductDetails;

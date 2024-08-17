import React from "react";
import axios from "axios";
import ProductDetails from "../products/SingleProduct";
import CarouselProducts from "../elements/carousels/carouselProducts/carouselProducts";

const getData = async (id) => {
  const { data } = await axios.get(
    `${process.env.NEXTAUTH_URL}/api/product/${id}`
  );
  return data;
};

const SingleProduct = async ({ params }) => {
  const productsData = await getData(params.id);
  const product = productsData.product;
  const data = productsData;

  return (
    <>
      <ProductDetails product={product} />
      <CarouselProducts data={data} />
    </>
  );
};

export default SingleProduct;

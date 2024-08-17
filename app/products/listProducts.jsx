import React from "react";
import ProductItem from "./productItem";
import CustomPagination from "../layout/customPagination";

function ListProducts({ data }) {
  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 gap-4">
        {data?.products?.map((product) => (
          <ProductItem
            key={product?._id}
            product={product}
          />
        ))}
      </div>
      <CustomPagination
        resPerPage={data?.resPerPage}
        productsCount={data?.filteredProductsCount}
      />
    </div>
  );
}

export default ListProducts;

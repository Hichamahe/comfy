import { NextResponse } from "next/server";
import { connectMongoDB } from "@/backend/lib/mongodb";
import Product from "@/backend/models/product";
import APIFilters from "@/backend/utils/APIFilters";

const LoadDB = async () => {
  await connectMongoDB();
};

LoadDB();

export const GetProducts = async (request) => {
  const url = new URL(request.url);
  const queryStr = Object.fromEntries(url.searchParams.entries());
  const resPerPage = 6;
  const productsCount = await Product.countDocuments();

  const apiFilters = new APIFilters(Product.find(), queryStr)
    .search()
    .filter()
    .sorting();

  let products = await apiFilters.query;
  const filteredProductsCount = products.length;

  apiFilters.pagination(resPerPage);

  products = await apiFilters.query.clone();

  return NextResponse.json({
    productsCount,
    resPerPage,
    filteredProductsCount,
    products,
  });
};

export const GetProductById = async (request, { params }) => {
  try {
    const { id } = params;
    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }
    const products = await Product.find({
      category: product.category,
      _id: { $ne: id },
    });
    return NextResponse.json({ product, products });
  } catch (error) {
    console.error("Error finding product by ID:", error);
    return NextResponse.json(
      { message: "Error finding product by ID" },
      { status: 500 }
    );
  }
};

export const FilterProducts = async (request) => {
  try {
    const data = await Product.find({}).limit(5);

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json(
      { message: "Error retrieving products" },
      { status: 500 }
    );
  }
};

export const CategoriesProducts = async (request) => {
  try {
    const products = await Product.aggregate([
      {
        $group: {
          _id: "$category",
          product: { $first: "$$ROOT" },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          category: "$_id",
          product: "$product",
          count: "$count",
        },
      },
      {
        $sort: { category: 1 },
      },
    ]);
    return NextResponse.json({ products });
  } catch (error) {
    return NextResponse.json(
      { message: "Error retrieving products" },
      { status: 500 }
    );
  }
};

export const getOneOfProducts = async (request) => {
  try {
    const products = await Product.aggregate([
      {
        $group: {
          _id: "$category",
          product: { $first: "$$ROOT" },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          category: "$_id",
          product: "$product",
          count: "$count",
        },
      },
      {
        $sort: { category: 1 },
      },
    ]);
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error retrieving products:", error);
    return NextResponse.json(
      { message: "Error retrieving products" },
      { status: 500 }
    );
  }
};

export const NewProduct = async (request) => {
  try {
    const {
      title,
      description,
      images,
      price,
      discountedPrice,
      discountedPercentage,
      stock,
      vendor,
      sku,
      category,
    } = await request.json();

    const newProduct = new Product({
      title,
      description,
      images,
      price,
      discountedPrice,
      discountedPercentage,
      stock,
      vendor,
      sku,
      category,
    });

    await newProduct.save();

    return NextResponse.json(
      { message: "Product created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error creating product" },
      { status: 500 }
    );
  }
};

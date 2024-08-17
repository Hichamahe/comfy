"use client";
import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import ListProducts from "@/app/products/listProducts";
import Loading from "@/app/elements/loadingtwo/loading";
import { useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
import axios from "axios";

const getProducts = async (searchParams) => {
  const urlParams = {
    keyword: searchParams.keyword,
    page: searchParams.page,
  };

  const searchQuery = queryString.stringify(urlParams);
  console.log("searchQuery:", searchQuery);

  try {
    const { data } = await axios.get(`/api/product?${searchQuery}`);
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

function Search({ searchParams }) {
  const router = useRouter();
  const searchParamsNext = useSearchParams();
  const [keyword, setKeyword] = useState(searchParams.keyword || "");
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [data, setData] = useState(null);

  const fetchData = async (params) => {
    if (!params.keyword) return;
    setLoading(true);
    try {
      const productsData = await getProducts(params);
      setData(productsData);
    } catch (error) {
    } finally {
      setLoading(false);
      setSearched(true);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      router.push(`/search?keyword=${keyword}&page=1`);
    } else {
      router.push("/search");
    }
  };

  useEffect(() => {
    const keyword = searchParamsNext.get("keyword") || "";
    const page = searchParamsNext.get("page") || 1;
    setKeyword(keyword);
    fetchData({ keyword, page });
  }, [searchParamsNext]);

  return (
    <section className="">
      <div className="bg-bgCoverImage bg-cover h-[50vh] flex items-center justify-center">
        <div className="flex flex-col items-center justify-center space-y-3">
          <h1 className="font-bold text-5xl">Search</h1>
          <ol className="flex space-x-2">
            <li className="">
              <Link
                href="/"
                className=""
              >
                home
              </Link>
            </li>
            <li className="">/ Faq</li>
          </ol>
        </div>
      </div>
      <div className="p-6 space-y-6">
        <div className="">
          <form
            className="flex items-center justify-center space-x-6"
            onSubmit={submitHandler}
          >
            <input
              className="rounded-md px-6 py-2 w-1/2 border border-borderColor"
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              required
            />
            <button
              className="text-white bg-mainbgColor rounded-md px-6 py-2"
              type="submit"
              onClick={submitHandler}
            >
              Search
            </button>
          </form>
        </div>
        <div className="min-h-40">
          {searched && (
            <Suspense fallback={<Loading />}>
              {loading ? (
                <Loading />
              ) : data?.filteredProductsCount === 0 ? (
                <h1 className="text-xl font-medium mx-auto text-center">
                  Sorry, can&apos;t find matching products
                </h1>
              ) : (
                <div className="space-y-4">
                  <h1 className="text-xl font-medium">
                    Total Results : {data?.filteredProductsCount}
                  </h1>
                  <ListProducts data={data} />
                </div>
              )}
            </Suspense>
          )}
        </div>
      </div>
    </section>
  );
}

export default Search;

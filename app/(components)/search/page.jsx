"use client";
import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import ListProducts from "@/app/products/listProducts";
import Loading from "@/app/elements/loadingtwo/loading";
import { useRouter, useSearchParams } from "next/navigation";
import { getProducts } from "./getProducts";

function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    const currentKeyword = searchParams.get("keyword") || "";
    const currentPage = searchParams.get("page") || "1";
    setKeyword(currentKeyword);

    if (currentKeyword) {
      fetchData(currentKeyword, currentPage);
    }
  }, [searchParams]);

  const fetchData = async (keyword, page) => {
    setLoading(true);
    try {
      const productsData = await getProducts({ keyword, page });
      setData(productsData);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
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
            >
              Search
            </button>
          </form>
        </div>
        <div className="min-h-40">
          <Suspense fallback={<Loading />}>
            {loading ? (
              <Loading />
            ) : data?.filteredProductsCount === 0 ? (
              <h1 className="text-xl font-medium mx-auto text-center">
                Sorry, can&apos;t find matching products
              </h1>
            ) : data ? (
              <div className="space-y-4">
                <h1 className="text-xl font-medium">
                  Total Results : {data?.filteredProductsCount}
                </h1>
                <ListProducts data={data} />
              </div>
            ) : null}
          </Suspense>
        </div>
      </div>
    </section>
  );
}

export default Search;

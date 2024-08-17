import queryString from "query-string";
import axios from "axios";

export const getProducts = async (searchParams) => {
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

import React from "react";
import ProductList from "../productlist";
import products from "../data/products";

const WomenProducts = () => {
  const womenProducts = products.filter(product => product.category === "Women");

  return <ProductList products={womenProducts} title="Women's Collection" />;
};

export default WomenProducts;
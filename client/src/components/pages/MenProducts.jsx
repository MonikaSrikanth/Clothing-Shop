import React from "react";
import ProductList from "../productlist";
import products from "../data/products";


const MenProducts = () => {
  const MenProducts = products.filter(product => product.category === "Men");

  return <ProductList products={MenProducts} title="Men's Collection" />;
};

export default MenProducts;
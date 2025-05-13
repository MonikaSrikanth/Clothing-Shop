import React from "react";
import ProductList from "../productlist";
import products from "../data/products";


const KidsProducts = () => {
  const KidsProducts = products.filter(product => product.category === "Kids");

  return <ProductList products={KidsProducts} title="Kids's Collection" />;
};

export default KidsProducts;


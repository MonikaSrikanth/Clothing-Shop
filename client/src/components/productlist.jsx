import React from "react";
const ProductList = ({ products, title }) => {
  const handleaddtocart = async (product) => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  
    if (!isLoggedIn) {
      alert("Please login to add items to your cart.");
      const loginSection = document.getElementById("4");
      if (loginSection) {
        loginSection.scrollIntoView({ behavior: "smooth" });
        alert("Please login to continue");
      }
      return;
    }
  
    // Retrieve user data from localStorage
    const user = JSON.parse(localStorage.getItem("user")); // No need to stringify this
    console.log("Retrieved user data:", user);
  
    // Check if the user data is valid
    if (!user) {
      alert("User data not found. Please log in again.");
      window.location.href = "#login"; // Optionally, you can redirect to the login page
      return;
    }
  
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
  
    // Find the product in the cart
    const existingIndex = cart.findIndex((item) => item.name === product.name);
  
    if (existingIndex !== -1) {
      // If product already exists, increment the quantity
      cart[existingIndex].quantity += 1;
    } else {
      // Otherwise, add a new product with quantity 1
      cart.push({ ...product, quantity: 1 });
    }
  
    // Update the cart in localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} added to your cart!`);
    window.dispatchEvent(new Event("storage"));
  };
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded-lg shadow">
            <img src={product.image} alt={product.name} className="w-full h-64 object-cover rounded overflow-hidden" />
            <h3 className="mt-2 font-semibold">{product.name}</h3>
            <p className="text-gray-600">Rs.{product.price.toFixed(2)}</p>
            <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500" onClick={() => handleaddtocart(product)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
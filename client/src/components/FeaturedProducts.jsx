import { useState } from "react";

const FeaturedProducts = () => {
  const [cart, setCart] = useState([]);

  const products = [
    { name: "Jacket", price: 300, image: "/jacket.jpeg" },
    { name: "Summer Dress", price: 400, image: "/summerdress.jpeg" },
    { name: "Denim Jeans", price: 800, image: "/denim.jpeg" },
  ];

  const handleBuyNow = (product) => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  
    if (!isLoggedIn) {
      alert("Please login to add items to your cart.");
      const loginSection = document.getElementById("4");
      if (loginSection) {
        loginSection.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }
  
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("User data not found. Please log in again.");
      return;
    }
  
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingIndex = cart.findIndex((item) => item.name === product.name);
  
    if (existingIndex !== -1) {
      cart[existingIndex].quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
  
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} added to your cart!`);
    window.dispatchEvent(new Event("storage"));
  };
  
  
  return (
    <section id="2" className="py-16">
      <h2 className="text-3xl font-bold text-center">Featured Products</h2>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6">
        {products.map((product, index) => (
          <div key={index} className="p-4 border rounded-lg shadow-md">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 object-contain rounded-md"
            />
            <h3 className="text-lg font-semibold mt-4">{product.name}</h3>
            <p className="text-gray-600">Rs.{product.price}</p>
            <button
              className="mt-4 px-4 py-2 bg-black text-white rounded-lg"
              onClick={() => handleBuyNow(product)}
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;

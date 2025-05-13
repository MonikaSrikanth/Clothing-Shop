import { useEffect, useState } from "react";

const CartSection = () => {
  const [cartItems, setCartItems] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    const loadCart = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const updatedCart = cart.map((item) => ({
        ...item,
        quantity: item.quantity || 1,
      }));
      setCartItems(updatedCart);
      setOrderPlaced(false);
    };

    loadCart();
    window.addEventListener("storage", loadCart);
    return () => window.removeEventListener("storage", loadCart);
  }, []);

  const updateLocalStorage = (items) => {
    localStorage.setItem("cart", JSON.stringify(items));
  };

  const increaseQuantity = (index) => {
    const updatedItems = [...cartItems];
    updatedItems[index].quantity += 1;
    setCartItems(updatedItems);
    updateLocalStorage(updatedItems);
  };

  const decreaseQuantity = (index) => {
    const updatedItems = [...cartItems];
    if (updatedItems[index].quantity > 1) {
      updatedItems[index].quantity -= 1;
    } else {
      updatedItems.splice(index, 1);
    }
    setCartItems(updatedItems);
    updateLocalStorage(updatedItems);
  };

  const totalPrice = cartItems.reduce((acc, item) => {
    (acc, item) => acc + item.price * item.quantity;
    return acc + item.price * item.quantity;
  }, 0);

  const handlePlaceOrder = async () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
      alert("Please login to place an order.");
      const loginSection = document.getElementById("4");
      if (loginSection) {
        loginSection.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }
    const user = JSON.parse(localStorage.getItem("user")); // Must be parsed
    const token = localStorage.getItem("token"); // Retrieve JWT token
  
    if (!user) {
      alert("User information missing. Please log in again.");
      return;
    }
  
    if (!token) {
      alert("JWT token missing. Please login again.");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:5000/api/order/place", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Send token in Authorization header
        },
        body: JSON.stringify({
          items: cartItems,
          totalPrice,
          user,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert("Order placed successfully!");
        setOrderPlaced(true);
        localStorage.removeItem("cart");
        setCartItems([]);
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("There was an error placing the order. Please try again.");
    }
  };
  

  return (
    <section id="cart" className="py-16 bg-gray-100 px-4">
      <h2 className="text-3xl font-bold text-center mb-8">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
          {cartItems.map((item, index) => (
            <div key={index} className="flex justify-between items-center border-b py-2">
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-600">{item.price}</p>
                <div className="flex items-center mt-1">
                  <button
                    onClick={() => decreaseQuantity(index)}
                    className="px-2 py-1 bg-gray-300 rounded-l"
                  >
                    -
                  </button>
                  <span className="px-3">{item.quantity}</span>
                  <button
                    onClick={() => increaseQuantity(index)}
                    className="px-2 py-1 bg-gray-300 rounded-r"
                  >
                    +
                  </button>
                </div>
              </div>
              <img src={item.image} alt={item.name} className="w-16 h-16 object-contain rounded" />
            </div>
          ))}

          <div className="mt-6 text-right font-bold text-lg">
            Total: Rs.{totalPrice}
          </div>

          <button
            onClick={handlePlaceOrder}
            className="mt-6 w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
          >
            Place Order
          </button>

          {orderPlaced && (
            <p className="text-green-600 text-center mt-4 font-medium">
              🎉 Order placed successfully!
            </p>
          )}
        </div>
      )}
    </section>
  );
};

export default CartSection;

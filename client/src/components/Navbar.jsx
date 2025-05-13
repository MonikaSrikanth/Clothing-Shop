import { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const hideNavbarOn = ["/men", "/women", "/kids"];
  if (hideNavbarOn.includes(location.pathname)) {
    return null;
  }

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <a href="#" className="text-2xl font-bold">Style Clothing</a>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
        <a href="/#hero" className="hover:text-gray-500">Home</a>
        <a href="#2" className="hover:text-gray-500">Products</a> {/* if you want smooth scroll within home */}
        <a href="#3" className="hover:text-gray-500">Categories</a>
        <a href="#cart" className="hover:text-gray-500">Cart</a>
        <a href="#login" className="hover:text-gray-500">Login</a>

        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          ☰
        </button>
      </div>

      {/* Mobile Menu (Dropdown) */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md flex flex-col items-center py-4 space-y-4">
          <a href="#hero" className="hover:text-gray-500">Home</a>
          <a href="#2" className="hover:text-gray-500">Products</a>
          <a href="#3" className="hover:text-gray-500">Category</a>
          <a href="#cart" className="hover:text-gray-500">Cart</a>
          <a href="#login" className="hover:text-gray-500">Login</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar";
import Hero from "./components/Hero";
import FeaturedProducts from "./components/FeaturedProducts";
import Categories from "./components/Categories";
import Login from "./components/Login";
import MenProducts from "./components/pages/MenProducts";
import WomenProducts from "./components/pages/WomenProducts";
import KidsProducts from "./components/pages/KidsProducts";

import "./App.css";
import "./index.css";
import CartSection from "./components/Cartsection";

function App() {
  return (
    <Router>
      <div className="w-full min-h-screen overflow-x-hidden">
        <NavBar />

        <Routes>
          {/* ✅ Home page */}
          <Route
            path="/"
            element={
              <>
                <Hero />
                <FeaturedProducts />
                <Categories />
                <CartSection />
                <Login />
              </>
            }
          />

          {/* ✅ Category pages */}
          <Route path="/men" element={<MenProducts />} />
          <Route path="/women" element={<WomenProducts />} />
          <Route path="/kids" element={<KidsProducts />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


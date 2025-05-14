import { Link } from "react-router-dom";
const Categories = () => {
  const categories = [
    { name: "Men", image: "/man.JPG" , path:"/men", },
    { name: "Women", image: "/women.jpeg",path:"/women" },
    { name: "Kids", image: "/kid.jpeg",path:"/kids" },
  ];
  const handleCategoryClick = () => {
    window.scrollTo(0, 0);  // Scroll to top
  };

  return (
    <section id="3" className="py-16 bg-gray-100">
      <h2 className="text-3xl font-bold text-center">Shop by Category</h2>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6">
        {categories.map((cat, index) => (
          <Link to={cat.path} key={index} className="relative group block"onClick={handleCategoryClick}>
            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-96 object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
              <p className="text-white text-xl font-semibold">{cat.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Categories;
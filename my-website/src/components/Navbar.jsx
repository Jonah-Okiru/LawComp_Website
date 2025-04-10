import { useState, useEffect } from "react";
import { products } from "../data/products";
import { ShoppingCart, Search, Menu } from "lucide-react";
import { FaTimes } from "react-icons/fa";

export const Navbar = ({
  onSelectProduct,
  categories,
  onCategorySelect,
  onSubcategorySelect,
  selectedCategory,
  selectedSubcategory,
  cartCount,
  onToggleCart
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [categorySubcategories, setCategorySubcategories] = useState({});
  const [activeCategoryDropdown, setActiveCategoryDropdown] = useState(null);

  useEffect(() => {
    const subcategoriesMap = {};
    categories.forEach(category => {
      subcategoriesMap[category] = [
        ...new Set(products
          .filter(p => p.category === category)
          .map(p => p.subcategory)
        )
      ];
    });
    setCategorySubcategories(subcategoriesMap);
  }, [categories]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
        setIsSearchOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.length > 0) {
      const matches = products.filter((p) =>
        p.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(matches);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelectProduct = (product) => {
    onSelectProduct(product);
    setSearchTerm("");
    setSuggestions([]);
    setIsSearchOpen(false);
    setIsMobileMenuOpen(false);
  };

  const handleCategoryClick = (category) => {
    if (selectedCategory === category) {
      // Deselect category if clicked again
      onCategorySelect(null);
      setActiveCategoryDropdown(null);
    } else {
      onCategorySelect(category);
      onSubcategorySelect(null);
      setActiveCategoryDropdown(category);
    }
    setIsMobileMenuOpen(false);
  };

  const handleSubcategoryClick = (subcategory) => {
    onSubcategorySelect(subcategory);
    setIsCategoriesOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-green-600 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img
                src="/images/logo.jpeg"
                alt="LawComp Computers"
                className="h-12 w-auto"
              />
            </div>

            {/* Desktop nav */}
            <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
              <button
                className="px-3 py-2 text-white hover:bg-green-700 rounded-md font-medium"
                onClick={() => {
                  onCategorySelect(null);
                  onSubcategorySelect(null);
                  setActiveCategoryDropdown(null);
                }}
              >
                All Products
              </button>

              {/* Categories */}
              <div className="relative">
                <button
                  onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                  className="px-3 py-2 text-white hover:bg-green-700 rounded-md font-medium flex items-center"
                >
                  Categories
                  <svg
                    className={`ml-2 h-4 w-4 transition-transform ${
                      isCategoriesOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {isCategoriesOpen && (
                  <div className="absolute left-0 mt-2 w-56 bg-white rounded-md shadow-lg z-10">
                    <div className="py-1">
                      {categories.map((category) => (
                        <div key={category} className="relative">
                          <button
                            onClick={() => handleCategoryClick(category)}
                            className={`w-full text-left px-4 py-2 text-sm ${
                              selectedCategory === category && !selectedSubcategory
                                ? 'bg-green-600 text-green-800'
                                : 'text-gray-700 hover:bg-green-400'
                            }`}
                          >
                            {category}
                          </button>

                          {/* Subcategories for selected category */}
                          {activeCategoryDropdown === category &&
                            categorySubcategories[category]?.length > 0 && (
                              <div className="pl-4">
                                {categorySubcategories[category].map((subcategory) => (
                                  <button
                                    key={subcategory}
                                    onClick={() => handleSubcategoryClick(subcategory)}
                                    className={`w-full text-left px-4 py-2 text-sm ${
                                      selectedSubcategory === subcategory
                                        ? 'bg-green-600 text-green-800'
                                        : 'text-gray-700 hover:bg-green-400'
                                    }`}
                                  >
                                    {subcategory}
                                  </button>
                                ))}
                              </div>
                            )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Desktop Search and Cart */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <div className="relative">
              <div className="flex items-center border rounded-md overflow-hidden">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="py-1 px-3 w-64 focus:outline-none"
                />
                <button className="bg-gray-100 px-3 py-1">
                  <Search className="h-5 w-5 text-gray-500" />
                </button>
              </div>

              {suggestions.length > 0 && (
                <ul className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg max-h-96 overflow-y-auto">
                  {suggestions.map((product) => (
                    <li
                      key={product.id}
                      onClick={() => handleSelectProduct(product)}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-10 h-10 object-cover mr-3"
                      />
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-gray-600">{product.price}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <button
              onClick={onToggleCart}
              className="relative p-2 text-white hover:bg-green-700 rounded-full"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile icons */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-white hover:bg-green-700 rounded-full"
            >
              {isSearchOpen ? <FaTimes /> : <Search className="h-6 w-6" />}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-white hover:bg-green-700 rounded-full"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

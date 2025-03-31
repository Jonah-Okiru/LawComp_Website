import { useState, useEffect } from "react";
import { products } from "../data/products";
import { ShoppingCart, Search, Menu } from "lucide-react";
import { FaTimes } from "react-icons/fa";

/**
 * Navigation bar component with search, categories, and cart functionality
 * @param {Object} props - Component props
 * @param {Function} props.onSelectProduct - Handler for product selection
 * @param {Array} props.categories - List of product categories
 * @param {Function} props.onCategorySelect - Handler for category selection
 * @param {Function} props.onSubcategorySelect - Handler for subcategory selection
 * @param {String} props.selectedCategory - Currently selected category
 * @param {String} props.selectedSubcategory - Currently selected subcategory
 * @param {Number} props.cartCount - Number of items in cart
 * @param {Function} props.onToggleCart - Handler for toggling cart view
 */
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
  const [categorySubcategories, setCategorySubcategories] = useState({});

  // Generate subcategories map when component mounts
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

  // Close mobile menu when window is resized to desktop
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

  // Search functionality
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

  return (
    <nav className="bg-green-600 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Mobile Menu Button */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img 
                src="/images/logo.jpeg" 
                alt="LawComp Computers" 
                className="h-12 w-auto"
              />
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
              <div className="relative group">
                <select
                  value={selectedCategory || ""}
                  onChange={(e) => {
                    onCategorySelect(e.target.value);
                    onSubcategorySelect(null); // Reset subcategory when category changes
                  }}
                  className="border border-gray-300 rounded-md px-3 py-1 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[180px]"
                >
                  <option value="">All Categories</option>
                  {categories.map((category, i) => (
                    <option key={i} value={category}>
                      {category}
                    </option>
                  ))}
                </select>

                {/* Subcategory dropdown */}
                {selectedCategory && categorySubcategories[selectedCategory] && (
                  <div className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg">
                    <div className="py-1">
                      <div 
                        className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                        onClick={() => onSubcategorySelect(null)}
                      >
                        All {selectedCategory}
                      </div>
                      {categorySubcategories[selectedCategory].map((subcategory, i) => (
                        <div
                          key={i}
                          onClick={() => onSubcategorySelect(subcategory)}
                          className={`px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer ${
                            selectedSubcategory === subcategory 
                              ? 'bg-blue-50 text-blue-600' 
                              : 'text-gray-700'
                          }`}
                        >
                          {subcategory}
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
            {/* Search Bar */}
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
              
              {/* Search Suggestions */}
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

            {/* Cart Button */}
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

          {/* Mobile Menu Button */}
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

      {/* Mobile Search */}
      {isSearchOpen && (
        <div className="md:hidden bg-green-700 px-4 py-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full py-2 px-3 rounded-md focus:outline-none"
            />
            {suggestions.length > 0 && (
              <ul className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg max-h-96 overflow-y-auto">
                {suggestions.map((product) => (
                  <li
                    key={product.id}
                    onClick={() => handleSelectProduct(product)}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {product.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-green-700 px-4 py-2">
          <div className="space-y-2">
            {/* Category selection */}
            <select
              value={selectedCategory || ""}
              onChange={(e) => {
                onCategorySelect(e.target.value);
                onSubcategorySelect(null);
                setIsMobileMenuOpen(false);
              }}
              className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Categories</option>
              {categories.map((category, i) => (
                <option key={i} value={category}>
                  {category}
                </option>
              ))}
            </select>

            {/* Subcategory selection */}
            {selectedCategory && categorySubcategories[selectedCategory] && (
              <select
                value={selectedSubcategory || ""}
                onChange={(e) => {
                  onSubcategorySelect(e.target.value || null);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All {selectedCategory}</option>
                {categorySubcategories[selectedCategory].map((subcategory, i) => (
                  <option key={i} value={subcategory}>
                    {subcategory}
                  </option>
                ))}
              </select>
            )}

            {/* Cart Button */}
            <button
              onClick={() => {
                onToggleCart();
                setIsMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center p-2 text-white hover:bg-green-800 rounded-md"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Cart ({cartCount})
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
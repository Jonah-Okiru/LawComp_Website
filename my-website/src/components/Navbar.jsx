import { useState } from "react";
import { products } from "../data/products";
import { ShoppingCart } from "lucide-react"; // icon lib like lucide-react

export const Navbar = ({ onSelectProduct, categories, onCategorySelect, cartCount, onToggleCart }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.length > 0) {
      const matches = products.filter((p) =>
        p.name.toLowerCase().startsWith(value.toLowerCase())
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
  };

  return (
    <nav className="bg-green-300 shadow-md p-4 flex justify-between items-center relative">
      <div className="flex items-center space-x-4 relative">
        <img src="/images/logo.jpeg" alt="LawComp Computers" className="h-24 w-auto" />
        <select
          className="border border-gray-400 rounded px-2 py-1 bg-white"
          onChange={(e) => onCategorySelect(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((c, i) => (
            <option key={i} value={c}>
              {c}
            </option>
          ))}
        </select>
        <div className="relative">
          <input
            type="text"
            placeholder="Enter the product name..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="border border-gray-300 px-4 focus:outline-none focus:ring-blue-600"
          />
          {suggestions.length > 0 && (
            <ul className="absolute z-10 bg-white border w-64 mt-1 rounded shadow max-h-60 overflow-y-auto">
              {suggestions.map((product) => (
                <li
                  key={product.id}
                  onClick={() => handleSelectProduct(product)}
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                >
                  {product.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <ul className="flex items-center space-x-4">
        <li className="relative cursor-pointer" onClick={onToggleCart}>
          <ShoppingCart className="w-6 h-6" />
          {cartCount > 0 && (
            <span className="h-12 absolute -top-2 -right-2 bg-red-600 text-white rounded-full px-2 text-xs">
              {cartCount}
            </span>
          )}
        </li>
      </ul>
    </nav>
  );
};

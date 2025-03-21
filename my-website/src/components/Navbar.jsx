import { useState } from "react";
import { products } from "../data/products";
export const Navbar = ({onSelectProduct }) =>{
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const handleSearchChange  = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.length > 0)  {
      const matches = products.filter((p) =>
        p.name.toLocaleLowerCase().startsWith(value.toLocaleLowerCase())
      );
      setSuggestions(matches);
    } else {
      setSuggestions([]);
    }
  };
  const handleSelectProduct = (product) => {
    onSelectProduct(product); // pass to app
    setSearchTerm("");
    setSuggestions([]);

  }
  return (
    <nav className="bg-green-300 shadow-md p-4 flex justify-between items-center relative">
      <div className="flex items-center space-x-4 relative">
        <img src="/images/logo.jpeg" alt="LawComp Computers" className="h-24 w-auto" />
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
      <ul className="flex space-x-4">
        <li className="font-bold hover:text-blue-600 cursor-pointer">Home</li>
        <li className="font-bold hover:text-blue-600 cursor-pointer">Shop</li>
        <li className="font-bold hover:text-blue-600 cursor-pointer">Contact</li>
      </ul>
    </nav>
  )
}
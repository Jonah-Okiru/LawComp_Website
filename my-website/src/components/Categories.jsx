import React, { useState } from "react";
import { products } from "../data/products";

export const Categories = ({ onSelectCategory }) => {
  // Group products by category
  const categoriesMap = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {});

  // Get unique categories with a random product image
  const categoryList = Object.entries(categoriesMap).map(([category, items]) => {
    const randomProduct = items[Math.floor(Math.random() * items.length)];
    return { category, image: randomProduct.image };
  });

  // Pagination logic
  const itemsPerPage = 4;
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(categoryList.length / itemsPerPage);
  const paginatedCategories = categoryList.slice(page * itemsPerPage, (page + 1) * itemsPerPage);

  const handleNext = () => {
    if (page < totalPages - 1) setPage(page + 1);
  };

  const handlePrev = () => {
    if (page > 0) setPage(page - 1);
  };

  return (
    <div className="py-10 px-4 bg-white">
      <h3 className="text-2xl font-bold text-center mb-6">Browse Categories</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
        {paginatedCategories.map(({ category, image }) => (
          <div
            key={category}
            onClick={() => onSelectCategory(category)}
            className="cursor-pointer bg-green-100 rounded shadow hover:shadow-lg transition duration-200"
          >
            <img
              src={image}
              alt={category}
              className="w-full h-32 object-cover rounded-t"
            />
            <div className="p-4 text-center font-semibold text-gray-800">
              {category}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center gap-4">
        <button
          onClick={handlePrev}
          disabled={page === 0}
          className={`px-4 py-2 rounded ${page === 0 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"}`}
        >
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={page === totalPages - 1}
          className={`px-4 py-2 rounded ${page === totalPages - 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"}`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

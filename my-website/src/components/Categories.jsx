import React, { useState } from "react";
import { products } from "../data/products";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export const Categories = ({ onSelectCategory }) => {
  // Group products by category
  const categoriesMap = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {});

  // Create category list with random images
  const categoryList = Object.entries(categoriesMap).map(([category, items]) => {
    const randomProduct = items[Math.floor(Math.random() * items.length)];
    return { category, image: randomProduct.image };
  });

  // Pagination state
  const itemsPerPage = 4;
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(categoryList.length / itemsPerPage);
  const paginatedCategories = categoryList.slice(
    page * itemsPerPage,
    (page + 1) * itemsPerPage
  );

  // Navigation handlers
  const handleNext = () => page < totalPages - 1 && setPage(page + 1);
  const handlePrev = () => page > 0 && setPage(page - 1);

  return (
    <div className="py-12 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <h3 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Browse Our Categories
        </h3>
        
        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {paginatedCategories.map(({ category, image }) => (
            <div
              key={category}
              onClick={() => onSelectCategory(category)}
              className="cursor-pointer bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 group"
            >
              {/* Category Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={image}
                  alt={category}
                  className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition duration-300" />
              </div>
              
              {/* Category Name */}
              <div className="p-4 text-center">
                <h4 className="font-semibold text-lg text-gray-800 group-hover:text-blue-600 transition duration-200">
                  {category}
                </h4>
                <p className="text-sm text-gray-600 mt-1">View products</p>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4">
            <button
              onClick={handlePrev}
              disabled={page === 0}
              className={`p-2 rounded-full ${page === 0 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
            >
              <FaArrowLeft />
            </button>
            
            <span className="text-gray-700">
              Page {page + 1} of {totalPages}
            </span>
            
            <button
              onClick={handleNext}
              disabled={page === totalPages - 1}
              className={`p-2 rounded-full ${page === totalPages - 1 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
            >
              <FaArrowRight />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
import React, { useState, useEffect } from "react";
import { products } from "../data/products";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

/**
 * Categories component displays product categories and subcategories
 * @param {Object} props - Component props
 * @param {Function} props.onSelectCategory - Handler for category selection
 * @param {Function} props.onSelectSubcategory - Handler for subcategory selection
 * @param {String} props.selectedCategory - Currently selected category
 * @param {String} props.selectedSubcategory - Currently selected subcategory
 */
export const Categories = ({ 
  onSelectCategory, 
  onSelectSubcategory,
  selectedCategory,
  selectedSubcategory
}) => {
  // Group products by category and subcategory
  const categoriesMap = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = {
        subcategories: new Set(),
        products: []
      };
    }
    acc[product.category].subcategories.add(product.subcategory);
    acc[product.category].products.push(product);
    return acc;
  }, {});

  // Create category list with random images
  const categoryList = Object.entries(categoriesMap).map(([category, data]) => {
    const randomProduct = data.products[Math.floor(Math.random() * data.products.length)];
    return { 
      category, 
      image: randomProduct.image,
      subcategories: Array.from(data.subcategories)
    };
  });

  // State for hovered category
  const [hoveredCategory, setHoveredCategory] = useState(null);
  // State to keep subcategories open when a category is selected
  const [activeCategory, setActiveCategory] = useState(null);

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

  /**
   * Handle category click
   * @param {String} category - Clicked category
   */
  const handleCategoryClick = (category) => {
    if (activeCategory === category) {
      setActiveCategory(null);
      onSelectCategory(null);
    } else {
      setActiveCategory(category);
      onSelectCategory(category);
    }
    onSelectSubcategory(null);
  };

  /**
   * Handle subcategory click
   * @param {String} subcategory - Clicked subcategory
   */
  const handleSubcategoryClick = (subcategory) => {
    onSelectSubcategory(subcategory);
    setHoveredCategory(null);
  };

  return (
    <div className="py-12 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <h3 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Browse Our Categories
        </h3>
        
        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {paginatedCategories.map(({ category, image, subcategories }) => (
            <div
              key={category}
              className="relative"
              onMouseEnter={() => setHoveredCategory(category)}
              onMouseLeave={() => {
                if (activeCategory !== category) {
                  setHoveredCategory(null);
                }
              }}
            >
              {/* Category Card */}
              <div
                onClick={() => handleCategoryClick(category)}
                className={`cursor-pointer bg-white rounded-lg shadow-md overflow-hidden transition duration-300 group ${
                  selectedCategory === category 
                    ? 'ring-2 ring-blue-500' 
                    : 'hover:shadow-lg'
                }`}
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
                  <p className="text-sm text-gray-600 mt-1">
                    {selectedCategory === category 
                      ? selectedSubcategory 
                        ? `Viewing: ${selectedSubcategory}`
                        : `Viewing all ${category}`
                      : 'View products'}
                  </p>
                </div>
              </div>

              {/* Subcategories Dropdown */}
              {(hoveredCategory === category || activeCategory === category) && (
                <div className="absolute z-10 mt-2 w-full bg-white rounded-md shadow-lg">
                  <div className="py-1">
                    {/* Option to view all products in category */}
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSubcategoryClick(null);
                      }}
                      className={`block px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer ${
                        !selectedSubcategory && selectedCategory === category
                          ? 'bg-blue-50 text-blue-600'
                          : 'text-gray-700'
                      }`}
                    >
                      All {category}
                    </div>
                    
                    {/* List of subcategories */}
                    {subcategories.map(subcategory => (
                      <div
                        key={subcategory}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSubcategoryClick(subcategory);
                        }}
                        className={`block px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer ${
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
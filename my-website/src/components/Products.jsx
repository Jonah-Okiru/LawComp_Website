import { useState } from "react";
import { products } from "../data/products";
import { FaShoppingCart, FaArrowLeft, FaArrowRight } from "react-icons/fa";

export const Products = ({ 
  selectedCategory, 
  selectedSubcategory, 
  onSelectProduct, 
  onAddToCart 
}) => {
  // State for showing success message when product is added to cart
  const [addedProducts, setAddedProducts] = useState(new Set());
  // Pagination state
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 4;

  // Filter products based on selected category/subcategory or show random featured products
  const getFilteredProducts = () => {
    if (selectedCategory && selectedSubcategory) {
      return products.filter(
        (p) => p.category === selectedCategory && 
               p.subcategory === selectedSubcategory
      );
    }
    if (selectedCategory) {
      return products.filter((p) => p.category === selectedCategory);
    }
    return [...products]; // Return all products for pagination
  };

  const filteredProducts = getFilteredProducts();
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const paginatedProducts = filteredProducts.slice(
    currentPage * productsPerPage,
    (currentPage + 1) * productsPerPage
  );

  // Handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Handle adding product to cart with success feedback
  const handleAddToCart = (product) => {
    onAddToCart(product);
    setAddedProducts((prev) => new Set(prev).add(product.id));
    setTimeout(() => {
      setAddedProducts((prev) => {
        const newSet = new Set(prev);
        newSet.delete(product.id);
        return newSet;
      });
    }, 3000);
  };

  // Generate header text based on selection
  const getHeaderText = () => {
    if (selectedCategory && selectedSubcategory) {
      return `${selectedSubcategory} ${selectedCategory}`;
    }
    if (selectedCategory) {
      return `${selectedCategory} Products`;
    }
    return "Featured Products";
  };

  return (
    <div className="py-10 px-4 bg-gray-50">
      {/* Section Header */}
      <div className="max-w-6xl mx-auto">
        <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">
          {getHeaderText()}
        </h3>
        
        {/* Show message if no products found */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-600">No products found in this category.</p>
          </div>
        ) : (
          <>
            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {paginatedProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 cursor-pointer"
                  onClick={() => onSelectProduct(product)}
                >
                  {/* Product Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition duration-500 hover:scale-105"
                    />
                  </div>
                  
                  {/* Product Info */}
                  <div className="p-4">
                    <h4 className="font-semibold text-lg text-gray-800 mb-1 line-clamp-1">
                      {product.name}
                    </h4>
                    <p className="text-blue-600 font-medium mb-3">{product.price}</p>
                    <p className="text-sm text-gray-500 mb-2">
                      {product.category} • {product.subcategory}
                    </p>
                    
                    {/* Add to Cart Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(product);
                      }}
                      className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition duration-200"
                    >
                      <FaShoppingCart />
                      <span>Add to Cart</span>
                    </button>
                    
                    {/* Success Message */}
                    {addedProducts.has(product.id) && (
                      <div className="mt-2 text-center text-green-600 animate-bounce">
                        ✅ Added to cart!
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-8">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 0}
                  className={`p-2 rounded-full ${currentPage === 0 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                >
                  <FaArrowLeft />
                </button>
                
                <span className="text-gray-700">
                  Page {currentPage + 1} of {totalPages}
                </span>
                
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages - 1}
                  className={`p-2 rounded-full ${currentPage === totalPages - 1 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                >
                  <FaArrowRight />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
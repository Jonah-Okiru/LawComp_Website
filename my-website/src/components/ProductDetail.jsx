import { FaArrowLeft, FaShoppingCart } from "react-icons/fa";
import { useState } from "react";

/**
 * ProductDetail component displays detailed information about a selected product
 * @param {Object} product - The product to display details for
 * @param {Function} onClose - Function to close the detail view
 * @param {Function} onAddToCart - Function to add product to cart
 */
export const ProductDetail = ({ product, onClose, onAddToCart }) => {
  const [showAddedMessage, setShowAddedMessage] = useState(false);
  if (!product) return null;
  const handleAddToCart = () => {
    onAddToCart(product);
    setShowAddedMessage(true);
    // Hide the message after 3 seconds
    setTimeout(() => {
      setShowAddedMessage(false)
    }, 3000);
  }

  return (
    <div className="px-4 py-10 bg-gray-50 min-h-screen">
      {/* Product Detail Container */}
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => onClose(product.category)}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6 transition duration-200"
        >
          <FaArrowLeft className="mr-2" />
          Back to {product.category || "Products"}
        </button>

        {/* Product Content - Grid Layout */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-96 object-contain object-center"
            />
          </div>

          {/* Product Info */}
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h2>
            
            {/* Price */}
            <div className="flex items-center mb-6">
              <span className="text-2xl font-bold text-blue-600">{product.price}</span>
              {product.originalPrice && (
                <span className="ml-2 text-lg text-gray-500 line-through">
                  {product.originalPrice}
                </span>
              )}
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Features (if available) */}
            {product.features && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Key Features</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleAddToCart}
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition duration-200"
              >
                <FaShoppingCart />
                <span>Add to Cart</span>
              </button>
        
              {/* Added to cart message */}
              {showAddedMessage && (
                <div
                  className="mt-4 bg-gray-100 border border-green-400 text-green-700 px-4 py-2 rounded text-sm"
                >
                  {product.name} has been added to your cart!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
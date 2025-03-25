import { useState } from "react";
import { products } from "../data/products";

export const Products = ({ selectedCategory, onSelectProduct, onAddToCart }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [addedProducts, setAddedProducts] = useState(new Set()); // Track added products

  const getFilteredProducts = () => {
    if (selectedCategory) {
      return products.filter((p) => p.category === selectedCategory);
    }
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 4);
  };

  const filteredProducts = getFilteredProducts();

  const handleAddToCart = (product) => {
    onAddToCart(product);
    setAddedProducts((prev) => new Set(prev).add(product.id));
    setTimeout(() => {
      setAddedProducts((prev) => {
        const newSet = new Set(prev);
        newSet.delete(product.id); //Remove message after 3 seconds
        return newSet;
      });
    }, 3000);
    
    
  };

  return (
    <div className="py-10 px-4">
      <h3 className="text-2xl font-bold text-center mb-6">
        {selectedCategory ? `${selectedCategory} Products` : "Featured Products"}
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="p-4 bg-white shadow rounded text-center hover:shadow-lg cursor-pointer"
            onClick={() => onSelectProduct(product)}
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-32 object-cover mb-2 rounded"
            />
            <h4 className="font-semibold">{product.name}</h4>
            <p className="text-gray-700">{product.price}</p>
            <button
              onClick={(e) => {
                e.stopPropagation(); // prevent triggering onSelectProduct
                handleAddToCart(product);
              }}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add to Cart
            </button>
            {/* Success Message Below Add to Cart Button */}
            {addedProducts.has(product.id) && (
              <p className="text-green-600 mt-2">✅ Product added to cart!</p>
            )}
          </div>
        ))}
      </div>

      {/* Cart Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-80 text-center">
            <h4 className="text-xl font-bold mb-2">Added to Cart</h4>
            <p className="mb-4">{addedProduct?.name}</p>
            <div className="flex justify-center gap-4">
              <button
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                onClick={() => setShowPopup(false)}
              >
                Continue Shopping
              </button>
              <button
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                onClick={() => window.location.href = "/Cart"} // update with your cart route
              >
                Go to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Cart = ({ cartItems, onUpdateQuantity, onRemoveItem }) => {
  // State to manage cart items
  const [cartItems, setCartItems] = useState([]);

  // Load cart from local storage on component mount
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  // Save cart to local storage whenever cartItems change
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Calculate total price of all items in cart
  const total = cartItems.reduce(
    (sum, item) => sum + item.priceNum * item.quantity,
    0
  );

  return (
    <div className="p-6 max-w-4xl mx-auto min-h-screen">
      {/* Cart Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Your Shopping Cart</h2>
        <span className="text-gray-600">{cartItems.length} items</span>
      </div>

      {cartItems.length === 0 ? (
        // Empty Cart State
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">Your cart is empty.</p>
          <Link
            to="/"
            className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        // Cart Items List
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-white p-4 shadow rounded-lg hover:shadow-md transition duration-200"
            >
              {/* Product Image and Info */}
              <div className="flex items-center space-x-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                />
                <div>
                  <h4 className="font-semibold text-gray-800">{item.name}</h4>
                  <p className="text-blue-600 font-medium">Ksh {item.priceNum.toFixed(2)}</p>
                  
                  {/* Quantity Controls */}
                  <div className="flex items-center mt-2 space-x-2">
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      className={`px-3 py-1 rounded-md ${item.quantity <= 1 ? 'bg-gray-200 text-gray-400' : 'bg-gray-200 hover:bg-gray-300'}`}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-md"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => onRemoveItem(item.id)}
                className="text-red-500 hover:text-red-700 transition duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          ))}

          {/* Cart Summary */}
          <div className="mt-8 bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-xl font-bold text-gray-800">Order Summary</h4>
              <span className="text-gray-600">{cartItems.reduce((sum, item) => sum + item.quantity, 0)} items</span>
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">Ksh {total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">Free</span>
              </div>
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-blue-600">Ksh {total.toFixed(2)}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row justify-end gap-4">
              <Link
                to="/"
                className="px-6 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-800 transition duration-200 text-center"
              >
                Continue Shopping
              </Link>
              <Link
                to="/checkout"
                className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition duration-200 text-center"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
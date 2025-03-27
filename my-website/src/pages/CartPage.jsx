import React from "react";
import { FaArrowLeft, FaTrash } from "react-icons/fa";

export const CartPage = ({ cart, onUpdateQuantity, onRemoveItem, onCheckout, onReturnToShop }) => {
  // Calculate total price by summing up all items (quantity * price)
  const total = cart.reduce((sum, item) => sum + item.quantity * parseFloat(item.price.replace(/[^\d.]/g, "")), 0);

  return (
    <div className="p-6 max-w-4xl mx-auto min-h-screen">
      {/* Page Header with Back Button */}
      <div className="flex items-center mb-6">
        <button
          onClick={onReturnToShop}
          className="flex items-center text-blue-600 hover:text-blue-800 mr-4"
        >
          <FaArrowLeft className="mr-2" />
          Back to Shop
        </button>
        <h2 className="text-2xl font-bold text-gray-800">Your Shopping Cart</h2>
      </div>

      {cart.length === 0 ? (
        // Empty Cart State
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-600 mb-6">Your cart is currently empty.</p>
          <button
            onClick={onReturnToShop}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        // Cart with Items
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {/* Cart Items List */}
          <div className="divide-y divide-gray-200">
            {cart.map((item) => (
              <div key={item.id} className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                {/* Product Info */}
                <div className="flex items-start space-x-4 mb-4 sm:mb-0">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded border border-gray-200" 
                  />
                  <div>
                    <h3 className="font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-blue-600">{item.price}</p>
                  </div>
                </div>
                
                {/* Quantity Controls */}
                <div className="flex items-center space-x-4 w-full sm:w-auto justify-between sm:justify-start">
                  <div className="flex items-center border rounded">
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className={`px-3 py-1 ${item.quantity <= 1 ? 'text-gray-400' : 'hover:bg-gray-100'}`}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value))}
                      className="w-12 text-center border-x py-1"
                    />
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-1 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                  
                  {/* Remove Button */}
                  <button 
                    onClick={() => onRemoveItem(item.id)}
                    className="text-red-500 hover:text-red-700 p-2"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Cart Summary */}
          <div className="p-6 bg-gray-50 border-t">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">Ksh {total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-600">Shipping</span>
              <span className="font-medium">Free</span>
            </div>
            <div className="flex justify-between items-center text-lg font-bold mb-6">
              <span>Total</span>
              <span className="text-blue-600">Ksh {total.toFixed(2)}</span>
            </div>
            
            {/* Checkout Button */}
            <button
              onClick={onCheckout}
              className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition duration-200 flex items-center justify-center"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
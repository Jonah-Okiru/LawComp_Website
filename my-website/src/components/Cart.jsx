import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";

export const Cart = ({ cartItems, onUpdateQuantity, onRemoveItem }) => {
  // Use effect to load from local storage
  const [cartItems, setCartItems] = useState("")
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart))
    }
  }, []);
  // Useeffect to save to local storage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);
  const total = cartItems.reduce(
    (sum, item) => sum + item.priceNum * item.quantity,
    0
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-white p-4 shadow rounded"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <h4 className="font-semibold">{item.name}</h4>
                  <p className="text-blue-600">Ksh {item.priceNum}</p>
                  <div className="flex items-center mt-2 space-x-2">
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      className="px-2 bg-gray-200 rounded"
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      className="px-2 bg-gray-200 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <button
                onClick={() => onRemoveItem(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="mt-6 text-right">
            <h4 className="text-xl font-bold">Total: Ksh {total.toFixed(2)}</h4>
            <div className="mt-4 flex justify-end gap-4">
              <Link
                to="/"
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Continue Shopping
              </Link>
              <Link
                to="/checkout"
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
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

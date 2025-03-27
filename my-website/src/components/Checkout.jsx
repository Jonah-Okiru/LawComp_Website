import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  // Fetch cart from localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Order Submitted:", { ...formData, cartItems });
    setSubmitted(true);
    // Clear cart after submission
    localStorage.removeItem("cart");
  };

  const handleReturnToShop = () => {
    navigate("/");
  };

  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.quantity * parseFloat(item.price.replace(/[^\d.]/g, "")),
    0
  );

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 grid md:grid-cols-2 gap-8">
      {/* Checkout Form */}
      <div>
        <h2 className="text-3xl font-bold mb-6">Checkout</h2>

        {submitted ? (
          <div className="bg-green-100 text-green-800 p-4 rounded">
            <p>
              Thanks for your order, <strong>{formData.fullName}</strong>!
            </p>
            <p>
              We'll contact you at {formData.email} or {formData.phone}.
            </p>
            <button
              onClick={handleReturnToShop}
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Return to Shop
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* ... rest of the form remains the same ... */}
          </form>
        )}
      </div>

      {/* Cart Summary */}
      <div>
        <h3 className="text-2xl font-semibold mb-4">Your Cart</h3>
        {cartItems.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="border p-3 rounded shadow-sm flex justify-between"
              >
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-600">
                    Quantity: {item.quantity}
                  </p>
                </div>
                <div className="text-right">
                  <p>Ksh{(item.quantity * parseFloat(item.price.replace(/[^\d.]/g, ""))).toFixed(2)}</p>
                  <p className="text-sm text-gray-500">
                    Ksh{parseFloat(item.price.replace(/[^\d.]/g, "")).toFixed(2)} each
                  </p>
                </div>
              </div>
            ))}

            <div className="border-t pt-4 text-lg font-bold text-right">
              Total: Ksh{cartTotal.toFixed(2)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
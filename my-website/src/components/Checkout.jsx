import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaWhatsapp, FaEnvelope, FaHome, FaShoppingCart } from "react-icons/fa";

const Checkout = () => {
  // Form state management
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

  // Load cart from localStorage on component mount
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Calculate cart total
  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.quantity * parseFloat(item.price.replace(/[^\d.]/g, "")),
    0
  );

  // Format order message for WhatsApp/Email
  const formatOrderMessage = () => {
    let message = `🛒 *New Order from ${formData.fullName}* 🛒\n\n`;
    message += `📞 *Contact:* ${formData.phone}\n`;
    message += `📧 *Email:* ${formData.email}\n`;
    message += `🏠 *Delivery Address:* ${formData.address}\n`;
    message += `📝 *Notes:* ${formData.notes || "None"}\n\n`;
    message += "📦 *Order Items:*\n";
    
    cartItems.forEach((item, index) => {
      message += `${index + 1}. ${item.name}\n`;
      message += `   - Quantity: ${item.quantity}\n`;
      message += `   - Price: ${item.price} = Ksh${(item.quantity * parseFloat(item.price.replace(/[^\d.]/g, ""))).toFixed(2)}\n\n`;
    });
    
    message += `💰 *Total: Ksh${cartTotal.toFixed(2)}*`;
    
    return encodeURIComponent(message);
  };

  // Handle WhatsApp order
  const handleWhatsAppOrder = () => {
    const phoneNumber = "+254719639512";
    const message = formatOrderMessage();
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
    setSubmitted(true);
    localStorage.removeItem("cart");
  };

  // Handle Email order
  const handleEmailOrder = () => {
    const email = "okirujonah@gmail.com";
    const subject = encodeURIComponent(`New Order from ${formData.fullName}`);
    const body = formatOrderMessage();
    window.open(`mailto:${email}?subject=${subject}&body=${body}`);
    setSubmitted(true);
    localStorage.removeItem("cart");
  };

  // Handle return to shop
  const handleReturnToShop = () => {
    navigate("/");
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 min-h-screen">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Checkout</h1>
        <button
          onClick={handleReturnToShop}
          className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg transition duration-200"
        >
          <FaHome />
          <span>Return Home</span>
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Checkout Form */}
        <div className="bg-white p-6 rounded-lg shadow">
          {submitted ? (
            // Order Confirmation
            <div className="text-center py-8">
              <div className="bg-green-100 text-green-800 p-6 rounded-lg mb-6">
                <h2 className="text-2xl font-bold mb-2">Order Confirmed!</h2>
                <p className="mb-4">
                  Thank you for your order, <strong>{formData.fullName}</strong>!
                </p>
                <p>
                  We'll contact you shortly at {formData.email} or {formData.phone}.
                </p>
              </div>
              <button
                onClick={handleReturnToShop}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            // Checkout Form
            <form className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Customer Information</h2>
              
              {/* Full Name */}
              <div>
                <label className="block text-gray-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="John Doe"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="your@email.com"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-gray-700 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0712345678"
                />
              </div>

              {/* Shipping Address */}
              <div>
                <label className="block text-gray-700 mb-1">Shipping Address *</label>
                <textarea
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                  placeholder="Enter your complete delivery address"
                />
              </div>

              {/* Additional Notes */}
              <div>
                <label className="block text-gray-700 mb-1">Additional Notes</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={2}
                  placeholder="Special delivery instructions or notes"
                />
              </div>

              {/* Order Buttons */}
              <div className="pt-4 space-y-3">
                <button
                  type="button"
                  onClick={handleWhatsAppOrder}
                  className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg transition duration-200"
                  disabled={!formData.fullName || !formData.email || !formData.phone || !formData.address}
                >
                  <FaWhatsapp size={20} />
                  <span>Complete Order via WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={handleEmailOrder}
                  className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg transition duration-200"
                  disabled={!formData.fullName || !formData.email || !formData.phone || !formData.address}
                >
                  <FaEnvelope size={20} />
                  <span>Complete Order via Email</span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-lg shadow h-fit sticky top-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FaShoppingCart />
            <span>Order Summary</span>
          </h2>
          
          {cartItems.length === 0 ? (
            <p className="text-gray-500 py-4">Your cart is empty</p>
          ) : (
            <>
              <div className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <div key={item.id} className="py-4 flex justify-between">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">
                        {item.quantity} × {item.price}
                      </p>
                    </div>
                    <p className="font-medium">
                      Ksh{(item.quantity * parseFloat(item.price.replace(/[^\d.]/g, ""))).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">Ksh{cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">Free</span>
                </div>
                <div className="flex justify-between py-2 text-lg font-bold">
                  <span>Total</span>
                  <span className="text-blue-600">Ksh{cartTotal.toFixed(2)}</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaWhatsapp, FaEnvelope } from "react-icons/fa";

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
  const [orderMethod, setOrderMethod] = useState(""); // 'whatsapp' or 'email'
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
    localStorage.removeItem("cart");
  };

  const handleReturnToShop = () => {
    navigate("/");
  };

  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.quantity * parseFloat(item.price.replace(/[^\d.]/g, "")),
    0
  );

  const formatOrderMessage = () => {
    let message = `New Order from ${formData.fullName}\n\n`;
    message += `Contact: ${formData.phone}\n`;
    message += `Email: ${formData.email}\n`;
    message += `Delivery Address: ${formData.address}\n`;
    message += `Notes: ${formData.notes || "None"}\n\n`;
    message += "Order Items:\n";
    
    cartItems.forEach((item) => {
      message += `- ${item.name} (${item.quantity} x ${item.price}) = Ksh${(item.quantity * parseFloat(item.price.replace(/[^\d.]/g, ""))).toFixed(2)}\n`;
    });
    
    message += `\nTotal: Ksh${cartTotal.toFixed(2)}`;
    
    return encodeURIComponent(message);
  };

  const handleWhatsAppOrder = () => {
    setOrderMethod("whatsapp");
    const phoneNumber = "+254719639512"; // Replace with your business WhatsApp number
    const message = formatOrderMessage();
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  const handleEmailOrder = () => {
    setOrderMethod("email");
    const email = "okirujonah@gmail.com"; // Replace with your business email
    const subject = encodeURIComponent(`New Order from ${formData.fullName}`);
    const body = formatOrderMessage();
    window.open(`mailto:${email}?subject=${subject}&body=${body}`);
  };

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
            <div>
              <label className="block font-medium">Full Name</label>
              <input
                type="text"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded"
              />
            </div>

            <div>
              <label className="block font-medium">Email</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded"
              />
            </div>

            <div>
              <label className="block font-medium">Phone</label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded"
              />
            </div>

            <div>
              <label className="block font-medium">Shipping Address</label>
              <textarea
                name="address"
                required
                value={formData.address}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded"
                rows={3}
              />
            </div>

            <div>
              <label className="block font-medium">Additional Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded"
                rows={2}
                placeholder="e.g. delivery instructions"
              />
            </div>

            <div className="flex flex-col space-y-4">
              <button
                type="button"
                onClick={handleWhatsAppOrder}
                className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 flex items-center justify-center"
              >
                <FaWhatsapp size={20} />
                <span>Order via WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={handleEmailOrder}
                className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 flex items-center justify-center"
              >
                <FaEnvelope size={20} />
                <span>Order via Email</span>
              </button>
            </div>
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
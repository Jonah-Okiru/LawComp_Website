import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Categories } from "./components/Categories";
import { Products } from "./components/Products";
import { ProductDetail } from "./components/ProductDetail";
import { CartPage } from "./pages/CartPage";
import Checkout from "./components/Checkout";
import { products } from "./data/products";
import { Footer } from "./components/Footer";

const AppContent = () => {
  // State management for the application
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  // Load cart from localStorage on initial render
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    if (storedCart) {
      setCart(storedCart);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Handle category selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedProduct(null);
    navigate("/");
  };

  // Handle product selection
  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    navigate(`/product/${product.id}`);
  };

  // Add product to cart
  const handleAddToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // Update product quantity in cart
  const handleUpdateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  // Remove product from cart
  const handleRemoveItem = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  // Navigate to checkout
  const handleCheckout = () => {
    navigate("/checkout");
  };

  // Close product detail view
  const handleCloseProductDetail = () => {
    setSelectedProduct(null);
    navigate("/");
  };

  // Get unique categories
  const categories = [...new Set(products.map(p => p.category))];
  // Calculate total items in cart
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation Bar */}
      <Navbar
        onSelectProduct={handleSelectProduct}
        categories={categories}
        onCategorySelect={handleCategorySelect}
        cartCount={cartCount}
        onToggleCart={() => navigate("/cart")}
      />

      {/* Main Content */}
      <main className="flex-grow">
        <Routes>
          {/* Home Page */}
          <Route
            path="/"
            element={
              <>
                <Hero onShopNow={() => document.getElementById('products').scrollIntoView({ behavior: 'smooth' })} />
                <Categories onSelectCategory={handleCategorySelect} />
                <div id="products">
                  <Products
                    selectedCategory={selectedCategory}
                    onSelectProduct={handleSelectProduct}
                    onAddToCart={handleAddToCart}
                  />
                </div>
              </>
            }
          />

          {/* Product Detail Page */}
          <Route
            path="/product/:id"
            element={
              selectedProduct && (
                <ProductDetail
                  product={selectedProduct}
                  onClose={handleCloseProductDetail}
                  onAddToCart={handleAddToCart}
                />
              )
            }
          />

          {/* Cart Page */}
          <Route
            path="/cart"
            element={
              <CartPage
                cart={cart}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
                onCheckout={handleCheckout}
                onReturnToShop={() => navigate("/")}
              />
            }
          />

          {/* Checkout Page */}
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

// Main App Component with Router
const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
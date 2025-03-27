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
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [viewCart, setViewCart] = useState(false);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  // Load cart from local storage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    if (storedCart) {
      setCart(storedCart);
    }
  }, []);

  // Save cart to local storage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedProduct(null);
    setViewCart(false);
  };

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setViewCart(false);
  };

  const handleAddToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const handleUpdateQuantity = (id, quantity) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(quantity, 1) } : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  const handleCloseProductDetail = (category) => {
    setSelectedProduct(null);
    setSelectedCategory(category);
  };

  const handleReturnToShop = () => {
    setViewCart(false);
    setSelectedCategory(null);
    setSelectedProduct(null);
    navigate("/");
  };

  const categories = [...new Set(products.map((p) => p.category))];
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div>
      <Navbar
        onSelectProduct={handleSelectProduct}
        categories={categories}
        onCategorySelect={handleCategorySelect}
        cartCount={cartCount}
        onToggleCart={() => {
          setViewCart(!viewCart);
          navigate("/cart");
        }}
      />

      <Routes>
        <Route
          path="/"
          element={
            <>
              {!viewCart && !selectedProduct && (
                <>
                  <Hero onShopNow={() => window.scrollTo({ top: 600, behavior: "smooth" })} />
                  <Categories onSelectCategory={handleCategorySelect} />
                  <Products
                    selectedCategory={selectedCategory}
                    onSelectProduct={handleSelectProduct}
                    onAddToCart={handleAddToCart}
                  />
                </>
              )}
              {selectedProduct && (
                <ProductDetail
                  product={selectedProduct}
                  onClose={handleCloseProductDetail}
                  onAddToCart={handleAddToCart}
                />
              )}
            </>
          }
        />
        <Route
          path="/cart"
          element={
            <CartPage
              cart={cart}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
              onCheckout={handleCheckout}
              onReturnToShop={handleReturnToShop}
            />
          }
        />
        <Route
          path="/checkout"
          element={<Checkout />}
        />
      </Routes>
      
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
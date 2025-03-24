import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Categories } from "./components/Categories";
import { Products } from "./components/Products";
import { ProductDetail } from "./components/ProductDetail";
import { CartPage } from "./pages/CartPage";
import { products } from "./data/products";

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [viewCart, setViewCart] = useState(false);
  const [cart, setCart] = useState([]);

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
    alert("Checkout complete!");
    setCart([]);
    localStorage.removeItem("cart");
    setViewCart(false);
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
        onToggleCart={() => setViewCart(!viewCart)}
      />

      {!viewCart && !selectedProduct && <Hero onShopNow={() => window.scrollTo({ top: 600, behavior: "smooth" })} />}
      {!viewCart && !selectedProduct && <Categories onSelectCategory={handleCategorySelect} />}
      {!viewCart && !selectedProduct && (
        <Products
          selectedCategory={selectedCategory}
          onSelectProduct={handleSelectProduct}
          onAddToCart={handleAddToCart}
        />
      )}

      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onBack={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      {viewCart && (
        <CartPage
          cart={cart}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onCheckout={handleCheckout}
        />
      )}
    </div>
  );
};

export default App;

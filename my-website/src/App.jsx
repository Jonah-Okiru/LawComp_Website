import React, { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Categories } from "./components/Categories";
import { Products } from "./components/Products";
import { ProductDetail } from "./components/ProductDetail";
import { Footer } from "./components/Footer";
import './App.css';

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div className="font-sans bg-gray-100">
      <Navbar onSelectProduct={setSelectedProduct} />
      <Hero />
      {selectedProduct ? (
        <ProductDetail product={selectedProduct} />
      ) : (
        <>
          <Categories />
          <Products />
        </>
      )}
      <Footer />
    </div>
  );
}

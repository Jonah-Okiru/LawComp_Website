import React from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Categories } from "./components/Categories";
import { Products } from "./components/Products";
import { Footer } from "./components/Footer";
import './App.css'
export default function App() {
  return (
    <div className="font-sans bg-gray-100">
      <Navbar />
      <Hero />
      <Categories />
      <Products />
      <Footer />
    </div>
  );
}

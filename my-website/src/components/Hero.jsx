import React, { useState, useEffect } from "react";
import { FaChevronRight } from "react-icons/fa";

/**
 * Hero component displays a rotating banner of images with a call-to-action
 * @param {Function} onShopNow - Callback when Shop Now button is clicked
 */
export const Hero = ({ onShopNow }) => {
  const images = [
    "/images/tech1.jpeg",
    "/images/tech2.jpeg",
    "/images/tech3.jpeg",
    "/images/tech4.jpeg",
    "/images/tech5.jpeg",
  ];

  const [currentImage, setCurrentImage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Auto-rotate images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentImage((prev) => (prev + 1) % images.length);
        setIsTransitioning(false);
      }, 500); // Match this with the CSS transition duration
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative h-[80vh] min-h-[500px] w-full overflow-hidden">
      {/* Background Images with Fade Transition */}
      {images.map((image, index) => (
        <div
          key={image}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 ${index === currentImage ? 'opacity-100' : 'opacity-0'}`}
          style={{ backgroundImage: `url(${image})` }}
        />
      ))}

      {/* Overlay Content */}
      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
        <div className="text-center px-4 max-w-4xl">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fadeIn">
            Best Tech Deals in Kenya
          </h2>
          <p className="text-xl md:text-2xl text-white mb-8 max-w-2xl mx-auto">
            Explore the latest laptops, accessories, and more at unbeatable prices
          </p>
          <button
            onClick={onShopNow}
            className="bg-white text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-full text-lg font-semibold flex items-center justify-center mx-auto transition-all duration-300 transform hover:scale-105"
          >
            Shop Now <FaChevronRight className="ml-2" />
          </button>
        </div>
      </div>

      {/* Image Indicators */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`w-3 h-3 rounded-full ${index === currentImage ? 'bg-white' : 'bg-gray-400'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
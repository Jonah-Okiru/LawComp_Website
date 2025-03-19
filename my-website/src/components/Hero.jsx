// Hero Section
import React, {useState, useEffect} from "react";
const image = [
    "/images/tech1.jpeg",
    "/images/tech2.jpeg",
    "/images/tech3.jpeg",
    "/images/tech4.jpeg",
    "/images/tech5.jpeg",

];
export const Hero = () => {
    const [currentImage, setCurrentImage] = useState(0);
    useEffect(() =>{
        const interval = setInterval(() =>{
            setCurrentImage((prev) => (prev+1) % image.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);
    return (
      <div
        className="relative h-[500px] text-white text-center flex flex-col items-center justify-center"
        style={{
            backgroundImage: `url(${image[currentImage]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transition: "background-image 1s ease-in-out",
          }}
      >
        <div className="bg-black bg-opacity-50 p-6 rounded-xl"> 
            <h2 className="text-4xl font-bold">Best Tech Deals in Kenya</h2>
            <p className="mt-4">Explore the latest laptops, accessories, and more.</p>
            <button className="mt-6 bg-white text-blue-600 px-4 py-2 rounded">Shop Now</button>
      </div>
      </div>
    );
  };
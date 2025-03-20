// Categories Section
import { products } from "../data/products";
export const Categories = () => {
  const categories = ["Laptops", "Desktops", "Accessories", "Networking"];
  const getRandomProductImage = (category) => {
    const filteredProducts = products.filter(product => product.category === category);
    if (filteredProducts.length > 0) {
      const randomProduct = filteredProducts[Math.floor(Math.random() * filteredProducts.length)];
      return randomProduct.image;
    }
    return "images/tech1.jpeg" // fall back image
  };
  return (
    <div className="py-10 px-4">
      <h3 className="text-2xl font-bold text-center mb-6">Shop by Categories</h3>
      <div className="cursor-pointer grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map(category =>(
          <div key={category} className="p-4 bg-white shadow rounded text-center">
            <img 
              src={getRandomProductImage(category)} 
              alt={category} 
              className="w-full h-32 object-cover mb-2 rounded"
            />
            <div>{category}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
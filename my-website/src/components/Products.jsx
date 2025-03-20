// Products Section
import { products } from "../data/products";
export const Products = () => {
    const getRandomProducts = (count) => {
      const shuffled = [...products].sort(()=> 0.5 - Math.random());
      return shuffled.slice(0, count);
    };
    const featuredProducts = getRandomProducts(4);
    return (
      <div className="py-10 px-4">
        <h3 className="text-2xl font-bold text-center mb-6">Featured Products</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {featuredProducts.map(product => (
            <div key={product.id} className="p-4 bg-white shadow rounded text-center">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-32 object-cover mb-2 rounded"
              />
              <h4 className="font-semibold">{product.name}</h4>
              <p className="text-gray-700">{product.price}</p>
              <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">Add to Cart</button>
            </div>
          ))}
        </div>
      </div>
    )
  };
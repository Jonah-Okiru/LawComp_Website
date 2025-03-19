// Products Section
export const Products = () => {
    return (
      <div className="py-10 px-4">
        <h3 className="text-2xl font-bold text-center mb-6">Featured Products</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-white shadow rounded text-center">Laptop 1</div>
          <div className="p-4 bg-white shadow rounded text-center">Laptop 2</div>
          <div className="p-4 bg-white shadow rounded text-center">Mouse</div>
          <div className="p-4 bg-white shadow rounded text-center">Keyboard</div>
        </div>
      </div>
    );
  };
// Categories Section
export const Categories = () => {
    return (
      <div className="py-10 px-4">
        <h3 className="text-2xl font-bold text-center mb-6">Shop by Categories</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-white shadow rounded text-center">Laptops</div>
          <div className="p-4 bg-white shadow rounded text-center">Desktops</div>
          <div className="p-4 bg-white shadow rounded text-center">Accessories</div>
          <div className="p-4 bg-white shadow rounded text-center">Networking</div>
        </div>
      </div>
    );
  };
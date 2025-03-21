export const ProductDetail = ({product, onClose}) =>{
    if (!product) return null;
    return (
        <div className="px-4 py-10">
            <button
                onClick={onClose}
                className="mb-4 text-red-500 hover:text-red-700 font-semibold"

            >
                Close
            </button>
            <div className="bg-white rounded shadow p-6 max-w-3xl mx-auto">
                <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-64 object-cover rounded mb-4"
                />
                <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
                <p className="text-gray-700 mb-2">{product.description}</p>
                <p className="text-lg font-semibold text-blue-600">{product.price}</p>
            </div>
        </div>
    );
};

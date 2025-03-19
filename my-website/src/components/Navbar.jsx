// Navbar Component
export const Navbar = () => {
    return (
      <nav className="bg-green-300 shadow-md p-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
            <img src="/images/logo.jpeg" alt="LawComp Computers" className="h-24 w-auto" />
            <input 
                type="text" 
                placeholder="Search for products here...."
                className="border border-gray-300 px-4 py-2 rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-blue-600"

            />
            <button
                className="bg-blue-600 rounded px-4 py-2 text-white border"
            >
                Search
            </button>
        </div>
        <ul className="flex space-x-4">
          <li className="font-bold hover:text-blue-600 cursor-pointer">Home</li>
          <li className="font-bold hover:text-blue-600 cursor-pointer">Shop</li>
          <li className="font-bold hover:text-blue-600 cursor-pointer">Contact</li>
        </ul>
      </nav>
    );
  };
 
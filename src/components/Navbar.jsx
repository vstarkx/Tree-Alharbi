import { Link, useLocation } from 'react-router-dom';
import { TreePine, Home } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <TreePine className="h-8 w-8 text-primary-600" />
            <span className="text-xl font-bold text-gray-900">Family Tree</span>
          </Link>
          
          <div className="flex space-x-4">
            <Link
              to="/"
              className={`flex items-center space-x-1 px-4 py-2 rounded-lg transition-colors ${
                isActive('/')
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Home className="h-5 w-5" />
              <span className="hidden sm:inline">Home</span>
            </Link>
            <Link
              to="/tree"
              className={`flex items-center space-x-1 px-4 py-2 rounded-lg transition-colors ${
                isActive('/tree')
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <TreePine className="h-5 w-5" />
              <span className="hidden sm:inline">Family Tree</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


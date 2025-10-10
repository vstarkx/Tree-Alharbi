import { TreePine } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-emerald-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center h-16">
          <div className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-400 rounded-lg blur-md opacity-0 group-hover:opacity-40 transition-opacity"></div>
              <TreePine className="relative h-8 w-8 text-emerald-600 group-hover:scale-110 transition-transform" strokeWidth={2} />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              شجرة العائلة
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

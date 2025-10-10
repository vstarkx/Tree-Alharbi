import { Link } from 'react-router-dom';
import { TreePine, ArrowRight } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        {/* Icon */}
        <div className="flex justify-center mb-8 animate-float">
          <div className="relative">
            <div className="absolute inset-0 bg-emerald-400 rounded-full blur-2xl opacity-40"></div>
            <TreePine className="relative h-28 w-28 md:h-36 md:w-36 text-emerald-600" strokeWidth={1.5} />
          </div>
        </div>
        
        {/* Title */}
        <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 mb-6 tracking-tight">
          Family Tree
        </h1>
        
        {/* Subtitle */}
        <p className="text-xl md:text-3xl text-gray-700 mb-16 max-w-3xl mx-auto font-light">
          Build and visualize your family connections
        </p>

        {/* CTA Button */}
        <Link
          to="/tree"
          className="group inline-flex items-center space-x-3 px-12 py-5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-2xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 font-semibold text-xl shadow-2xl hover:shadow-3xl hover:scale-105 transform"
        >
          <span>Start Building</span>
          <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
        </Link>

        {/* Small hint text */}
        <p className="mt-8 text-sm text-gray-500">
          Simple • Beautiful • Intuitive
        </p>
      </div>
    </div>
  );
};

export default Home;

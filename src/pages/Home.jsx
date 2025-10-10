import { Link } from 'react-router-dom';
import { TreePine, Users, Heart, ArrowRight } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-primary-50 to-blue-50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="text-center space-y-8">
          <div className="flex justify-center">
            <TreePine className="h-20 w-20 md:h-24 md:w-24 text-primary-600" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
            Visualize Your Family Tree
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Create, manage, and explore your family connections with our beautiful and intuitive family tree builder. Perfect for all ages.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link
              to="/tree"
              className="flex items-center space-x-2 px-8 py-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium text-lg shadow-lg hover:shadow-xl"
            >
              <span>Get Started</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-20 md:mt-32 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-primary-100 rounded-full">
                <Users className="h-8 w-8 text-primary-600" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 text-center mb-3">
              Easy to Use
            </h3>
            <p className="text-gray-600 text-center">
              Add family members with a simple form. No technical knowledge required.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-primary-100 rounded-full">
                <TreePine className="h-8 w-8 text-primary-600" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 text-center mb-3">
              Interactive Tree
            </h3>
            <p className="text-gray-600 text-center">
              Visualize relationships with an interactive, zoomable tree view.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-primary-100 rounded-full">
                <Heart className="h-8 w-8 text-primary-600" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 text-center mb-3">
              Fully Responsive
            </h3>
            <p className="text-gray-600 text-center">
              Works perfectly on mobile, tablet, and desktop devices.
            </p>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mt-20 md:mt-32 bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            How It Works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                  1
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Add Members
              </h3>
              <p className="text-gray-600">
                Click "Add Member" and fill in the details like name, date of birth, and photo.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                  2
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Link Relationships
              </h3>
              <p className="text-gray-600">
                Select a parent to automatically connect family members in the tree.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                  3
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Explore & Manage
              </h3>
              <p className="text-gray-600">
                View your tree, click on members for details, and edit or delete as needed.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              to="/tree"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium text-lg shadow-lg hover:shadow-xl"
            >
              <span>Start Building Your Tree</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;


import { Link } from 'react-router-dom';

const StatusHandler = ({ loading, product, children }) => {
  // ১. লোডিং অবস্থা
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="w-12 h-12 border-4 border-gray-100 border-t-blue-600 rounded-full animate-spin"></div>
        <p className="text-gray-500 font-medium animate-pulse">Loading details...</p>
      </div>
    );
  }

  // ২. ডাটা না পাওয়া গেলে
  if (!product) {
    return (
      <section className="min-h-[60vh] flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4 grayscale opacity-50">📦</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Product Not Found</h2>
          <p className="text-gray-500 mb-8">
            Sorry, we couldn't find the product you're looking for.
          </p>
          <Link
            to="/"
            className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all shadow-md active:scale-95"
          >
            Back to Shop
          </Link>
        </div>
      </section>
    );
  }

  // ৩. ডাটা থাকলে মেইন কন্টেন্ট (children) দেখাবে
  return children;
};

export default StatusHandler;
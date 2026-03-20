import {
  FaSearch,
  FaShoppingCart,
  FaClipboardCheck,
  FaMoneyCheckAlt,
  FaTruck,
} from "react-icons/fa";

const HowToOrder = () => {
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Header */}
      <section className="bg-[#1b2d24] py-16 px-6 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-['Playfair_Display'] font-bold mb-4">
            How to Order
          </h1>
          <p className="text-white/70 text-sm md:text-base">
            Simple steps to get fresh organic fruits at your doorstep
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm p-8 md:p-12">

          <p className="mb-10 text-gray-600">
            Ordering from <strong>Dinajpur Organic Fruits</strong> is quick and easy.
            Just follow these simple steps below.
          </p>

          {/* Steps */}
          <div className="space-y-6">

            <div className="flex items-start gap-4 p-4 rounded-xl border hover:shadow-sm transition">
              <FaSearch className="text-green-700 text-2xl mt-1" />
              <div>
                <h2 className="font-bold text-[#1b2d24]">Step 1: Browse Products</h2>
                <p className="text-sm text-gray-600">
                  Explore fresh organic fruits available on our website.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl border hover:shadow-sm transition">
              <FaShoppingCart className="text-green-700 text-2xl mt-1" />
              <div>
                <h2 className="font-bold text-[#1b2d24]">Step 2: Add to Cart</h2>
                <p className="text-sm text-gray-600">
                  Select your favorite items and add them to cart.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl border hover:shadow-sm transition">
              <FaClipboardCheck className="text-green-700 text-2xl mt-1" />
              <div>
                <h2 className="font-bold text-[#1b2d24]">Step 3: Checkout</h2>
                <p className="text-sm text-gray-600">
                  Enter your delivery details and confirm order information.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl border hover:shadow-sm transition">
              <FaMoneyCheckAlt className="text-green-700 text-2xl mt-1" />
              <div>
                <h2 className="font-bold text-[#1b2d24]">Step 4: Payment</h2>
                <p className="text-sm text-gray-600">
                  Complete payment using bKash, Nagad, or other methods.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl border hover:shadow-sm transition">
              <FaTruck className="text-green-700 text-2xl mt-1" />
              <div>
                <h2 className="font-bold text-[#1b2d24]">Step 5: Delivery</h2>
                <p className="text-sm text-gray-600">
                  We deliver fresh fruits directly to your doorstep.
                </p>
              </div>
            </div>

          </div>

          {/* Note */}
          <div className="mt-10 bg-green-50 border border-green-100 p-6 rounded-xl">
            <p className="text-sm text-green-900">
              💡 Make sure your phone number and address are correct for smooth delivery.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
};

export default HowToOrder;
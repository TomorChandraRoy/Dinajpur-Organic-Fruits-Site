import {
  FaClock,
  FaSyncAlt,
  FaShieldAlt,
  FaExclamationCircle,
} from "react-icons/fa";

const RefundPolicy = () => {
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Header */}
      <section className="bg-[#1b2d24] py-16 px-6 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-['Playfair_Display'] font-bold mb-4">
            Refund Policy
          </h1>
          <p className="text-white/70 text-sm md:text-base">
            Last Updated: March 20, 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-6">
        <div className="max-w-[900px] mx-auto bg-white rounded-2xl shadow-sm p-8 md:p-12">

          {/* Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 border-b border-gray-100 pb-12">

            <div className="flex flex-col items-center text-center p-4">
              <FaClock className="text-green-700 mb-3 text-3xl" />
              <h3 className="font-bold text-[#1b2d24]">Quick Process</h3>
              <p className="text-xs text-gray-500">Fast claim handling</p>
            </div>

            <div className="flex flex-col items-center text-center p-4">
              <FaSyncAlt className="text-green-700 mb-3 text-3xl" />
              <h3 className="font-bold text-[#1b2d24]">Easy Refund</h3>
              <p className="text-xs text-gray-500">Simple verification system</p>
            </div>

            <div className="flex flex-col items-center text-center p-4">
              <FaShieldAlt className="text-green-700 mb-3 text-3xl" />
              <h3 className="font-bold text-[#1b2d24]">Secure Service</h3>
              <p className="text-xs text-gray-500">Safe and trusted refunds</p>
            </div>

          </div>

          {/* Policy Content */}
          <div className="space-y-10 text-gray-700 leading-relaxed">

            {/* Conditions */}
            <div>
              <h2 className="text-xl font-bold text-[#1b2d24] mb-4 flex items-center gap-2">
                <FaExclamationCircle className="text-green-700" />
                Refund Conditions
              </h2>

              <p className="mb-4">
                Refunds are only applicable in special cases to ensure fairness and product quality.
              </p>

              <ul className="list-disc pl-6 space-y-2 text-sm md:text-base">
                <li>Damaged or spoiled product on delivery</li>
                <li>Wrong item delivered</li>
                <li>Missing or incorrect quantity</li>
                <li>Product not matching order description</li>
              </ul>
            </div>

            <hr className="border-gray-100" />

            {/* How to request */}
            <div>
              <h2 className="text-xl font-bold text-[#1b2d24] mb-4">
                How to Request a Refund
              </h2>

              <div className="bg-green-50 rounded-xl p-6 border-l-4 border-green-700">
                <ol className="list-decimal pl-5 space-y-3 font-medium text-[#1b2d24]">
                  <li>Take clear photo/video of the issue</li>
                  <li>Contact our support team immediately</li>
                  <li>Share details via phone, WhatsApp, or email</li>
                </ol>
              </div>
            </div>

            {/* Support */}
            <div className="bg-[#1b2d24] text-white p-8 rounded-2xl text-center">
              <h3 className="text-lg font-bold mb-2">Need Help?</h3>
              <p className="text-white/70 text-sm mb-6">
                Our support team is available 9 AM – 10 PM
              </p>

              <a
                href="tel:+8801321208940"
                className="bg-white text-[#1b2d24] px-8 py-3 rounded-full font-bold hover:bg-green-50 transition"
              >
                Contact Support
              </a>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default RefundPolicy;

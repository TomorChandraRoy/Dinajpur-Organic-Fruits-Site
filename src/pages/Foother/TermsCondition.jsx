const TermsCondition = () => {
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Header */}
      <section className="bg-[#1b2d24] py-16 px-6 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-['Playfair_Display'] font-bold mb-4">
            Terms & Conditions
          </h1>
          <p className="text-white/70 text-sm md:text-base">
            Last Updated: March 20, 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-6">
        <div className="max-w-[1000px] mx-auto bg-white rounded-2xl shadow-sm p-8 md:p-12 text-gray-700 leading-relaxed">

          <p className="mb-6">
            Welcome to <strong>Dinajpur Organic Fruits</strong>. By accessing or
            purchasing from our website, you agree to the following terms and conditions.
          </p>

          {/* Section 1 */}
          <h2 className="text-xl font-bold text-[#1b2d24] mb-3">
            1. Product Information
          </h2>
          <p className="mb-6">
            We sell fresh, organic fruits sourced directly from local farms.
            We try to ensure all product descriptions, images, and prices are accurate,
            but slight variations may occur due to natural products.
          </p>

          {/* Section 2 */}
          <h2 className="text-xl font-bold text-[#1b2d24] mb-3">
            2. Orders & Payments
          </h2>
          <p className="mb-6">
            All orders must be placed through our official website or authorized channels.
            Payments must be completed before delivery confirmation.
          </p>

          {/* Section 3 */}
          <h2 className="text-xl font-bold text-[#1b2d24] mb-3">
            3. Delivery
          </h2>
          <p className="mb-6">
            We deliver products within the mentioned delivery area.
            Delivery time may vary depending on location and availability.
          </p>

          {/* Section 4 */}
          <h2 className="text-xl font-bold text-[#1b2d24] mb-3">
            4. Returns Policy
          </h2>
          <p className="mb-6">
            Returns are only accepted for damaged, incorrect, or spoiled items
            reported within 24 hours of delivery.
          </p>

          {/* Section 5 */}
          <h2 className="text-xl font-bold text-[#1b2d24] mb-3">
            5. User Responsibilities
          </h2>
          <p className="mb-6">
            Customers must provide accurate delivery information and ensure availability
            during delivery time.
          </p>

          {/* Section 6 */}
          <h2 className="text-xl font-bold text-[#1b2d24] mb-3">
            6. Changes to Terms
          </h2>
          <p className="mb-6">
            We reserve the right to update these terms at any time without prior notice.
          </p>

          {/* Footer note */}
          <div className="mt-10 border-t pt-6 text-sm text-gray-500 text-center">
            © 2026 Dinajpur Organic Fruits. All rights reserved.
          </div>

        </div>
      </section>

    </div>
  );
};

export default TermsCondition;
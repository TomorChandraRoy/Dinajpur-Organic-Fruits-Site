const ReturnsPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-gray-700">

      {/* Title */}
      <h1 className="text-3xl font-bold text-green-700 mb-2">
        Returns Policy
      </h1>

      <p className="mb-8 text-gray-500">
        Dinajpur Organic Fruits ensures fresh and quality products. Please read our return guidelines carefully.
      </p>

      {/* Card 1 */}
      <div className="border rounded-xl p-6 mb-6 shadow-sm hover:shadow-md transition">
        <h2 className="text-xl font-semibold mb-3 text-green-700">
          Return Eligibility
        </h2>
        <ul className="list-disc ml-6 space-y-1">
          <li>Damaged products during delivery</li>
          <li>Wrong items received</li>
          <li>Items not matching description</li>
        </ul>
      </div>

      {/* Card 2 */}
      <div className="border rounded-xl p-6 mb-6 shadow-sm hover:shadow-md transition">
        <h2 className="text-xl font-semibold mb-3 text-green-700">
          Non-Returnable Items
        </h2>
        <ul className="list-disc ml-6 space-y-1">
          <li>Opened or used fruits</li>
          <li>Perishable items after delivery acceptance</li>
          <li>Late complaints after delivery</li>
        </ul>
      </div>

      {/* Card 3 */}
      <div className="border rounded-xl p-6 mb-6 shadow-sm hover:shadow-md transition">
        <h2 className="text-xl font-semibold mb-3 text-green-700">
          Return Process
        </h2>
        <p>
          Contact our support team immediately after receiving your order with full details.
          Our team will review and guide you through the process.
        </p>
      </div>

      {/* Card 4 */}
      <div className="border rounded-xl p-6 shadow-sm hover:shadow-md transition">
        <h2 className="text-xl font-semibold mb-3 text-green-700">
          Support
        </h2>
        <p>
          If you face any issues, please contact us via the contact page. We are always ready to help you.
        </p>
      </div>

    </div>
  );
};

export default ReturnsPolicy;
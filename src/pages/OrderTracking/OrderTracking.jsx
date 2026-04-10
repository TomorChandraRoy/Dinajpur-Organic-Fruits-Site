import { useState } from "react";
import {
  FaBoxOpen,
  FaCreditCard,
  FaCheckCircle,
  FaTruck,
  FaShippingFast,
  FaSearch,
  FaPhone,
  FaShoppingCart,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import orderTrackingData from "../../utils/data/orderTrackingData.json";

/* =========================
   Icon Map
========================= */
const iconMap = {
  FaBoxOpen,
  FaCreditCard,
  FaCheckCircle,
  FaTruck,
  FaShippingFast,
};

const OrderTracking = () => {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState(null);
  const [searched, setSearched] = useState(false); // 👈 NEW FLAG

  const { header, search, contact, orders } = orderTrackingData;

  // 🔍 SEARCH
  const handleTrack = () => {
    const id = orderId.trim().replace(/\s+/g, "").toUpperCase();
    if (!id) return; // খালি ইনপুট হলে সার্চ করবে না

    setSearched(true); // 👈 user clicked track

    if (orders[id]) {
      setOrder(orders[id]);
    } else {
      setOrder(null);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* HEADER */}
      <section className="bg-[#1b2d24] py-16 text-center text-white">
        <h1 className="text-3xl md:text-5xl font-bold">{header.title}</h1>
        <p className="text-white/70 mt-2">{header.subtitle}</p>
      </section>

      {/* CONTENT */}
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm p-6 md:p-10">
          {/* SEARCH */}
          <div className="flex gap-3">
            <input
              value={orderId}
              onChange={(e) => {
                setOrderId(e.target.value);
                setSearched(false); // টাইপ করার সময় এরর মেসেজ সরিয়ে ফেলবে
              }}
              onKeyDown={(e) => e.key === "Enter" && handleTrack()} // Enter চাপলে সার্চ হবে
              placeholder={search.placeholder}
              className="w-full border px-4 py-2 rounded-lg outline-none focus:border-green-700"
            />

            <button
              onClick={handleTrack}
              className="bg-[#1b2d24] hover:bg-green-700 text-white px-4 rounded-lg flex items-center gap-2"
            >
              <FaSearch /> {search.buttonText}
            </button>
          </div>

          {/* NOT FOUND */}
          {searched && !order && (
            <p className="text-red-500 mt-5 font-medium">
              {search.notFoundMessage}
            </p>
          )}

          {/* ORDER FOUND */}
          {order && (
            <div className="mt-8">
              {/* HEADER */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-lg">
                  Order ID: {orderId.toUpperCase()}
                </h2>
                <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
                  {order.status}
                </span>
              </div>

              <p className="text-sm text-gray-600 mb-6">
                📍 Delivering to: {order.address}
              </p>

              {/* TIMELINE */}
              <div className="relative border-l-2 border-gray-200 ml-4">
                {order.steps.map((step, index) => {
                  const Icon = iconMap[step.icon];

                  return (
                    <div key={index} className="mb-8 ml-6 relative">
                      <span
                        className={`absolute -left-10 top-1 w-8 h-8 flex items-center justify-center rounded-full text-white
                        ${step.active ? "bg-green-700" : "bg-gray-300"}`}
                      >
                        <Icon size={14} />
                      </span>

                      <h3 className="font-semibold text-[#1b2d24]">
                        {step.title}
                      </h3>

                      <p className="text-sm text-gray-500">{step.desc}</p>
                    </div>
                  );
                })}
              </div>

              {/* BUTTONS */}
              <div className="flex flex-col sm:flex-row gap-4 mt-10">
                <a
                  href={`tel:${contact.phone}`}
                  className="flex items-center justify-center gap-2 border border-green-700 text-green-700 px-5 py-2 rounded-full hover:bg-green-50"
                >
                  <FaPhone /> {contact.supportText}
                </a>

                <Link
                  to="/"
                  className="flex items-center justify-center gap-2 bg-[#1b2d24] text-white px-5 py-2 rounded-full hover:bg-green-700"
                >
                  <FaShoppingCart /> {contact.shopText}
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default OrderTracking;

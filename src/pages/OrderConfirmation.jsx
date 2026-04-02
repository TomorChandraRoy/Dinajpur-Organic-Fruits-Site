import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiCheckCircle, BiShoppingBag } from "react-icons/bi";
import { useCart } from "../context/CartContext";

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const { clearCart } = useCart();

  // Generate a mock Order ID once when component mounts
  const [orderId] = useState(
    () => `DOF-${Math.floor(100000 + Math.random() * 900000)}`,
  );

  // Clear the cart when this page loads
  useEffect(() => {
    clearCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="bg-[#f6f6f3] py-16 min-h-[70vh] flex items-center justify-center font-sans px-4">
      <div className="max-w-lg w-full bg-white rounded-3xl p-8 md:p-12 text-center shadow-[0_10px_40px_rgba(0,0,0,0.08)] animate-in zoom-in duration-500">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <BiCheckCircle className="text-5xl text-green-700" />
        </div>

        <h1 className="text-3xl font-extrabold text-gray-900 mb-3 font-['Playfair_Display']">
          Order Confirmed!
        </h1>
        <p className="text-gray-600 mb-8 leading-relaxed">
          Thank you for shopping with Dinajpur Organic Fruits. Your order has
          been successfully placed. We will contact you shortly to confirm the
          delivery.
        </p>

        <div className="bg-[#fbfaf7] rounded-2xl p-4 mb-8 border border-[#e7e2d7]">
          <p className="text-sm text-gray-500 mb-1">Your Order ID</p>
          <p className="text-xl font-extrabold tracking-wider text-green-800">
            {orderId}
          </p>

          <div className="mt-4 pt-4 border-t border-[#e7e2d7] text-left text-sm text-gray-700 space-y-2">
            <p>
              <span className="font-semibold text-gray-900">
                📍 Delivery to:
              </span>{" "}
              Your provided address
            </p>
            <p>
              <span className="font-semibold text-gray-900">🚚 Expected:</span>{" "}
              3-5 Business Days
            </p>
            <p>
              <span className="font-semibold text-gray-900">💵 Payment:</span>{" "}
              Pending / Cash on Delivery
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => navigate("/order-tracking")}
            className="cursor-pointer w-full sm:w-auto px-8 py-3 rounded-full bg-green-700 text-white font-bold transition-all hover:bg-green-800 hover:shadow-lg"
          >
            Track Order
          </button>
          <button
            onClick={() => navigate("/shop/all")}
            className="cursor-pointer w-full sm:w-auto px-8 py-3 rounded-full border-2 border-green-700 text-green-700 font-bold transition-all hover:bg-green-50 flex items-center justify-center gap-2"
          >
            <BiShoppingBag className="text-lg" />
            Shop More
          </button>
        </div>
      </div>
    </section>
  );
};

export default OrderConfirmation;

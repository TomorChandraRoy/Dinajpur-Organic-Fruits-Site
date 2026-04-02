import { useNavigate } from "react-router-dom";
import {
  BiChevronRight,
  BiCart,
  BiPlus,
  BiMinus,
  BiCheck,
  BiSolidArrowToRight,
  BiArrowToRight,
} from "react-icons/bi";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { GoArrowRight } from "react-icons/go";

const Checkout = () => {
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const { cartItems, removeFromCart, updateQty } = useCart();

  const handleDeleteItem = (id) => {
    removeFromCart(id);
  };

  const handleIncreaseQty = (id) => {
    const item = cartItems.find((item) => item.id === id);
    if (item) {
      updateQty(id, item.qty + 1);
    }
  };

  const handleDecreaseQty = (id) => {
    const item = cartItems.find((item) => item.id === id);
    if (item && item.qty > 1) {
      updateQty(id, item.qty - 1);
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0,
  );
  const deliveryFee = 60;
  const discountAmount = (subtotal * discount) / 100;
  const total = subtotal + deliveryFee - discountAmount;

  const handleApplyCoupon = () => {
    const couponCodes = {
      GB10: 10,
      GB20: 20,
      GB50: 50,
      SAVE100: 100,
    };

    if (couponCodes[couponCode]) {
      setDiscount(couponCodes[couponCode]);
    } else {
      alert("Invalid coupon code!");
      setDiscount(0);
      setCouponCode("");
    }
  };

  return (
    <section className="bg-[#f6f6f3] py-10 min-h-screen">
      <style>{`
        @keyframes smoothBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        .animate-bounce-smooth {
          animation: smoothBounce 7s infinite ease-in-out;
        }
      `}</style>
      <div className="mx-auto max-w-[1240px] px-4">
        {/* Breadcrumb */}
        <div className="mb-5 flex flex-wrap items-center gap-2 rounded-2xl px-4 py-3 text-sm text-gray-500">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="cursor-pointer font-semibold text-green-700 transition hover:text-green-800"
          >
            Home
          </button>
          <BiChevronRight className="text-base" />
          <span className="font-medium text-gray-700">Checkout</span>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {/* Left Side - Order Summary */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-[#ddd8ca] bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <BiCart className="text-3xl text-green-700" />
                  <h2 className="text-2xl font-bold text-gray-900">
                    Shopping Cart
                  </h2>
                </div>
                <span className="rounded-xl bg-green-100 px-4 py-2 text-sm font-bold text-green-700">
                  {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
                </span>
              </div>

              {/* Cart Items */}
              <div className="divide-y divide-[#e7e2d7] max-h-[500px] overflow-y-auto pr-2">
                {cartItems.length === 0 ? (
                  <div className="pb-4 text-center text-gray-500">
                    <BiCart className="mx-auto w-28 h-auto mb-4 text-6xl text-gray-400" />
                    <p className="font-bold text-lg">Your cart is empty</p>
                    <p className="mt-2 text-sm">
                      Add some products to get started!
                    </p>
                    <button
                      onClick={() => navigate("/shop/all")}
                      className="mt-3 cursor-pointer rounded-lg bg-green-700 px-6 py-2 text-white transition hover:bg-green-800"
                    >
                      Continue Shopping
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between py-4 border-b border-[#e7e2d7] last:border-0"
                      >
                        <div className="flex flex-1 items-center gap-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-12 w-12 rounded-md border border-[#d9d4c8] object-cover"
                          />
                          <div>
                            <p className="font-semibold text-gray-900">
                              {item.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              Tk {item.price}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2 border border-[#d9d4c8] rounded-lg px-2 py-1">
                            <button
                              onClick={() => handleDecreaseQty(item.id)}
                              className="cursor-pointer text-gray-600 hover:text-green-700 transition"
                            >
                              <BiMinus className="text-sm" />
                            </button>
                            <span className="w-8 text-center text-sm font-semibold">
                              {item.qty}
                            </span>
                            <button
                              onClick={() => handleIncreaseQty(item.id)}
                              className="cursor-pointer text-gray-600 hover:text-green-700 transition"
                            >
                              <BiPlus className="text-sm" />
                            </button>
                          </div>

                          {/* Total Price */}
                          <span className="font-bold text-gray-900 min-w-[70px] text-right">
                            Tk {(item.price * item.qty).toLocaleString()}
                          </span>

                          {/* Delete Button */}
                          <button
                            onClick={() => handleDeleteItem(item.id)}
                            // className="cursor-pointer text-red-500 hover:text-red-700 transition ml-2"
                            className="group relative flex h-10 w-10 flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-red-800 bg-red-400 hover:bg-red-600  ml-2 cursor-pointer"
                          >
                            <svg
                              viewBox="0 0 1.625 1.625"
                              className="absolute -top-7 fill-white delay-100 group-hover:top-6 group-hover:animate-[spin_1.4s] group-hover:duration-1000"
                              height="15"
                              width="15"
                            >
                              <path d="M.471 1.024v-.52a.1.1 0 0 0-.098.098v.618c0 .054.044.098.098.098h.487a.1.1 0 0 0 .098-.099h-.39c-.107 0-.195 0-.195-.195"></path>
                              <path d="M1.219.601h-.163A.1.1 0 0 1 .959.504V.341A.033.033 0 0 0 .926.309h-.26a.1.1 0 0 0-.098.098v.618c0 .054.044.098.098.098h.487a.1.1 0 0 0 .098-.099v-.39a.033.033 0 0 0-.032-.033"></path>
                              <path d="m1.245.465-.15-.15a.02.02 0 0 0-.016-.006.023.023 0 0 0-.023.022v.108c0 .036.029.065.065.065h.107a.023.023 0 0 0 .023-.023.02.02 0 0 0-.007-.016"></path>
                            </svg>
                            <svg
                              width="16"
                              fill="none"
                              viewBox="0 0 39 7"
                              className="origin-right duration-500 group-hover:rotate-90"
                            >
                              <line
                                strokeWidth="4"
                                stroke="white"
                                y2="5"
                                x2="39"
                                y1="5"
                              ></line>
                              <line
                                strokeWidth="3"
                                stroke="white"
                                y2="1.5"
                                x2="26.0357"
                                y1="1.5"
                                x1="12"
                              ></line>
                            </svg>
                            <svg width="16" fill="none" viewBox="0 0 33 39">
                              <mask fill="white" id="path-1-inside-1_8_19">
                                <path d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"></path>
                              </mask>
                              <path
                                mask="url(#path-1-inside-1_8_19)"
                                fill="white"
                                d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
                              ></path>
                              <path
                                strokeWidth="4"
                                stroke="white"
                                d="M12 6L12 29"
                              ></path>
                              <path
                                strokeWidth="4"
                                stroke="white"
                                d="M21 6V29"
                              ></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Side - Order Total */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl border border-[#ddd8ca] bg-white p-6 shadow-sm">
              <h3 className="mb-6 text-xl font-bold text-gray-900">
                Order Summary
              </h3>

              {/* Price Breakdown */}
              <div className="space-y-4 mb-5 pb-5 border-b border-[#e7e2d7]">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium text-gray-900">
                    Tk {subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="font-medium text-gray-900">
                    Tk {deliveryFee}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    Discount {discount > 0 && `(${discount}%)`}
                  </span>
                  <span className="font-medium text-green-700">
                    - Tk {discountAmount.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between mb-6">
                <span className="text-lg font-bold text-gray-900">Total</span>
                <span className="text-lg font-bold text-gray-900">
                  Tk {total.toLocaleString()}
                </span>
              </div>

              {/* Coupon Code Input */}
              <div className="flex gap-2 mb-6">
                <input
                  type="text"
                  placeholder="Coupon code (try GB10)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 rounded-lg border border-[#d9d4c8] px-4 py-2.5 text-sm outline-none transition focus:border-green-600"
                />
                <button
                  onClick={handleApplyCoupon}
                  className="cursor-pointer rounded-lg bg-green-700 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-green-800"
                >
                  Apply
                </button>
              </div>
              {discount > 0 && (
                <div className="mb-4 rounded-lg bg-green-100 px-4 py-3 text-sm font-medium text-green-700 flex items-center gap-2">
                  <BiCheck className="text-lg flex-shrink-0" />
                  <span>Coupon applied! {discount}% discount</span>
                </div>
              )}

              {/* Checkout Button */}
              <button
                onClick={() => navigate("/payment")}
                disabled={cartItems.length === 0}
                className={`w-full rounded-full px-6 py-3 text-white font-bold mb-3 flex items-center justify-center gap-2 transition-all duration-300 ${
                  cartItems.length === 0
                    ? "bg-gray-300 cursor-not-allowed"
                    : "cursor-pointer bg-green-700 hover:bg-green-800 animate-bounce-smooth"
                }`}
              >
                Proceed to Checkout
                <GoArrowRight className="text-xl font-bold" />
              </button>

              {/* Continue Shopping Button */}
              <button
                onClick={() => navigate("/shop/all")}
                className="w-full cursor-pointer rounded-full border-2 border-green-700 bg-white px-6 py-2.5 text-sm font-semibold text-green-700 transition hover:bg-green-50"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;

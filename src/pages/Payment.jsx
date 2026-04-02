import { useNavigate } from "react-router-dom";
import { BiChevronRight, BiCheck, BiSolidTruck } from "react-icons/bi";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useForm, useWatch } from "react-hook-form";

// 64 Districts of Bangladesh
const bdDistricts = [
  "Bagerhat",
  "Bandarban",
  "Barguna",
  "Barishal",
  "Bhola",
  "Bogra",
  "Brahmanbaria",
  "Chandpur",
  "Chapai Nawabganj",
  "Chattogram",
  "Chuadanga",
  "Cumilla",
  "Cox's Bazar",
  "Dhaka",
  "Dinajpur",
  "Faridpur",
  "Feni",
  "Gaibandha",
  "Gazipur",
  "Gopalganj",
  "Habiganj",
  "Jamalpur",
  "Jashore",
  "Jhalokathi",
  "Jhenaidah",
  "Joypurhat",
  "Khagrachari",
  "Khulna",
  "Kishoreganj",
  "Kurigram",
  "Kushtia",
  "Lakshmipur",
  "Lalmonirhat",
  "Madaripur",
  "Magura",
  "Manikganj",
  "Meherpur",
  "Moulvibazar",
  "Munshiganj",
  "Mymensingh",
  "Naogaon",
  "Narail",
  "Narayanganj",
  "Narsingdi",
  "Natore",
  "Netrokona",
  "Nilphamari",
  "Noakhali",
  "Pabna",
  "Panchagarh",
  "Patuakhali",
  "Pirojpur",
  "Rajbari",
  "Rajshahi",
  "Rangamati",
  "Rangpur",
  "Satkhira",
  "Shariatpur",
  "Sherpur",
  "Sirajganj",
  "Sunamganj",
  "Sylhet",
  "Tangail",
  "Thakurgaon",
].sort();

const Payment = () => {
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const [loading, setLoading] = useState(false);

  // React Hook Form Setup
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      email: "",
      district: "",
      upazila: "",
      fullAddress: "",
      deliveryNote: "",
      deliveryMethod: "express",
      paymentMethod: "cod",
    },
  });

  // Dynamic values for calculation
  const [watchedDeliveryMethod, watchedPaymentMethod] = useWatch({
    control,
    name: ["deliveryMethod", "paymentMethod"],
  });

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0,
  );
  const deliveryFee = watchedDeliveryMethod === "express" ? 120 : 60;
  const total = subtotal + deliveryFee;

  const onSubmit = async (data) => {
    setLoading(true);
    console.log("Order Submitted:", data);
    // Simulate API Call
    setTimeout(() => {
      setLoading(false);
      navigate("/order-confirmation", { replace: true });
    }, 2000);
  };

  return (
    <section className="bg-[#f6f6f3] py-10 min-h-screen font-sans">
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
          <button
            type="button"
            onClick={() => navigate("/checkout")}
            className="cursor-pointer font-semibold text-green-700 transition hover:text-green-800"
          >
            Checkout
          </button>
          <BiChevronRight className="text-base" />
          <span className="font-medium text-gray-700">Payment</span>
        </div>

        {/* Main Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-5 lg:grid-cols-3"
        >
          {/* Left Side - Delivery & Payment Info */}
          <div className="lg:col-span-2 space-y-5">
            {/* Delivery Information */}
            <div className="rounded-2xl border border-[#ddd8ca] bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center gap-3">
                <span className="text-2xl">📍</span>
                <h2 className="text-xl font-bold text-gray-900">
                  Delivery Information
                </h2>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      {...register("fullName", {
                        required: "Name is required",
                      })}
                      placeholder="Rahim Uddin"
                      className={`w-full rounded-lg border ${errors.fullName ? "border-red-500" : "border-[#d9d4c8]"} px-4 py-2.5 text-sm outline-none transition focus:border-green-600`}
                    />
                    {errors.fullName && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.fullName.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      {...register("phoneNumber", {
                        required: "Phone is required",
                        pattern: {
                          value: /^(?:\+88|88)?(01[3-9]\d{8})$/,
                          message: "Valid BD number required",
                        },
                      })}
                      type="tel"
                      placeholder="017XXXXXXXX"
                      className={`w-full rounded-lg border ${errors.phoneNumber ? "border-red-500" : "border-[#d9d4c8]"} px-4 py-2.5 text-sm outline-none transition focus:border-green-600`}
                    />
                    {errors.phoneNumber && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.phoneNumber.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="you@example.com (optional)"
                    className="w-full rounded-lg border border-[#d9d4c8] px-4 py-2.5 text-sm outline-none transition focus:border-green-600"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      District *
                    </label>
                    <select
                      {...register("district", { required: "Select District" })}
                      className={`w-full rounded-lg border ${errors.district ? "border-red-500" : "border-[#d9d4c8]"} px-4 py-2.5 text-sm outline-none transition focus:border-green-600`}
                    >
                      <option value="">Select District</option>
                      {bdDistricts.map((d) => (
                        <option key={d} value={d.toLowerCase()}>
                          {d}
                        </option>
                      ))}
                    </select>
                    {errors.district && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.district.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Upazila / Area *
                    </label>
                    <input
                      {...register("upazila", { required: "Area is required" })}
                      placeholder="Dhanmondi, Mirpur..."
                      className={`w-full rounded-lg border ${errors.upazila ? "border-red-500" : "border-[#d9d4c8]"} px-4 py-2.5 text-sm outline-none transition focus:border-green-600`}
                    />
                    {errors.upazila && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.upazila.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Address *
                  </label>
                  <textarea
                    {...register("fullAddress", {
                      required: "Address is required",
                    })}
                    placeholder="House no. Road no. Village..."
                    rows="3"
                    className={`w-full rounded-lg border ${errors.fullAddress ? "border-red-500" : "border-[#d9d4c8]"} px-4 py-2.5 text-sm outline-none transition focus:border-green-600 resize-none`}
                  ></textarea>
                  {errors.fullAddress && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.fullAddress.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Delivery Note (Optional)
                  </label>
                  <textarea
                    {...register("deliveryNote")}
                    placeholder="Any special instruction..."
                    rows="2"
                    className="w-full rounded-lg border border-[#d9d4c8] px-4 py-2.5 text-sm outline-none transition focus:border-green-600 resize-none"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Delivery Method */}
            <div className="rounded-2xl border border-[#ddd8ca] bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center gap-3">
                <BiSolidTruck className="text-2xl text-green-700" />
                <h3 className="text-lg font-bold text-gray-900">
                  Delivery Method
                </h3>
              </div>

              <div className="space-y-3">
                {[
                  {
                    id: "standard",
                    label: "Standard Delivery",
                    desc: "3-5 days • Tk 60",
                    val: "standard",
                  },
                  {
                    id: "express",
                    label: "Express Delivery",
                    desc: "1-3 days • Tk 120",
                    val: "express",
                  },
                ].map((item) => (
                  <label
                    key={item.id}
                    className="relative block cursor-pointer"
                  >
                    <input
                      type="radio"
                      value={item.val}
                      {...register("deliveryMethod")}
                      className="sr-only"
                    />
                    <div
                      className={`rounded-2xl border-2 p-4 transition ${watchedDeliveryMethod === item.val ? "border-green-700 bg-green-50" : "border-[#ddd8ca] bg-white hover:border-gray-400"}`}
                    >
                      <p className="font-semibold text-gray-900">
                        {item.label}
                      </p>
                      <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Payment Method */}
            <div className="rounded-2xl border border-[#ddd8ca] bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center gap-3">
                <span className="text-2xl">💳</span>
                <h3 className="text-lg font-bold text-gray-900">
                  Payment Method
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    id: "cod",
                    label: "💵 Cash on Delivery",
                    sub: "Pay when received",
                    val: "cod",
                  },
                  {
                    id: "ssl",
                    label: "💳 Pay Online (SSLCommerz)",
                    sub: "Cards / bKash / Nagad",
                    val: "ssl",
                  },
                ].map((pm) => (
                  <label key={pm.id} className="relative block cursor-pointer">
                    <input
                      type="radio"
                      value={pm.val}
                      {...register("paymentMethod")}
                      className="sr-only"
                    />
                    <div
                      className={`rounded-xl border-2 p-4 transition text-center ${watchedPaymentMethod === pm.val ? "border-green-700 bg-green-50" : "border-[#ddd8ca] bg-white hover:border-gray-400"}`}
                    >
                      <p className="text-sm font-bold text-gray-900">
                        {pm.label}
                      </p>
                      <p className="text-xs text-gray-500">{pm.sub}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Order Summary */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl border border-[#ddd8ca] bg-white p-6 shadow-sm sticky top-6">
              <h3 className="mb-6 text-xl font-bold text-gray-900">
                Order Summary
              </h3>

              {/* Cart Preview */}
              <div className="mb-6 max-h-[250px] overflow-y-auto space-y-3 border-b border-[#e7e2d7] pb-4 pr-1">
                {cartItems.map((item) => (


                  <div
                    key={item.id}
                    className="flex items-center justify-between text-sm"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-10 w-10 rounded-md border border-[#d9d4c8] object-cover"
                      />
                      <span className="text-gray-600">
                        {item.name}{" "}
                        <span className="font-semibold text-gray-800">
                          x{item.qty}
                        </span>
                      </span>
                    </div>
                    <span className="font-medium text-gray-900">
                      Tk {(item.price * item.qty).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-5 pb-5 border-b border-[#e7e2d7]">
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
              </div>

              {/* Total */}
              <div className="flex justify-between mb-6">
                <span className="text-lg font-bold text-gray-900">Total</span>
                <span className="text-lg font-bold text-green-700">
                  Tk {total.toLocaleString()}
                </span>
              </div>

              {/* Payment Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full rounded-full px-6 py-3 text-white font-bold mb-3 flex items-center justify-center gap-2 transition-all duration-300 ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "cursor-pointer bg-green-700 hover:bg-green-800"
                }`}
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <BiCheck className="text-lg w-8 h-8 font-bold" />
                    Complete Payment
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => navigate("/checkout")}
                className="w-full cursor-pointer rounded-full border-2 border-green-700 bg-white px-6 py-2.5 text-sm font-semibold text-green-700 transition hover:bg-green-50"
              >
                Back to Checkout
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Payment;

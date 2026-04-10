import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useMemo, useState } from "react";
import products from "../../utils/data/products.json";
import productDetailsData from "../../utils/data/productDetailsData.json";
import SimilarProducts from "./SimilarProducts";
import StatusHandler from "../../pages/OrderTracking/StatusHandler";
import { BiHeart, BiStar, BiX, BiCheck } from "react-icons/bi";
import { FaFacebook, FaShoppingCart } from "react-icons/fa";
import { BsTwitter } from "react-icons/bs";
import { useCart } from "../../context/CartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const product = products.find((p) => String(p.id) === String(id));

  const {ratingLabels,productImages,weightOptions,notificationText,shareTextPrefix} = productDetailsData;

  // ৪. প্রোডাক্ট ইমেজ সেট করা
  const detailImages = Array.from({ length: 4 }, (_, i) => {
    return productImages[(Number(id) + i) % productImages.length];
  });

  const [activeImage, setActiveImage] = useState(detailImages[0]);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [reviews, setReviews] = useState([]);
  const [reviewForm, setReviewForm] = useState({
    name: "",
    rating: 5,
    text: "",
  });
  const [weight, setWeight] = useState("5kg");

  const { addToCart } = useCart();
  const [notification, setNotification] = useState(false);

  ///social share
  const handleShare = (platform) => {
    // বর্তমান পেজের সম্পূর্ণ URL টি নেওয়া হচ্ছে
    const currentUrl = window.location.href;
    // শেয়ার করার সময় ডিফল্ট কিছু টেক্সট
    const shareText = `${shareTextPrefix}${product.name}`;

    let shareLink = "";

    if (platform === "facebook") {
      // ফেসবুকের শেয়ার লিংক
      shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
    } else if (platform === "twitter") {
      // টুইটারের শেয়ার লিংক
      shareLink = `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(shareText)}`;
    }

    // পপ-আপ উইন্ডোতে ওপেন করার জন্য
    window.open(
      shareLink,
      "_blank",
      "width=600,height=400,noopener,noreferrer",
    );
  };

  const { price, orig, discountPercent } = useMemo(() => {
    if (!product) return { price: 0, orig: 0, discountPercent: 0 };

    const selectedKg = Number(weight.replace("kg", "")) || 5;
    const basePerKg = product.price / 5;
    const baseOrigPerKg = product.orig / 5;
    const nextPrice = Math.round(basePerKg * selectedKg);
    const nextOrig = Math.round(baseOrigPerKg * selectedKg);
    const nextDiscount = Math.round(((nextOrig - nextPrice) / nextOrig) * 100);
    return { price: nextPrice, orig: nextOrig, discountPercent: nextDiscount };
  }, [product, weight]);

  const [prevId, setPrevId] = useState(id);

  // যদি ইউজার নতুন কোনো প্রোডাক্টে যায় (id চেঞ্জ হয়),
  // তাহলে সাথে সাথে ইমেজ রিসেট হয়ে যাবে কোনো ডাবল রেন্ডার ছাড়াই।
  if (id !== prevId) {
    setPrevId(id);
    setActiveImage(detailImages[0]);
  }

  const handleAddToCart = () => {
    addToCart({
      ...product,
      id: `${product.id}-${weight}`, // ওজনের উপর ভিত্তি করে আলাদা ID তৈরি করা হচ্ছে
      name: `${product.name} (${weight})`,
      price: price, // ডাইনামিক্যালি হিসাব করা প্রাইস
      image: activeImage,
      qty: qty, // ইউজারের সিলেক্ট করা কোয়ান্টিটি
    });
    setNotification(true);
    setTimeout(() => setNotification(false), 2000);
  };

  /* Data fetching API*/
  // const [products, setProduct] = useState(null); // প্রোডাক্ট ডাটা রাখার জন্য
  // const [loading, setLoading] = useState(true); // লোডিং স্টেট (শুরুতে true থাকবে)

  // useEffect(() => {
  //   // এখানে আপনার API কল হবে
  //   const fetchProduct = async () => {
  //     try {
  //       setLoading(true); // ডাটা আনা শুরু হলে লোডিং ট্রু
  //       const response = await fetch(`https://your-api.com/products/${id}`);
  //       const data = await response.json();

  //       setProduct(data);
  //     } catch (error) {
  //       console.error("Error fetching product:", error);
  //     } finally {
  //       setLoading(false); // ডাটা আসুক বা না আসুক, লোডিং শেষ
  //     }
  //   };

  //   fetchProduct();
  // }, [id]);

  return (
    <StatusHandler loading={false} product={products}>
      <section className="py-16 px-6 bg-gray-50">
        <div
          className="max-w-[1200px] mx-auto bg-[#f7faf9] rounded-2xl border border-gray-100
        shadow-[0_10px_24px_rgba(0,0,0,0.08)]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 p-6">
            <div className="rounded-2xl overflow-hidden">
              <img
                src={activeImage}
                alt={product.name}
                className="w-full h-[420px] object-cover"
                loading="lazy"
              />
              <div className="grid grid-cols-4 gap-2 p-3">
                {detailImages.map((src, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImage(src)}
                    className={`rounded-lg border ${
                      activeImage === src
                        ? "border-emerald-500 ring-2 ring-emerald-200"
                        : "border-gray-100"
                    }`}
                  >
                    <img
                      src={src}
                      alt={`${product.name} view ${idx + 1}`}
                      className="w-full cursor-pointer h-[70px] object-cover rounded-lg"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="relative">
              {/* close button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  const from = location.state?.from;

                  // যদি আগের লোকেশনটি অন্য কোনো প্রোডাক্ট পেজ না হয় (যেমন: /shop বা /home), তাহলে সেখানে যাবে
                  if (from && !from.includes("/product")) {
                    navigate(from);
                  } else {
                    // নাহলে সরাসরি হোম পেজে চলে যাবে
                    navigate("/");
                  }
                }}
                className="absolute cursor-pointer top-0 right-0 w-9 h-9 rounded-full border border-gray-200
                 text-gray-500 hover:text-gray-700 hover:border-gray-300"
                aria-label="Close"
              >
                <BiX className="w-4 h-4 mx-auto" />
              </button>

              {/* category Name */}
              <div className="text-[11px] uppercase tracking-wide text-emerald-700 font-semibold mb-2">
                {product.cat}
              </div>
              {/*Product name */}
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                {product.name}
              </h1>

              {/* rating */}
              <div className="flex items-center gap-2 text-[12px] text-gray-500 mb-4">
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <BiStar
                      key={i}
                      className="w-3 h-3"
                      fill={
                        i < Math.round(product.rating) ? "currentColor" : "none"
                      }
                    />
                  ))}
                </div>
                <span>({product.rating})</span>
                <span>{product.reviews} reviews</span>
              </div>

              {/* price */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[20px] font-semibold text-emerald-700">
                  Tk {price.toLocaleString()}
                </span>
                <span className="text-[13px] text-gray-400 line-through">
                  Tk {orig.toLocaleString()}
                </span>
                <span className="text-[11px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-semibold">
                  {discountPercent}% OFF
                </span>
              </div>

              {/* tags */}
              <div className="flex flex-wrap items-center gap-2 mb-5">
                <span className="text-[14px] text-gray-600 font-semibold">
                  Tag:
                </span>
                {product.tags?.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 text-[11px] border border-gray-200 rounded-full text-gray-700 flex
                    items-center justify-center"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* quantity selector */}
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="inline-flex items-center rounded-md overflow-hidden border border-emerald-700">
                  <button
                    type="button"
                    className="w-9 h-9 flex items-center cursor-pointer justify-center bg-emerald-700 text-white
                    text-[18px] leading-none hover:bg-emerald-800"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="w-12 text-center text-[14px] font-semibold text-gray-900 bg-white">
                    {qty}
                  </span>
                  <button
                    type="button"
                    className="w-9 h-9 flex items-center cursor-pointer justify-center bg-emerald-700 text-white
                    text-[18px] leading-none hover:bg-emerald-800"
                    onClick={() => setQty((q) => q + 1)}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
                <div className="inline-flex items-center gap-2">
                  <span className="text-[14px] text-gray-600 font-semibold">
                    Select Quantity :
                  </span>
                  <select
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="border border-gray-200 cursor-pointer rounded-md px-3 py-2 text-[12px] bg-white"
                  >
                    {weightOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="text-[12px] text-gray-500">
                  In stock: {product.stock}+
                </div>
              </div>

              {/* Share Section Added Here */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-[14px] font-semibold text-gray-700">
                  Share :
                </span>
                <button
                  type="button"
                  onClick={() => handleShare("facebook")}
                  className="w-8 h-8 rounded-full cursor-pointer bg-blue-50 text-blue-600 flex items-center
                  justify-center hover:bg-blue-100 transition-colors"
                  aria-label="Share on Facebook"
                >
                  <FaFacebook className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleShare("twitter")}
                  className="w-8 h-8 rounded-full cursor-pointer bg-sky-50 text-sky-500 flex items-center
                  justify-center hover:bg-sky-100 transition-colors"
                  aria-label="Share on Twitter"
                >
                  <BsTwitter className="w-4 h-4" />
                </button>
              </div>

              {/* Add to Cart Button wishlist */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="cursor-pointer flex-1 bg-emerald-800 text-white text-[13px] font-semibold px-5
                  py-3 rounded-xl hover:bg-emerald-900 transition-colors inline-flex items-center justify-center gap-2"
                >
                  <FaShoppingCart className="w-4 h-4" />
                  Add to Cart
                </button>
                <button
                  type="button"
                  className="cursor-pointer  w-12 h-12 rounded-xl border border-gray-200 text-gray-500
                  hover:text-gray-700 inline-flex items-center justify-center"
                  aria-label="Add to wishlist"
                >
                  <BiHeart className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="px-6 pb-6">
            <div className="rounded-2xl border border-gray-100 bg-white/50 p-5">
              <div className="flex items-center gap-2 border-b border-gray-200">
                <button
                  type="button"
                  onClick={() => setActiveTab("description")}
                  className={`cursor-pointer px-3 py-2 text-[12px] font-semibold ${
                    activeTab === "description"
                      ? "text-emerald-800 border-b-2 border-emerald-700"
                      : "text-gray-500"
                  }`}
                >
                  Description
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("reviews")}
                  className={`px-3 cursor-pointer  py-2 text-[12px] font-semibold ${
                    activeTab === "reviews"
                      ? "text-emerald-800 border-b-2 border-emerald-700"
                      : "text-gray-500"
                  }`}
                >
                  Reviews
                </button>
              </div>
              {/* Description Section */}
              {activeTab === "description" && (
                <p className="text-gray-600 text-[14px] leading-6 mt-4">
                  {product.desc}
                </p>
              )}
              {/* Reviews Section */}
              {activeTab === "reviews" && (
                <div className="mt-4 space-y-4">
                  {reviews.length === 0 && (
                    <p className="text-[13px] text-gray-500">
                      No reviews yet. Be the first to review this product.
                    </p>
                  )}

                  {reviews.map((r, idx) => (
                    <div
                      key={idx}
                      className="border border-gray-200 rounded-lg p-3"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[13px] font-semibold text-gray-900">
                          {r.name}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                            {ratingLabels[r.rating]}
                          </span>
                          <span className="text-[12px] text-amber-500">
                            {"★".repeat(r.rating)}
                          </span>
                        </div>
                      </div>
                      <p className="text-[13px] text-gray-600">{r.text}</p>
                    </div>
                  ))}

                  <form
                    className="border border-gray-200 rounded-lg p-3 space-y-3"
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (!reviewForm.name || !reviewForm.text) return;
                      setReviews((prev) => [reviewForm, ...prev]);
                      setReviewForm({ name: "", rating: 5, text: "" });
                    }}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Your name"
                        className="border border-gray-200 rounded-md px-3 py-2 text-[13px]"
                        value={reviewForm.name}
                        onChange={(e) =>
                          setReviewForm({ ...reviewForm, name: e.target.value })
                        }
                      />
                      <select
                        className="border cursor-pointer border-gray-200 rounded-md px-3 py-2 text-[13px]"
                        value={reviewForm.rating}
                        onChange={(e) =>
                          setReviewForm({
                            ...reviewForm,
                            rating: Number(e.target.value),
                          })
                        }
                      >
                        {[5, 4, 3, 2, 1].map((r) => (
                          <option key={r} value={r}>
                            {ratingLabels[r]}
                          </option>
                        ))}
                      </select>
                    </div>
                    <textarea
                      rows="3"
                      placeholder="Write your review..."
                      className="border border-gray-200 rounded-md px-3 py-2 text-[13px] w-full"
                      value={reviewForm.text}
                      onChange={(e) =>
                        setReviewForm({ ...reviewForm, text: e.target.value })
                      }
                    />
                    <button
                      type="submit"
                      className="bg-emerald-800 cursor-pointer text-white text-[12px] font-semibold px-4 py-2
                      rounded-md hover:bg-emerald-900"
                    >
                      Submit Review
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
          {/* Similar Products Section */}
          <div className="px-6 pb-8">
            <SimilarProducts
              currentProductId={product.id}
              category={product.cat}
            />
          </div>
        </div>

        {/* Notification Popup */}
        {notification && (
          <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50">
            <div className="bg-emerald-700 text-white px-3 py-2 rounded-lg shadow-2xl flex items-center
            justify-center gap-1 animate-in fade-in slide-in-from-right duration-300 max-w-md">
              <BiCheck className="text-4xl font-bold flex-shrink-0" />
              <p className="text-base font-semibold text-white">
                {notificationText}
              </p>
            </div>
          </div>
        )}
      </section>
    </StatusHandler>
  );
};

export default ProductDetails;

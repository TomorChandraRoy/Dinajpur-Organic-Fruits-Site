import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BiHeart, BiPlus, BiCheck } from "react-icons/bi";
import { useCart } from "../../context/CartContext";
import allProductsData from "../../utils/data/allProductsData.json";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { BeatLoader } from "react-spinners";

const AllProducts = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart } = useCart();
  const { badgeText, title, subtitle,notification: notificationText,productImages,} = allProductsData;
  const [notification, setNotification] = useState(false);

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosPublic.get("/getAllProducts");
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [axiosPublic]);

  const openModal = (id) => {
    console.log(id,"openModal");

    navigate(`/product/${id}`, { state: { from: location.pathname } });
  };

  const toggleWish = (id) => {
    console.log("toggleWish", id);
  };

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    // ডেটাবেজে সেভ করা ইমেজ থাকলে সেটি নেবে, না হলে ডিফল্ট ইমেজ দেখাবে
    const displayImage =
      Array.isArray(product.image) && product.image.length > 0
        ? product.image[0]
        : typeof product.image === "string"
          ? product.image
          : productImages[0];
    addToCart({ ...product, image: displayImage });
    setNotification(true);
    setTimeout(() => setNotification(false), 2000);
  };

  return (
    <section className="py-14 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-9">
          <div
            className="inline-block bg-var(--green-pale) text-var(--green) py-1 px-[13px] rounded-full text-[11.5px]
              font-semibold uppercase tracking-[0.5px] mb-2"
          >
            {badgeText}
          </div>

          <h2 className=" text-[clamp(24px,3.5vw,34px)] text-(--dark) mb-[6px]">
            {title}
          </h2>

          <p className="text-(--gray) text-[14.5px]">{subtitle}</p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <BeatLoader color="#047857" size={15} />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((p, index) => {
              const discount =
                p.orig > p.price
                  ? Math.round(((p.orig - p.price) / p.orig) * 100)
                  : 0;
              const displayImage =
                Array.isArray(p.image) && p.image.length > 0
                  ? p.image[0]
                  : typeof p.image === "string"
                    ? p.image
                    : productImages[index % productImages.length];
              const productId = p._id || p.id;

              return (
                <article
                  key={productId}
                  className="overflow-hidden rounded-2xl border border-[#d9d4c8] bg-white
                shadow-[0_10px_24px_rgba(17,24,39,0.04)] transition duration-200"
                >
                  <div
                    className="relative aspect-[0.96] cursor-pointer overflow-hidden"
                    style={{ background: p.bg || "#f4f8f3" }}
                    onClick={() => openModal(productId)}
                  >
                    <span
                      className={`absolute left-3 top-3 z-10 rounded-md px-2 py-1 text-[10px] font-extrabold
                      uppercase tracking-[0.14em] text-white ${
                        p.badge === "hot"
                          ? "bg-red-500"
                          : p.badge === "new"
                            ? "bg-green-600"
                            : "bg-orange-500"
                      }`}
                    >
                      {p.badge}
                    </span>
                    <button
                      type="button"
                      className="cursor-pointer absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center
                    rounded-full bg-white text-gray-600 shadow-sm transition hover:scale-105"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWish(productId);
                      }}
                    >
                      <BiHeart className="h-4 w-4" />
                    </button>
                    <img
                      src={displayImage}
                      alt={p.name}
                      className="h-full  w-full object-cover transition duration-300 hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4">
                    <p className="mb-1 text-[10px] font-extrabold uppercase text-green-700">
                      {p.cat}
                    </p>
                    <h3
                      className="mb-1 cursor-pointer text-sm font-semibold leading-5 text-gray-900 transition
                    hover:text-green-700"
                      onClick={() => openModal(productId)}
                    >
                      {p.name}
                    </h3>
                    <div className="mb-3 flex items-end justify-between gap-3">
                      <div>
                        <p className="text-lg font-extrabold text-green-700">
                          Tk {p.price?.toLocaleString()}
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-400 line-through">
                            Tk {p.orig?.toLocaleString()}
                          </span>
                          {discount > 0 && (
                            <span className="rounded bg-green-100 px-1.5 py-0.5 text-[10px] font-bold text-green-700">
                              {discount}% off
                            </span>
                          )}
                        </div>
                      </div>
                      <button
                        type="button"
                        className="cursor-pointer inline-flex items-center gap-1.5 rounded-lg bg-green-700 px-4 py-2
                      text-xs font-bold text-white transition hover:bg-green-800"
                        onClick={(e) => handleAddToCart(e, p)}
                      >
                        <BiPlus className="text-sm" />
                        Add To Cart
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {/* Notification Popup */}
      {notification && (
        <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50">
          <div
            className="bg-emerald-700 text-white px-3 py-2 rounded-lg shadow-2xl flex items-center justify-center
          gap-1 animate-in fade-in slide-in-from-right duration-300 max-w-md"
          >
            <BiCheck className="text-4xl font-bold flex-shrink-0" />
            <p className="text-base font-semibold text-white">
              {notificationText}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default AllProducts;

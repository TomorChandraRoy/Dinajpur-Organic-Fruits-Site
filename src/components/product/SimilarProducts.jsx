import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import similarProductsData from "../../utils/data/similarProductsData.json";
import { BiHeart, BiPlus, BiCheck } from "react-icons/bi";
import { useCart } from "../../context/CartContext";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const SimilarProducts = ({ currentProductId, category, limit = 4 }) => {

  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart } = useCart();
  const axiosPublic = useAxiosPublic();
  const [notification, setNotification] = useState(false);
  const [products, setProducts] = useState([]);
  const { title, notificationText, productImages } = similarProductsData;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosPublic.get("/getAllProducts");
        setProducts(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error("Error fetching similar products:", error);
        setProducts([]);
      }
    };

    fetchProducts();
  }, [axiosPublic]);

  const normalizedCategory = String(category || "")
    .trim()
    .toLowerCase();

  const items = useMemo(() => {
    if (!products || !Array.isArray(products) || !normalizedCategory) {
      return [];
    }

    return products
      .filter((p) => {
        const productCategory = String(p.cat || p.category || "")
          .trim()
          .toLowerCase();

        return (
          productCategory === normalizedCategory &&
          String(p._id || p.id) !== String(currentProductId)
        );
      })
      .slice(0, limit);
  }, [currentProductId, limit, normalizedCategory, products]);

  if (!normalizedCategory || items.length === 0) return null;


  return (
    <div>
      <h2 className="mb-10  text-gray-900 w-fit mx-auto  text-center border-b-2 border-[#2D6A4F] px-4 py-2  font-medium text-2xl">
        {title}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {items.map((p, index) => {
          const discount =
            p.orig > p.price
              ? Math.round(((p.orig - p.price) / p.orig) * 100)
              : 0;
          const productId = p._id || p.id;
          const displayImage =
            Array.isArray(p.image) && p.image.length > 0
              ? p.image[0]
              : typeof p.image === "string"
                ? p.image
                : productImages[index % productImages.length];

          return (
            <article
              key={productId}
              className="overflow-hidden rounded-2xl border border-[#d9d4c8] bg-white shadow-[0_10px_24px_rgba(17,24,39,0.04)] transition duration-200"
            >
              <div
                className="relative aspect-[0.96] cursor-pointer overflow-hidden"
                style={{ background: p.bg || "#f4f8f3" }}
                onClick={() =>
                  navigate(`/product/${productId}`, {
                    state: { from: location.pathname },
                  })
                }
              >
                <span
                  className={`absolute left-3 top-3 z-10 rounded-md px-2 py-1 text-[10px] font-extrabold uppercase tracking-[0.14em] text-white ${
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
                  className="cursor-pointer absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-600 shadow-sm transition hover:scale-105"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <BiHeart className="h-4 w-4" />
                </button>
                <img
                  src={displayImage}
                  alt={p.name}
                  className="h-full w-full object-cover transition duration-300 hover:scale-105"
                  loading="lazy"
                />
              </div>

              <div className="p-4">
                <p className="mb-1 text-[10px] font-extrabold uppercase text-green-700">
                  {p.cat}
                </p>
                <h3
                  className="mb-1 cursor-pointer text-sm font-semibold leading-5 text-gray-900 transition hover:text-green-700"
                  onClick={() =>
                    navigate(`/product/${productId}`, {
                      state: { from: location.pathname },
                    })
                  }
                >
                  {p.name}
                </h3>
                <div className="mb-3 flex items-end justify-between gap-3">
                  <div>
                    <p className="text-lg font-extrabold text-green-700">
                      Tk {p.price.toLocaleString()}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400 line-through">
                        Tk {p.orig.toLocaleString()}
                      </span>
                      <span className="rounded bg-green-100 px-1.5 py-0.5 text-[10px] font-bold text-green-700">
                        {discount}% off
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="cursor-pointer inline-flex items-center gap-1.5 rounded-lg bg-green-700 px-4 py-2 text-xs font-bold text-white transition hover:bg-green-800"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart({ ...p, image: displayImage });
                      setNotification(true);
                      setTimeout(() => setNotification(false), 2000);
                    }}
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

      {/* Notification Popup */}
      {notification && (
        <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50">
          <div className="bg-emerald-700 text-white px-3 py-2 rounded-lg shadow-2xl flex items-center justify-center gap-1 animate-in fade-in slide-in-from-right duration-300 max-w-md">
            <BiCheck className="text-4xl font-bold flex-shrink-0" />
            <p className="text-base font-semibold text-white">
              {notificationText}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SimilarProducts;

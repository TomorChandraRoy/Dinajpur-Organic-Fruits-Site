import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import banana from "../../assets/banna.png";
import mango from "../../assets/mango.webp";
import lychee from "../../assets/lechnu.jpg";
import longan from "../../assets/lachu.jpg";
import sublogo from "../../assets/sublogo.png";
import mangoo from "../../assets/mangoo.jpg";
import { products } from "../../utils/data/products";
import { BiHeart, BiPlus, BiCheck } from "react-icons/bi";
import { useCart } from "../../context/CartContext";

const AllProducts = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart } = useCart();
  const productImages = [mango, banana, lychee, longan, sublogo, mangoo];
  const [notification, setNotification] = useState(false);

  const openModal = (id) => {
    navigate(`/product/${id}`, { state: { from: location.pathname } });
  };

  const toggleWish = (id) => {
    console.log("toggleWish", id);
  };

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    const productImage = productImages[product.id % productImages.length];
    addToCart({ ...product, image: productImage });
    setNotification(true);
    setTimeout(() => setNotification(false), 2000);
  };

  return (
    <section className="py-14 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-9">
          <div className="inline-block bg-[var(--green-pale)] text-[var(--green)] py-1 px-[13px] rounded-full text-[11.5px] font-semibold uppercase tracking-[0.5px] mb-2">
            Best Sellers
          </div>

          <h2 className="font-['Playfair_Display',_serif] text-[clamp(24px,3.5vw,34px)] text-[var(--dark)] mb-[6px]">
            Most Popular Products
          </h2>

          <p className="text-[var(--gray)] text-[14.5px]">
            Loved by thousands of happy customers
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((p) => {
            const discount = Math.round(((p.orig - p.price) / p.orig) * 100);
            return (
              <article
                key={p.id}
                className="overflow-hidden rounded-2xl border border-[#d9d4c8] bg-white shadow-[0_10px_24px_rgba(17,24,39,0.04)] transition duration-200"
              >
                <div
                  className="relative aspect-[0.96] cursor-pointer overflow-hidden"
                  style={{ background: p.bg || "#f4f8f3" }}
                  onClick={() => openModal(p.id)}
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
                      toggleWish(p.id);
                    }}
                  >
                    <BiHeart className="h-4 w-4" />
                  </button>
                  <img
                    src={productImages[p.id % productImages.length]}
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
                    onClick={() => openModal(p.id)}
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
      </div>

      {/* Notification Popup */}
      {notification && (
        <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50">
          <div className="bg-emerald-700 text-white px-3 py-2 rounded-lg shadow-2xl flex items-center justify-center gap-1 animate-in fade-in slide-in-from-right duration-300 max-w-md">
            <BiCheck className="text-4xl font-bold flex-shrink-0" />
            <p className="text-base font-semibold text-white">
              Added to cart successfully
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default AllProducts;

import { useLocation, useNavigate } from "react-router-dom";
import banana from "../../assets/banna.png";
import mango from "../../assets/mango.webp";
import lychee from "../../assets/lechnu.jpg";
import longan from "../../assets/lachu.jpg";
import sublogo from "../../assets/sublogo.png";
import mangoo from "../../assets/mangoo.jpg";
import { products } from "../../data/products";
import { BiHeart, BiPlus } from "react-icons/bi";

const SimilarProducts = ({ currentProductId, category, limit = 4 }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const productImages = [mango, banana, lychee, longan, sublogo, mangoo];

  const items = products
    .filter((p) => p.cat === category && p.id !== currentProductId)
    .slice(0, limit);

  if (items.length === 0) return null;

  return (
    <div>

      <h2 className="mb-10  text-gray-900 w-fit mx-auto  text-center border-b-2 border-[#2D6A4F] px-4 py-2  font-medium text-2xl" >
      Similar Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {items.map((p) => {
          const discount = Math.round(((p.orig - p.price) / p.orig) * 100);
          return (
          <button
            key={p.id}
            type="button"
            onClick={() =>
              navigate(`/product/${p.id}`, { state: { from: location.pathname } })
            }
            className="text-left rounded-2xl border border-gray-200 bg-white overflow-hidden hover:shadow-[0_12px_26px_rgba(0,0,0,0.10)] transition"
          >
              <div className="relative">
                <img
                  src={productImages[p.id % productImages.length]}
                  alt={p.name}
                  className="w-full h-[180px] object-cover"
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 bg-amber-500 text-white text-[10px] font-semibold px-2 py-1 rounded-full">
                  {p.badge === "hot" ? "HOT" : p.badge === "new" ? "NEW" : "SALE"}
                </span>
                <span className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 border border-gray-200 flex items-center justify-center text-gray-600">
                  <BiHeart/>
                </span>
              </div>

              <div className="p-4">
                <div className="text-[10px] uppercase tracking-wide text-emerald-700 font-semibold mb-1">
                  {p.cat}
                </div>
                <h3 className="text-[13px] font-semibold text-gray-900 line-clamp-2 mb-3">
                  {p.name}
                </h3>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[13px] font-semibold text-emerald-700">
                      Tk {p.price.toLocaleString()}
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-gray-400">
                      <span className="line-through">Tk {p.orig.toLocaleString()}</span>
                      <span className="bg-emerald-50 text-emerald-700 px-1.5 py-[1px] rounded-full font-semibold">
                        {discount}% off
                      </span>
                    </div>
                  </div>
                  <button
                      type="button"
                      className="btn-add bg-[var(--green)] text-white border-0 px-[13px] py-[7px] rounded-full text-[11.5px] font-semibold cursor-pointer transition-all duration-200 hover:bg-[var(--green-dark)]"
                      // onClick={() => addToCart(p.id, 1)}
                    >
                      <span className="flex items-center justify-center gap-1">
                        <BiPlus className="w-4 h-4" /> Add To Cart
                      </span>
                  </button>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SimilarProducts;

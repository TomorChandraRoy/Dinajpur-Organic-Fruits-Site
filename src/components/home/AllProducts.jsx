import { useLocation, useNavigate } from "react-router-dom";
import banana from "../../assets/banna.png";
import mango from "../../assets/mango.webp";
import lychee from "../../assets/lechnu.jpg";
import longan from "../../assets/lachu.jpg";
import sublogo from "../../assets/sublogo.png";
import mangoo from "../../assets/mangoo.jpg";
import { products } from "../../utils/data/products";
import { BiHeart, BiPlus } from "react-icons/bi";

const AllProducts = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getBadgeClass = (badge) => {
    if (badge === "hot") return "badge badge-hot bg-[var(--red)]";
    if (badge === "new") return "badge badge-new bg-[var(--green)]";
    return "badge badge-sale bg-[var(--amber)]";
  };

  const openModal = (id) => {
    navigate(`/product/${id}`, { state: { from: location.pathname } });
  };

  const toggleWish = (id) => {
    console.log("toggleWish", id);
  };

  const addToCart = (id, qty) => {
    console.log("addToCart", id, qty);
  };

  const productImages = [mango, banana, lychee, longan, sublogo, mangoo];

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

        <div className="prod-grid grid grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-[18px]">
          {products.map((p) => {
            const disc = Math.round(((p.orig - p.price) / p.orig) * 100);
            return (
              <div
                key={p.id}
                className="prod-card bg-white border-[1.5px] border-[var(--border)] rounded-[14px] overflow-hidden transition-all duration-200 hover:shadow-[0_10px_32px_rgba(0,0,0,0.1)] hover:-translate-y-1"
              >
                <div
                  className="prod-img relative bg-[var(--green-pale)] aspect-square flex items-center justify-center text-[58px] cursor-pointer"
                  style={p.bg ? { background: p.bg } : undefined}
                  onClick={() => openModal(p.id)}
                >
                  <span
                    className={`${getBadgeClass(
                      p.badge,
                    )} absolute top-[10px] left-[10px] text-white text-[9.5px] font-bold px-[7px] py-[2px] rounded-[4px] uppercase`}
                  >
                    {p.badge === "hot"
                      ? "HOT"
                      : p.badge === "new"
                        ? "NEW"
                        : "SALE"}
                  </span>
                  <button
                    type="button"
                    className="wish-btn absolute top-[10px] right-[10px] w-[30px] h-[30px] bg-white rounded-full flex items-center justify-center text-[14px] border-0 cursor-pointer shadow-[0_2px_8px_rgba(0,0,0,0.1)] transition-transform hover:scale-[1.18]"
                    id={`wish-${p.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWish(p.id);
                    }}
                  >
                    <BiHeart className="w-4 h-4 text-gray-600" />
                  </button>
                  <img
                    src={productImages[p.id % productImages.length]}
                    alt={p.name}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="prod-info px-[14px] py-[13px]">
                  <div className="cat-label text-[10px] text-[var(--green)] font-semibold uppercase tracking-[0.5px] mb-[3px]">
                    {p.cat}
                  </div>
                  <h3
                    className="text-[13px] font-semibold mb-[5px] leading-[1.35] cursor-pointer hover:text-[var(--green)]"
                    onClick={() => openModal(p.id)}
                  >
                    {p.name}
                  </h3>
                  <div className="price-row flex items-center justify-between">
                    <div>
                      <div className="price-sale text-[16px] font-bold text-[var(--green)]">
                        Tk {p.price.toLocaleString()}
                      </div>
                      <div className="flex items-center gap-[6px]">
                        <span className="price-orig text-[11px] text-[var(--gray)] line-through">
                          Tk {p.orig.toLocaleString()}
                        </span>
                        <span className="text-[10px] bg-[#dcfce7] text-[#15803d] px-[5px] py-[1px] rounded-[4px] font-bold">
                          {disc}% off
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="btn-add bg-[var(--green)] text-white border-0 px-[13px] py-[7px] rounded-full text-[11.5px] font-semibold cursor-pointer transition-all duration-200 hover:bg-[var(--green-dark)]"
                      onClick={() => addToCart(p.id, 1)}
                    >
                      <span className="flex items-center justify-center gap-1">
                        <BiPlus className="w-4 h-4" /> Add To Cart
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AllProducts;

import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import products from "../../utils/data/products.json";
import categoriesData from "../../utils/data/categoriesData.json";

const Categories = () => {
  const navigate = useNavigate();

  const categories = useMemo(() => {
    const counts = products.reduce((acc, product) => {
      acc[product.cat] = (acc[product.cat] || 0) + 1;
      return acc;
    }, {});

    return categoriesData.categories.map((cat) => ({
      name: cat.name,
      count: counts[cat.name] || 0,
      image: cat.image,
    }));
  }, []);

  return (
    <section className="bg-[#F8F9FA] pb-16 pt-10">
      <div className="mx-auto max-w-[1200px] px-4 ">
        <div className="mb-6 text-center">
          <div className="mb-2 inline-block rounded-3xl border border-green-600 px-5 py-2 text-center text-[16px] font-semibold text-black">
            {categoriesData.badgeText}
          </div>
          <h2 className="mb-1 text-3xl font-bold">{categoriesData.title}</h2>
          <p className="text-gray-500">{categoriesData.subtitle}</p>
        </div>

        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3000 }}
          spaceBetween={14}
          breakpoints={{
            320: { slidesPerView: 2 },
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 6 },
          }}
          className="!py-[12px]"
        >
          {categories.map((cat) => (
            <SwiperSlide key={cat.name}>
              <button
                type="button"
                onClick={() =>
                  navigate(`/shop/${encodeURIComponent(cat.name)}`)
                }
                className="w-full cursor-pointer rounded-[18px] border border-gray-200 bg-white px-[14px] py-[20px] text-center shadow-[0_6px_18px_rgba(0,0,0,0.08)] transition-all hover:-translate-y-1 hover:border-green-600 hover:shadow-[0_12px_28px_rgba(0,0,0,0.12)]"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="mx-auto mb-3 h-[80px] w-[80px] rounded-xl border border-gray-200 object-cover"
                  loading="lazy"
                />
                <h3 className="text-[13px] font-semibold text-gray-900">
                  {cat.name}
                </h3>
                <span className="text-[10.5px] text-gray-500">
                  {cat.count} products
                </span>
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Categories;

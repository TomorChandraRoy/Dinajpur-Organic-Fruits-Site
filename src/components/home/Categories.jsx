import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import mango from "../../assets/mango.webp";
import banana from "../../assets/banna.png";
import lychee from "../../assets/lechnu.jpg";
import longan from "../../assets/lachu.jpg";
import sublogo from "../../assets/sublogo.png";

const categories = [
  { name: "Honey", image: sublogo, count: 4 },
  { name: "Ghee (Ghi)", image: mango, count: 2 },
  { name: "Dates", image: sublogo, count: 3 },
  { name: "Organic Oil", image: banana, count: 2 },
  { name: "Masala", image: longan, count: 3 },
  { name: "Nuts & Seeds", image: lychee, count: 2 },
  { name: "Tea/Coffee", image: banana, count: 2 },
  { name: "Pickle", image: longan, count: 2 },
  { name: "Mango", image: mango, count: 5 },
];

const  Categories =() =>{
// let cart = [];
// let wishlist = [];
// let currentUser = null;
// let orderHistory = [];
// let selectedPayment = 'cod';
// let selectedDelivery = 'standard';
// let deliveryFee = 60;
// let discount = 0;
// let currentModalProduct = null;
// let modalQtyVal = 1;
// let activeCatFilter = 'all';

// // ==================== PAGE NAV ====================
// function showPage(id) {
//   document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
//   const pg = document.getElementById('page-' + id);
//   if (pg) pg.classList.add('active');
//   window.scrollTo(0, 0);
//   closeSearchDropdown();
//   if (id === 'home') renderHomeProducts();
//   if (id === 'shop') renderShopProducts();
//   if (id === 'cart') renderCart();
//   if (id === 'order') renderOrderSummary();
//   if (id === 'account') updateDashboard();
// }

// function goAccount() {
//   if (!currentUser) showPage('login');
//   else showPage('account');
// }

// function filterCat(cat) {
//   activeCatFilter = cat;
//   document.getElementById('shop-title').textContent = cat + ' Products';
//   document.getElementById('shop-breadcrumb').textContent = cat;
//   // reset filter checkboxes
//   document.querySelectorAll('.cat-filter').forEach(cb => {
//     cb.checked = cb.value === cat;
//   });
//   showPage('shop');
//   applyFilters();
// }

  const filterCat = (cat) => {
    console.log(cat);
  };

  return (
    <section className="pb-16 pt-10 bg-[#F8F9FA]">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="text-center mb-6">
          <div className="text-[16px] font-semibold text-black px-5 py-2 border border-green-600 inline-block  text-center rounded-3xl mb-2">
            Browse by Category
          </div>
          <h2 className="text-3xl font-bold mb-1">
            Our Product Collections
          </h2>
          <p className="text-gray-500">
            Farm-fresh organic products for a healthier lifestyle
          </p>
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
          {categories.map((cat, i) => (
            <SwiperSlide key={i}>
              <div
                onClick={() => filterCat(cat.name)}
                className="bg-white border border-gray-200 rounded-[14px] py-[22px] px-[14px] text-center cursor-pointer transition-all shadow-[0_6px_18px_rgba(0,0,0,0.08)] hover:border-green-600 hover:-translate-y-1 hover:shadow-[0_10px_28px_rgba(0,0,0,0.12)]"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-[46px] h-[46px] mx-auto mb-2 object-cover rounded-full border border-gray-200"
                  loading="lazy"
                />

                <h3 className="text-[12.5px] font-semibold">
                  {cat.name}
                </h3>

                <span className="text-[10.5px] text-gray-500">
                  {cat.count} products
                </span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
export default Categories;
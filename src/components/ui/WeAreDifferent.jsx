// // import {  PlayCircle, MapPin, Truck, Award, Package, Clock } from 'lucide-react';

// // const WeAreDifferent = ({ data }) => {
// //   if (!data) return null;

// //   return (
// //     <section className="py-20 px-6 bg-gray-50/50">
// //       <div className="max-w-[1200px] mx-auto space-y-12">
// //         {/* Main Section */}
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8 lg:gap-12">

// //           {/* Left Side - Large Hero Image Card */}
// //           <div className="col-span-1 rounded-2xl overflow-hidden shadow-[0_10px_24px_rgba(0,0,0,0.08)]">
// //             <div className="h-full relative flex items-end">
// //               <img src={data.hero.image} alt={data.hero.title} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
// //               <div className="w-full relative z-10 p-10 pt-40 bg-gradient-to-t from-gray-950/80 to-transparent">
// //                 <div className="inline-block px-4 py-1.5 mb-5 bg-emerald-500/30 text-emerald-100 rounded-full text-sm font-semibold tracking-wider">
// //                   {data.hero.subtitle}
// //                 </div>
// //                 <h2 className="text-3xl font-bold text-white mb-3">
// //                   {data.hero.title}
// //                 </h2> {/* এখানে h2 ক্লোজ করা ঠিক হয়েছে */}
// //                 <p className="text-emerald-100/90 text-lg leading-relaxed">
// //                   {data.hero.text}
// //                 </p>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Right Side - Video and Feature Cards */}
// //           <div className="col-span-1 space-y-8">
// //             {/* Video Card */}
// //             <div className="rounded-2xl shadow-[0_10px_24px_rgba(0,0,0,0.08)] overflow-hidden aspect-video relative group flex items-center justify-center bg-gray-900 border border-gray-100">
// //               <img src={data.video.thumbnail} alt="Farm video thumbnail" className="absolute inset-0 w-full h-full object-cover opacity-90 transition-opacity group-hover:opacity-75" loading="lazy" />
// //               <button
// //                 type="button"
// //                 className="w-20 h-20 flex items-center justify-center bg-white/20 text-white rounded-full transition-all group-hover:scale-110 group-hover:bg-white/30"
// //                 aria-label="Play video"
// //               >
// //                 <PlayCircle className="w-12 h-12" />
// //               </button>
// //             </div>

// //             {/* Three Feature Cards */}
// //             <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
// //               {data.features.map((feature, index) => (
// //                 <div key={index} className="bg-[#f7faf9] p-8 rounded-2xl shadow-[0_8px_16px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col gap-4 text-center">
// //                   <div className="relative h-28 flex items-center justify-center">
// //                     <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[130px] font-extrabold text-emerald-100/50 leading-none">
// //                       {feature.id}
// //                     </div>
// //                     <div className="w-28 h-28 relative z-10 rounded-full border-[6px] border-white shadow-lg shadow-emerald-950/5 overflow-hidden">
// //                       <img src={feature.image} alt={feature.title} className="w-full h-full object-cover" loading="lazy" />
// //                     </div>
// //                   </div>
// //                   <h3 className="text-lg font-bold text-gray-900">
// //                     {feature.title}
// //                   </h3>
// //                   <p className="text-sm text-gray-600 leading-relaxed flex-grow">
// //                     {feature.text}
// //                   </p>
// //                 </div>
// //               ))}
// //             </div>
// //           </div> {/* Right Side Div ক্লোজ হলো */}
// //         </div> {/* Main Grid Div ক্লোজ হলো */}

// //         {/* Stats Section */}
// //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 bg-[#f7faf9] p-8 rounded-3xl border border-emerald-100/50 shadow-[0_10px_20px_rgba(0,0,0,0.06)] text-center">
// //           {data.stats.map((stat, index) => (
// //             <div key={index} className="p-6">
// //               {index === 0 && <Award className="w-8 h-8 mx-auto mb-4 text-emerald-700" />}
// //               {index === 1 && <MapPin className="w-8 h-8 mx-auto mb-4 text-emerald-700" />}
// //               {index === 2 && <Award className="w-8 h-8 mx-auto mb-4 text-emerald-700" />}
// //               {index === 3 && <Truck className="w-8 h-8 mx-auto mb-4 text-emerald-700" />}
// //               <p className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</p>
// //               <p className="text-sm text-emerald-900 font-medium">{stat.label}</p>
// //             </div>
// //           ))}
// //         </div>
// //       </div> {/* Max-width container ক্লোজ হলো */}
// //     </section>
// //   );
// // };

// // export default WeAreDifferent;

// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Autoplay, Pagination } from 'swiper/modules';
// import { Award, MapPin, Truck, PlayCircle } from 'lucide-react';

// // Swiper core styles ইমপোর্ট করতে ভুলবেন না
// import 'swiper/css';
// import 'swiper/css/pagination';

// // Swiper pagination ডটগুলোর কালার Emerald করার জন্য কাস্টম CSS
// const swiperCustomStyles = `
//   .swiper-pagination-bullet {
//     background: #a7f3d0; /* emerald-200 */
//     opacity: 1;
//   }
//   .swiper-pagination-bullet-active {
//     background: #047857; /* emerald-700 */
//   }
// `;

// const WeAreDifferent = ({ data }) => {
//   if (!data) return null;

//   return (
//     <>
//       {/* কাস্টম স্টাইল ট্যাগ */}
//       <style>{swiperCustomStyles}</style>

//       <section className="py-20 px-6 bg-gray-50/50">
//         <div className="max-w-[1200px] mx-auto space-y-12">

//           {/* Main Section: Hero Image & Swiper Area */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">

//             {/* Left Side - Large Hero Image Card (01) */}
//             <div className="col-span-1 rounded-2xl overflow-hidden shadow-[0_10px_24px_rgba(0,0,0,0.08)]">
//               <div className="h-full relative flex items-end">
//                 <img src={data.hero.image} alt={data.hero.title} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
//                 <div className="w-full relative z-10 p-10 pt-40 bg-gradient-to-t from-gray-950/80 to-transparent">
//                   <div className="inline-block px-4 py-1.5 mb-5 bg-emerald-500/30 text-emerald-100 rounded-full text-sm font-semibold tracking-wider">
//                     {data.hero.subtitle}
//                   </div>
//                   <h2 className="text-3xl font-bold text-white mb-3">
//                     {data.hero.title}
//                   </h2>
//                   <p className="text-emerald-100/90 text-lg leading-relaxed">
//                     {data.hero.text}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Right Side - Video and Swiper Feature Cards */}
//             <div className="col-span-1 space-y-8">

//               {/* Video Card */}
//               <div className="rounded-2xl shadow-[0_10px_24px_rgba(0,0,0,0.08)] overflow-hidden aspect-video relative group flex items-center justify-center bg-gray-900 border border-gray-100">
//                 <img src={data.video.thumbnail} alt="Farm video thumbnail" className="absolute inset-0 w-full h-full object-cover opacity-90 transition-opacity group-hover:opacity-75" loading="lazy" />
//                 <button
//                   type="button"
//                   className="w-20 h-20 flex items-center justify-center bg-white/20 text-white rounded-full transition-all group-hover:scale-110 group-hover:bg-white/30"
//                   aria-label="Play video"
//                 >
//                   <PlayCircle className="w-12 h-12" />
//                 </button>
//               </div>

//               {/* Feature Cards with Swiper Auto Scroll (02, 03, 04) */}
//               <div className="py-2 relative">
//                 <Swiper
//                   modules={[Autoplay, Pagination]}
//                   spaceBetween={24} // কার্ডগুলোর মাঝখানের গ্যাপ
//                   slidesPerView={1} // মোবাইলে ১টি দেখাবে
//                   loop={true} // ইনফিনিট লুপ
//                   autoplay={{
//                     delay: 3000, // ৩ সেকেন্ড পর পর স্লাইড হবে
//                     disableOnInteraction: false, // ইউজার টাচ করলেও অটো-প্লে বন্ধ হবে না
//                   }}
//                   pagination={{
//                     clickable: true, // ডটে ক্লিক করা যাবে
//                     dynamicBullets: true, // ডটগুলো ডাইনামিকলি বড়-ছোট হবে
//                   }}
//                   breakpoints={{
//                     // রেসপন্সিভ ব্রেকপয়েন্ট
//                     640: { slidesPerView: 2 }, // ট্যাবলেটে ২টি
//                     1024: { slidesPerView: 3 }, // ডেক্সটপে ৩টি
//                   }}
//                   className="!pb-12" // Pagination ডটগুলোর জন্য নিচে জায়গা রাখা
//                 >
//                   {data.features.map((feature, index) => (
//                     <SwiperSlide key={index} className="h-auto">
//                       <div className="bg-[#f7faf9] p-8 rounded-2xl shadow-[0_8px_16px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col gap-4 text-center h-full">
//                         <div className="relative h-28 flex items-center justify-center mb-2">
//                           {/* Number Overlay - সেম এজ ইমেজ */}
//                           <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[110px] font-extrabold text-emerald-100/60 leading-none">
//                             {feature.id}
//                           </div>
//                           {/* Circle Image with white border - সেম এজ ইমেজ */}
//                           <div className="w-28 h-28 relative z-10 rounded-full border-[6px] border-white shadow-lg overflow-hidden flex items-center justify-center bg-white">
//                             <img
//                               src={feature.image}
//                               alt={feature.title}
//                               className="w-full h-full object-contain p-2" // অবজেক্ট-কন্টেইন দিয়ে ইমেজ পুরো দেখানো
//                             />
//                           </div>
//                         </div>

//                         <h3 className="text-lg font-bold text-gray-900 leading-tight">
//                           {feature.title}
//                         </h3>
//                         <p className="text-sm text-gray-600 leading-relaxed flex-grow">
//                           {feature.text}
//                         </p>
//                       </div>
//                     </SwiperSlide>
//                   ))}
//                 </Swiper>
//               </div>

//             </div>
//           </div>

//           {/* Stats Section at the bottom */}
//           <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 bg-[#f7faf9] p-8 rounded-3xl border border-emerald-100/50 shadow-[0_10px_20px_rgba(0,0,0,0.06)] text-center">
//             {data.stats.map((stat, index) => (
//               <div key={index} className="p-6 col-span-1">
//                   {index === 0 && <Award className="w-8 h-8 mx-auto mb-4 text-emerald-700" />}
//                   {index === 1 && <MapPin className="w-8 h-8 mx-auto mb-4 text-emerald-700" />}
//                   {index === 2 && <Award className="w-8 h-8 mx-auto mb-4 text-emerald-700" />}
//                   {index === 3 && <Truck className="w-8 h-8 mx-auto mb-4 text-emerald-700" />}

//                 <p className="text-3xl font-bold text-gray-900 mb-2">
//                   {stat.value}
//                 </p>
//                 <p className="text-sm text-emerald-900 font-medium">
//                   {stat.label}
//                 </p>
//               </div>
//             ))}
//           </div>

//         </div>
//       </section>
//     </>
//   );
// };

// export default WeAreDifferent;

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Award, MapPin, Truck, PlayCircle, Package } from "lucide-react";

// Swiper CSS ইমপোর্ট (অবশ্যই লাগবে)
import "swiper/css";
import "swiper/css/pagination";

const swiperCustomStyles = `
  .swiper-pagination-bullet { background: #a7f3d0; opacity: 1; }
  .swiper-pagination-bullet-active { background: #047857; }
  .swiper { padding-bottom: 50px !important; }
`;

const WeAreDifferent = ({ data }) => {
  // ডাটা না থাকলে এরর হ্যান্ডেলিং
  if (!data || !data.features) {
    return (
      <div className="text-center py-20 text-emerald-800">
        Loading Section Data...
      </div>
    );
  }

  return (
    <>
      <style>{swiperCustomStyles}</style>
      <section className="py-20 px-6 bg-gray-50/50 overflow-hidden">
      <h2 className="text-3xl font-bold text-center uppercase border-b-2 border-emerald-700 w-fit mx-auto text-gray-900 mb-12">
        WHY WE ARE DIFFERENT
      </h2>
        <div className="max-w-[1200px] mx-auto space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Left Side: Hero Card 01 */}
            <div className="relative rounded-3xl overflow-hidden shadow-xl min-h-[450px] flex items-end ">
              <img
                src={data.hero.image}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="relative z-10 p-10 bg-gradient-to-t from-black/80 via-black/20 to-transparent w-full">
                <span className="inline-block px-4 py-1.5 mb-4 bg-emerald-700 text-white rounded-full text-sm font-bold">
                  {data.hero.subtitle}
                </span>
                <h2 className="text-3xl font-bold text-white mb-3">
                  {data.hero.title}
                </h2>
                <p className="text-emerald-50/90 text-lg leading-relaxed">
                  {data.hero.text}
                </p>
              </div>
            </div>

            {/* Right Side: Video + Swiper (02, 03, 04) */}
            <div className="flex flex-col gap-8 min-w-0">
              {" "}
              {/* min-w-0 is important for Swiper inside flex */}
              {/* Video Card */}
              {/* <div className="relative rounded-3xl overflow-hidden aspect-video shadow-lg group">
                <img
                  src={data.video.thumbnail}
                  alt=""
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <PlayCircle className="w-16 h-16 text-white opacity-90 cursor-pointer" />
                </div>
              </div> */}
{/* Video Card - সরাসরি ইউটিউব ভিডিও দেখাবে */}
<div className="relative rounded-3xl overflow-hidden aspect-video shadow-lg group bg-black">
  <iframe
    className="w-full h-full"
    src={`https://www.youtube.com/embed/${data.video.id}?rel=0&modestbranding=1`}
    title="YouTube video player"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
  ></iframe>
</div>

              {/* Swiper Slider */}
              <div className="w-full">
                <Swiper
                  modules={[Autoplay, Pagination]}
                  spaceBetween={20}
                  slidesPerView={1}
                  loop={true}
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                  pagination={{ clickable: true }}
                  breakpoints={{
                    640: { slidesPerView: 2
                     },
                    1024: { slidesPerView: 2
                    }, // ডানপাশে ২টা দেখালে সুন্দর লাগে
                  }}
                >
                  {data.features.map((feature, index) => (
<SwiperSlide key={index} className="pt-12 pb-4">
  <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center text-center h-full relative">

    {/* ১. ছোট গোল সার্কেল (কার্ডের একদম উপরে সেন্টারে) - এখন এখানে নম্বর থাকবে */}
    <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-20">
      <div className=" rounded-full px-4 py-1.5 shadow-lg bg-emerald-700 flex items-center justify-center ">
        <span className="text-sm font-bold  text-white">
          {feature.id}
        </span>
      </div>
    </div>

    {/* ২. ইমেজ সেকশন (নম্বরের জায়গায় এখন ইমেজটি বড় করে দেখাবে) */}
    <div className="relative w-full flex justify-center mt-6 mb-4">
      <div className="w-32 h-32 transform scale-110">
         <img
          src={feature.image}
          alt={feature.title}
          className="w-full h-full object-cover border-2 border-emerald-700 "
        />
      </div>
    </div>

    {/* ৩. টেক্সট কন্টেন্ট */}
    <div className="relative z-10">
      <h3 className="text-lg font-extrabold text-gray-900 leading-tight mb-2">
        {feature.title}
      </h3>
      <p className="text-sm text-gray-500 leading-relaxed px-2">
        {feature.text}
      </p>
    </div>

  </div>
</SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {data.stats.map((stat, index) => (
              <div
                key={index}
                className="bg-[#f0f9f6] p-3 rounded-2xl text-center border border-emerald-100"
              >
                <div className="mb-3 flex justify-center text-emerald-700">
                  {index === 0 && <Award size={28} />}
                  {index === 1 && <MapPin size={28} />}
                  {index === 2 && <Package size={28} />}
                  {index === 3 && <Truck size={28} />}
                </div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-emerald-700 font-bold uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default WeAreDifferent;

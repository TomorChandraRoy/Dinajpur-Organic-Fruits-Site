import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// Swiper CSS ইমপোর্ট (অবশ্যই লাগবে)
import "swiper/css";
import "swiper/css/pagination";
import { BiAward, BiMapPin, BiPackage } from "react-icons/bi";
import { BsTruck } from "react-icons/bs";
import weAreDifferentData from "../../utils/data/weAreDifferent.json";

const swiperCustomStyles = `
  .swiper-pagination-bullet { background: #a7f3d0; opacity: 1; }
  .swiper-pagination-bullet-active { background: #047857; }
  .swiper { padding-bottom: 50px !important; }
`;

const WeAreDifferent = () => {
  const data = weAreDifferentData;

  return (
    <>
      <style>{swiperCustomStyles}</style>
      <section className=" px-6 bg-gray-50/50 overflow-hidden">
        <h2
          className="text-3xl font-bold text-center uppercase border-b-2 border-emerald-700 w-fit
        mx-auto text-gray-900 mb-12"
        >
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
              <div className="relative z-10 p-10 bg-linear-to-t from-black/80 via-black/20 to-transparent w-full">
                <span
                  className="inline-block px-4 py-1.5 mb-4 bg-emerald-700 text-white rounded-full
                text-sm font-bold"
                >
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
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;
                  picture-in-picture; web-share"
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
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 2 }, // ডানপাশে ২টা দেখালে সুন্দর লাগে
                  }}
                >
                  {data.features.map((feature, index) => (
                    <SwiperSlide key={index} className="pt-12 pb-4">
                      <div
                        className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex
                      flex-col items-center text-center h-full relative"
                      >
                        {/* ১. ছোট গোল সার্কেল (কার্ডের একদম উপরে সেন্টারে) - এখন এখানে নম্বর থাকবে */}
                        <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-20">
                          <div
                            className=" rounded-full px-4 py-1.5 shadow-lg bg-emerald-700 flex
                          items-center justify-center "
                          >
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
                  {index === 0 && <BiAward size={28} />}
                  {index === 1 && <BiMapPin size={28} />}
                  {index === 2 && <BiPackage size={28} />}
                  {index === 3 && <BsTruck size={28} />}
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

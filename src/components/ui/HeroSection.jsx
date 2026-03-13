//max-w-[1280px]
const HeroSection = () => {
  return (
    <section className="bg-[linear-gradient(135deg,#1b4332_0%,#2d6a4f_50%,#40916c_100%)] relative overflow-hidden min-h-[480px] flex items-center">
      <div className="max-w-[1280px] mx-auto py-[60px] px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-[40px] items-center w-full relative z-[1]">
        {/* Left Content */}
        <div>
          <div className="inline-block bg-[#f59e0b] text-white py-[5px] px-[14px] rounded-[50px] text-[12px] font-semibold tracking-[0.5px] mb-[16px] uppercase">
            🌿 100% Organic & Natural
          </div>

          <h1 className="font-serif text-[clamp(30px,6vw,52px)] text-white leading-[1.2] mb-[16px]">
            Safe Food <span className="text-[#ffd166]">Delivered</span> to Your
            Doorstep
          </h1>

          <p className="text-[rgba(255,255,255,.8)] text-[15px] sm:text-[16px] mb-[24px] sm:mb-[28px] max-w-[520px] leading-[1.7]">
            দিনাজপুর অর্গানিক ফ্রুইটস থেকে পান সেরা মানের অর্গানিক খাদ্যপণ্য — বিশুদ্ধ মধু,
            খাঁটি ঘি, লিচু ,কলা এবং আরও অনেক কিছু।
          </p>

          <div className="flex gap-[12px] flex-wrap">
            <a
              href="#products"
              className="bg-[#f59e0b] text-white border-none py-[12px] sm:py-[13px] px-[24px] sm:px-[28px] rounded-[50px] text-[14px] sm:text-[15px] font-semibold cursor-pointer transition-all duration-200 inline-block no-underline hover:bg-[#c95e00] hover:-translate-y-[1px]"
            >
              🛒 Shop Now
            </a>

            <a
              href="#"
              className="bg-transparent text-white border-[2px] border-[rgba(255,255,255,.5)] py-[12px] sm:py-[13px] px-[24px] sm:px-[28px] rounded-[50px] text-[14px] sm:text-[15px] font-semibold cursor-pointer transition-all duration-200 inline-block no-underline hover:border-white hover:bg-[rgba(255,255,255,.1)]"
            >
              📋 View All Products
            </a>
          </div>
        </div>

        {/* Right Visual */}
        <div className="grid grid-cols-2 gap-[14px]">
          <div className="bg-[rgba(255,255,255,.12)]  border border-[rgba(255,255,255,.2)] rounded-[16px]  text-center transition-transform duration-300 cursor-pointer hover:-translate-y-[4px] row-span-2 flex flex-col justify-center">
            {/* <span className="text-[36px] sm:text-[40px] block mb-[8px]">🍯</span>//p-[18px] sm:p-[20px] */}
            <img src="/src/assets/banna.png" alt="Dinajpur Banna" className="w-full h-full  border border-[rgba(255,255,255,.2)] rounded-[16px] block"/>
            {/* <h3 className="text-white text-[14px] sm:text-[15px] font-semibold mb-[4px]">
              Dinajpur Banna
            </h3>
            <p className="text-[rgba(255,255,255,.7)] text-[11px] sm:text-[12px]">
              Pure Forest Honey
            </p>
            <div className="text-[#ffd166] text-[15px] sm:text-[16px] font-bold mt-[8px]">
              Tk 2,200
            </div> */}
          </div>

          <div className="bg-[rgba(255,255,255,.12)] backdrop-blur-[10px] border border-[rgba(255,255,255,.2)] rounded-[16px]  text-center transition-transform duration-300 cursor-pointer hover:-translate-y-[4px]">
            {/* <span className="text-[36px] sm:text-[40px] block mb-[8px]">🧈</span> */}
             <img src="/src/assets/mango.webp" alt="Dinajpur Banna" className="w-full h-full  border border-[rgba(255,255,255,.2)] rounded-[16px] block"/>
            {/* <h3 className="text-white text-[14px] sm:text-[15px] font-semibold mb-[4px]">
              Gawa Ghee
            </h3>
            <p className="text-[rgba(255,255,255,.7)] text-[11px] sm:text-[12px]">
              গাওয়া ঘি ১কেজি
            </p>
            <div className="text-[#ffd166] text-[15px] sm:text-[16px] font-bold mt-[8px]">
              Tk 1,710
            </div> */}
          </div>

          <div className="bg-[rgba(255,255,255,.12)] backdrop-blur-[10px] border border-[rgba(255,255,255,.2)] rounded-[16px]  text-center transition-transform duration-300 cursor-pointer hover:-translate-y-[4px]">
            {/* <span className="text-[36px] sm:text-[40px] block mb-[8px]">🌴</span> */}
            <img src="/src/assets/lachu.jpg" alt="Dinajpur Banna" className="w-full h-full  border border-[rgba(255,255,255,.2)] rounded-[16px] block"/>
            {/* <h3 className="text-white text-[14px] sm:text-[15px] font-semibold mb-[4px]"> */}
              {/* Ajwa Dates
            </h3>
            <p className="text-[rgba(255,255,255,.7)] text-[11px] sm:text-[12px]">
              Premium Medina
            </p>
            <div className="text-[#ffd166] text-[15px] sm:text-[16px] font-bold mt-[8px]">
              Tk 2,090
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

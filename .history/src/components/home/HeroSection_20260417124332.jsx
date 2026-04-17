import heroData from "../../utils/data/heroData.json";

//max-w-[1280px]
const HeroSection = () => {
  const {badgeText,titleStart,titleHighlight,titleEnd,description, buttons,images,} = heroData;

  return (
    <section className="bg-[linear-gradient(135deg,#1b4332_0%,#2d6a4f_50%,#40916c_100%)] relative overflow-hidden min-h-[480px] flex items-center">
      <div className="max-w-[1280px] mx-auto py-[60px] px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-[40px] items-center w-full relative z-1">
        {/* Left Content */}
        <div>
          <div className="inline-block bg-[#f59e0b] text-white py-[5px] px-[14px] rounded-[50px] text-[12px] font-semibold tracking-[0.5px] mb-[16px] uppercase">
            {badgeText}
          </div>

          <h1 className="font-serif text-[clamp(30px,6vw,52px)] text-white leading-[1.2] mb-[16px]">
            {titleStart}
            <span className="text-[#ffd166]">{titleHighlight}</span>
            {titleEnd}
          </h1>

          <p className="text-[rgba(255,255,255,.8)] text-[15px] sm:text-[16px] mb-[24px] sm:mb-[28px] max-w-[520px] leading-[1.7]">
            {description}
          </p>

          <div className="flex gap-[12px] flex-wrap">
            <a
              href={buttons.primary.link}
              className="bg-[#f59e0b] text-white border-none py-[12px] sm:py-[13px] px-[24px] sm:px-[28px] rounded-[50px] text-[14px] sm:text-[15px] font-semibold cursor-pointer transition-all duration-200 inline-block no-underline hover:bg-[#c95e00] hover:-translate-y-px"
            >
              {buttons.primary.text}
            </a>

            <a
              href={buttons.secondary.link}
              className="bg-transparent text-white border-2px border-[rgba(255,255,255,.5)] py-[12px] sm:py-[13px] px-[24px] sm:px-[28px] rounded-[50px] text-[14px] sm:text-[15px] font-semibold cursor-pointer transition-all duration-200 inline-block no-underline hover:border-white hover:bg-[rgba(255,255,255,.1)]"
            >
              {buttons.secondary.text}
            </a>
          </div>
        </div>

        {/* Right Visual */}
        <div className="grid grid-cols-2 gap-[14px]">
          <div className="bg-[rgba(255,255,255,.12)]  border border-[rgba(255,255,255,.2)] rounded-[16px]  text-center transition-transform duration-300 cursor-pointer hover:-translate-y-[4px] row-span-2 flex flex-col justify-center">
            <img
              src={images[0].src}
              alt={images[0].alt}
              className="w-full h-full  border border-[rgba(255,255,255,.2)] rounded-[16px] block"
            />
          </div>

          <div className="bg-[rgba(255,255,255,.12)] backdrop-blur-[10px] border border-[rgba(255,255,255,.2)] rounded-[16px]  text-center transition-transform duration-300 cursor-pointer hover:-translate-y-[4px]">
            <img
              src={images[1].src}
              alt={images[1].alt}
              className="w-full h-full  border border-[rgba(255,255,255,.2)] rounded-[16px] block"
            />
          </div>

          <div className="bg-[rgba(255,255,255,.12)] backdrop-blur-[10px] border border-[rgba(255,255,255,.2)] rounded-[16px]  text-center transition-transform duration-300 cursor-pointer hover:-translate-y-[4px]">
            <img
              src={images[2].src}
              alt={images[2].alt}
              className="w-full h-full  border border-[rgba(255,255,255,.2)] rounded-[16px] block"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

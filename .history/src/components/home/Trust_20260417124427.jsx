import trustData from "../../utils/data/trustData.json";

export default function Trust() {
  return (
    <div className="hidden sm:block bg-[#F8F9FA] py-[32px] px-[24px]">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[20px]">
        {trustData.trustItems.map((item) => (
          <div
            key={item.title}
            className="flex flex-col items-center justify-center text-center gap-[16px] bg-white border border-[#e6efe6] rounded-[16px] px-[24px] py-[24px] shadow-[0_6px_20px_rgba(47,94,59,0.08)] transition-transform duration-300 hover:-translate-y-1"
          >
            <img
              src={"data:image/svg+xml;utf8," + encodeURIComponent(item.svg)}
              alt={item.alt}
              className="w-[52px] h-[52px] shrink-0 object-contain"
              loading="lazy"
            />
            <span className="whitespace-nowrap text-[19px] font-bold text-[#20412a] leading-[1.3]">
              {item.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

const trustItems = [
  {
    title: "Free Delivery Above Tk 999",
    icon:
      "data:image/svg+xml;utf8," +
      encodeURIComponent(
        `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'>
          <rect x='6' y='20' width='36' height='20' rx='4' fill='#f3f7f2' stroke='#2f5e3b' stroke-width='3'/>
          <rect x='42' y='26' width='16' height='14' rx='3' fill='#dff0e1' stroke='#2f5e3b' stroke-width='3'/>
          <circle cx='20' cy='46' r='6' fill='#2f5e3b'/>
          <circle cx='48' cy='46' r='6' fill='#2f5e3b'/>
        </svg>`
      ),
    alt: "Delivery truck",
  },
  {
    title: "100% Authentic Products",
    icon:
      "data:image/svg+xml;utf8," +
      encodeURIComponent(
        `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'>
          <circle cx='32' cy='32' r='22' fill='#e7f6ed' stroke='#2f5e3b' stroke-width='3'/>
          <path d='M20 33l7 7 17-18' fill='none' stroke='#2f5e3b' stroke-width='4' stroke-linecap='round' stroke-linejoin='round'/>
        </svg>`
      ),
    alt: "Verified badge",
  },
  {
    title: "Easy Return Policy",
    icon:
      "data:image/svg+xml;utf8," +
      encodeURIComponent(
        `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'>
          <path d='M24 16h16a14 14 0 010 28H26' fill='none' stroke='#2f5e3b' stroke-width='4' stroke-linecap='round'/>
          <path d='M26 32l-8-8v16z' fill='#2f5e3b'/>
        </svg>`
      ),
    alt: "Return arrow",
  },
  {
    title: "Secure Payment",
    icon:
      "data:image/svg+xml;utf8," +
      encodeURIComponent(
        `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'>
          <rect x='16' y='28' width='32' height='24' rx='4' fill='#e7f6ed' stroke='#2f5e3b' stroke-width='3'/>
          <path d='M22 28v-6a10 10 0 0120 0v6' fill='none' stroke='#2f5e3b' stroke-width='3'/>
          <circle cx='32' cy='40' r='4' fill='#2f5e3b'/>
        </svg>`
      ),
    alt: "Secure lock",
  },
];

export default function Trust() {
  return (
    <div className="hidden sm:block bg-[#F8F9FA]  py-[18px] px-[24px]">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[16px]">
        {trustItems.map((item) => (
          <div
            key={item.title}
            className="flex items-center justify-center text-center gap-[12px] bg-white border border-[#e6efe6] rounded-[12px] px-[14px] py-[12px] shadow-[0_4px_14px_rgba(47,94,59,0.08)]"
          >
            <img
              src={item.icon}
              alt={item.alt}
              className="w-[36px] h-[36px] object-contain"
              loading="lazy"
            />
            <span className="text-[18px]  font-semibold text-[#20412a] leading-[1.2]">
              {item.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function StatCards({ stats }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
      {stats.map((s, i) => (
        <div
          key={i}
          className="group bg-white px-4 sm:px-6 py-5 sm:py-7 rounded-xl
          shadow-[0_18px_45px_-22px_rgba(22,101,52,0.3)] border border-green-100/60 flex items-center
          gap-4 sm:gap-5 transition-all duration-300 hover:-translate-y-1
          hover:shadow-[0_24px_55px_-24px_rgba(22,101,52,0.38)]"
        >
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center
          text-[1.6rem] sm:text-[2rem] bg-gradient-to-br from-green-100 via-lime-50 to-orange-50
           text-green-700 shadow-inner shadow-white/80 ring-1 ring-green-100 group-hover:scale-105
           transition-transform duration-300 shrink-0">
            {s.icon}
          </div>
          <div className="min-w-0">
            <p className="text-gray-400 text-[11px] font-extrabold uppercase leading-none mb-2">
              {s.title}
            </p>
            <h3 className="text-2xl sm:text-3xl font-black text-gray-800 tracking-tight leading-none
            break-words">
              {s.value}
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
}

import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../layout/Navbar";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="sticky top-0 z-[100]">
        {/* Mobile/Tablet Header */}
        <div className="lg:hidden bg-white border-b border-[var(--border)] shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
          <div className="max-w-[1280px] mx-auto px-4 py-[12px]">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                className="w-10 h-10 rounded-lg border border-[var(--border)] flex items-center justify-center"
                aria-label="Open menu"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M3 6h18M3 12h18M3 18h18" stroke="#1f2d26" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>

              <Link to="/" className="flex items-center gap-[8px] no-underline">
                <div className="w-9 h-9 rounded-[8px] flex items-center justify-center text-[20px]">
                  <img src="/src/assets/sublogo.png" alt="logo" className="w-full h-full object-cover" />
                </div>
                <div className="leading-tight">
                  <strong className="block text-[15px] text-[var(--green)] font-['Playfair_Display']">
                    Dinajpur Organic Fruits
                  </strong>
                  <span className="block text-[10px] text-[var(--gray)]">বিশুদ্ধতা ও স্বাদের নিশ্চয়তা</span>
                </div>
              </Link>

              <a href="#" className="no-underline text-[var(--dark)] text-[12px] flex flex-col items-center gap-[2px] relative">
                <span className="text-[20px]">🛒</span>
                <span>Cart</span>
                <span className="absolute top-[-6px] right-[-6px] bg-[var(--amber)] text-white rounded-full w-[16px] h-[16px] text-[10px] flex items-center justify-center font-bold">
                  0
                </span>
              </a>
            </div>

            <div className="mt-3 border-2 border-[var(--border)] rounded-full overflow-hidden transition-colors focus-within:border-[var(--green)] flex">
              <input
                type="text"
                placeholder="Search: Honey, Ghee, Dates, Oil..."
                className="flex-1 border-0 outline-none py-[9px] px-[16px] text-[13px] bg-[#f9fafb] font-inherit"
              />
              <button className="bg-[var(--green)] border-0 px-[16px] cursor-pointer text-white text-[15px]">
                <i className="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Header */}
        <header className="hidden lg:block bg-white border-b border-[var(--border)] shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
          <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row md:items-center md:justify-between px-4 sm:px-6 py-[14px] gap-3 md:gap-4">
            <div className="w-full flex items-center justify-center md:justify-between md:w-auto">
              <Link to="/" className="flex items-center gap-[10px] no-underline shrink-0">
                <div className="w-11 h-11 rounded-[10px] flex items-center justify-center text-[22px]">
                  <img src="/src/assets/sublogo.png" alt="logo" className="w-full h-full object-cover" />
                </div>
                <div>
                  <strong className="block text-[18px] text-[var(--green)] font-['Playfair_Display'] leading-tight">
                    Dinajpur Organic Fruits
                  </strong>
                  <span className="text-[11px] text-[var(--gray)] leading-tight">বিশুদ্ধতা ও স্বাদের নিশ্চয়তা</span>
                </div>
              </Link>
            </div>

            <div className="w-full md:flex-1 md:max-w-[480px] flex order-3 md:order-none border-2 border-[var(--border)] rounded-full overflow-hidden transition-colors focus-within:border-[var(--green)] md:mx-4">
              <input
                type="text"
                placeholder="Search: Honey, Ghee, Dates, Oil..."
                className="flex-1 border-0 outline-none py-[9px] px-[18px] text-[14px] bg-[#f9fafb] font-inherit"
              />
              <button className="bg-[var(--green)] border-0 px-[18px] cursor-pointer text-white text-[16px]">
                <i className="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
              </button>
            </div>

            <div className="w-full md:w-auto flex items-center justify-center md:justify-end gap-4 md:gap-5">
              <button className="bg-[var(--green)] text-white text-[13px] px-4 py-2 rounded-full whitespace-nowrap">
                Track Order
              </button>
              <a href="#" className="no-underline text-[var(--dark)] text-[13px] flex flex-col items-center gap-[2px] relative">
                <span className="text-[20px]">👤</span>
                <span>Account</span>
              </a>
              <a href="#" className="no-underline text-[var(--dark)] text-[13px] flex flex-col items-center gap-[2px] relative">
                <span className="text-[20px]">🛒</span>
                <span>Cart</span>
                <span className="absolute top-[-6px] right-[-8px] bg-[var(--amber)] text-white rounded-full w-[18px] h-[18px] text-[10px] flex items-center justify-center font-bold">
                  0
                </span>
              </a>
            </div>
          </div>
        </header>

        <div className="hidden lg:block">
          <Navbar />
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`fixed inset-0 z-[120] ${menuOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity ${menuOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setMenuOpen(false)}
        />
        <aside
          className={`absolute top-0 left-0 h-full w-[78%] max-w-[320px] bg-white shadow-2xl transition-transform ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-4 border-b border-[var(--border)] flex items-center justify-between">
            <strong className="text-[16px] text-[var(--green)] font-['Playfair_Display']">Menu</strong>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="w-9 h-9 rounded-lg border border-[var(--border)] flex items-center justify-center"
              aria-label="Close menu"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M6 6l12 12M18 6l-12 12" stroke="#1f2d26" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div className="p-4 space-y-4">
            <button className="w-full bg-[var(--green)] text-white text-[13px] px-4 py-2 rounded-full">
              Track Order
            </button>
            <a href="#" className="w-full flex items-center gap-2 text-[13px] text-[var(--dark)]">
              <span className="text-[18px]">👤</span>
              Account
            </a>
            <Navbar variant="drawer" onNavigate={() => setMenuOpen(false)} />
          </div>
        </aside>
      </div>

    </>
  );
};

export default Header;
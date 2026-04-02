import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import defaultUserSvg from "../../../assets/user-circles.svg";
import { useMemo } from "react";
import { useCart } from "../../../context/CartContext";

const DesktopHeader = ({
  user,
  dropdownRef,
  isOpen,
  toggleDropdown,
  handleSignOut,
  closeDropdown,
}) => {
  const { cartItems } = useCart();
  const photo = useMemo(
    () => user?.photoURL || defaultUserSvg,
    [user?.photoURL],
  );

  return (
    <header className="hidden lg:block bg-white border-b border-[var(--border)] shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
      <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row md:items-center md:justify-between px-4 sm:px-6 py-[14px] gap-3 md:gap-4">
        <div className="w-full flex items-center justify-center md:justify-between md:w-auto">
          {/* image */}
          <Link
            to="/"
            className="flex items-center gap-[10px] no-underline shrink-0"
          >
            <div className="w-11 h-11 rounded-[10px] flex items-center justify-center text-[22px]">
              <img
                src="/src/assets/sublogo.png"
                alt="logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <strong className="block text-[18px] text-[var(--green)] font-['Playfair_Display'] leading-tight">
                Dinajpur Organic Fruits
              </strong>
              <span className="text-[11px] text-[var(--gray)] leading-tight">
                বিশুদ্ধতা ও স্বাদের নিশ্চয়তা
              </span>
            </div>
          </Link>
        </div>
        {/*Search Bar */}
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
        {/* Track Order/ Account /Buy Now*/}
        <div className="w-full md:w-auto flex items-center justify-center md:justify-end gap-4 md:gap-5">
          <Link
            to="/order-tracking"
            className="bg-[var(--green)] text-white text-[13px] px-4 py-2 rounded-full whitespace-nowrap"
          >
            Track Order
          </Link>
          <div className="relative" ref={dropdownRef}>
            {/* User Accout */}
            {user ? (
              <>
                {/* প্রোফাইল ইমেজ বাটন */}
                <button
                  onClick={toggleDropdown}
                  className="flex items-center focus:outline-none"
                  aria-haspopup="true"
                  aria-expanded={isOpen}
                >
                  <div className="w-10 h-10 rounded-full cursor-pointer overflow-hidden border-2 border-green-500 hover:border-green-600 transition-all flex items-center justify-center bg-gray-200">
                    <img
                      alt={user?.displayName || "User"}
                      src={photo}
                      className="w-full h-full object-cover transition-all duration-300"
                      style={{ objectPosition: "center" }}
                      loading="lazy"
                    />
                  </div>
                </button>

                {/* ড্রপডাউন মেনু */}
                {isOpen && (
                  <div className="absolute -right-20 mt-2 w-52 bg-white border border-gray-200 rounded-xl shadow-2xl z-[100] py-2 animate-in fade-in zoom-in duration-200">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {user?.displayName || "Guest User"}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {user?.email}
                      </p>
                    </div>

                    <ul className="py-1">
                      <li>
                        <Link
                          to="/dashboard"
                          onClick={closeDropdown}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                        >
                          Dashboard
                        </Link>
                      </li>
                      <li className="border-t border-gray-100 mt-1">
                        <button
                          onClick={handleSignOut}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium"
                        >
                          Log Out
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            ) : (
              /* লগইন না থাকলে এই অংশটি দেখাবে */
              <Link
                to="/signin"
                className="group flex flex-col items-center gap-1 transition-colors hover:text-orange-600"
              >
                <FaUserCircle className="text-[24px] text-gray-600 group-hover:text-orange-600" />
                <span className="text-[12px] font-medium text-gray-700 group-hover:text-orange-600">
                  Account
                </span>
              </Link>
            )}
          </div>

          <Link
            to="/checkout"
            className="no-underline text-[var(--dark)] text-[13px] flex flex-col items-center gap-[2px] relative"
          >
            <span className="text-[20px]">🛒</span>
            <span>Cart</span>
            <span className="absolute top-[-6px] right-[-8px] bg-[var(--amber)] text-white rounded-full w-[18px] h-[18px] text-[10px] flex items-center justify-center font-bold">
              {cartItems.length}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default DesktopHeader;

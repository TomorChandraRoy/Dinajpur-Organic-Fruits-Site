import { Link, useNavigate } from "react-router-dom";
import defaultUserSvg from "../../assets/user-circles.svg";
import { FaUserCircle } from "react-icons/fa";
import Navbar from "../../common/Navbar";
import footerData from "../../utils/data/footerData.json";
import headerData from "../../utils/data/headerData.json";
import { useCart } from "../../context/CartContext";

import { useState, useEffect, useRef } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";

//logo/seacrch/buy/cart/account
const MainMobileHeader = ({
  menuOpen,
  openMenu,
  closeMenu,
  user,
  dropdownRef,
  toggleDropdown,
  isOpen,
  handleSignOut,
  closeDropdown,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const { cartItems } = useCart();
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const axiosPublic = useAxiosPublic();
  const { companyInfo } = footerData;
  const { searchPlaceholder, trackOrder, account, cart, menu } = headerData;

  // Click outside to close search suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch search suggestions (Debounced)
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery.trim().length > 0) {
        try {
          const res = await axiosPublic.get(
            `/getAllProducts?search=${encodeURIComponent(searchQuery)}`,
          );
          setSuggestions(res.data.slice(0, 5));
          setShowSuggestions(true);
        } catch (error) {
          console.error("Search fetch error:", error);
          setSuggestions([]);
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    };
    const timeoutId = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery, axiosPublic]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${searchQuery.trim()}`);
      setShowSuggestions(false);
    }
  };

  const handleDashboardClick = () => {
    closeDropdown();
    closeMenu();
    navigate("/dashboard");
  };

  return (
    <>
      <div className="lg:hidden bg-white border-b border-(--border) shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
        <div className="max-w-[1280px] mx-auto px-4 py-[12px]">
          <div className="flex items-center justify-between">
            {/* Hamburger Manu SVG Icon */}
            <button
              type="button"
              onClick={openMenu}
              className="w-10 h-10 rounded-lg border border-(--border) flex items-center justify-center"
              aria-label="Open menu"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 6h18M3 12h18M3 18h18"
                  stroke="#1f2d26"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            {/* Logo */}
            <Link to="/" className="flex items-center gap-[8px] no-underline">
              <div className="w-9 h-9 rounded-[8px] flex items-center justify-center text-[20px]">
                <img
                  src="/src/assets/sublogo.png"
                  alt="logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="leading-tight">
                <strong className="block text-[15px] text-(--green) font-['Playfair_Display']">
                  {companyInfo.name}
                </strong>
                <span className="block text-[10px] text-(--gray)">
                  {companyInfo.tagline}
                </span>
              </div>
            </Link>

            {/* cart */}
            <Link
              to="/checkout"
              className="no-underline text-(--dark) text-[13px] flex flex-col items-center gap-[2px] relative"
            >
              <span className="text-[20px]">🛒</span>
              <span>{cart}</span>
              <span className="absolute top-[-6px] right-[-8px] bg-(--amber) text-white rounded-full w-[18px] h-[18px] text-[10px] flex items-center justify-center font-bold">
                {cartItems.length}
              </span>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="mt-3 relative" ref={searchRef}>
            <form
              onSubmit={handleSearch}
              className="flex border-2 border-(--border) rounded-full overflow-hidden transition-colors focus-within:border-(--green)"
            >
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => {
                  if (suggestions.length > 0) setShowSuggestions(true);
                }}
                className="flex-1 border-0 outline-none py-[9px] px-[16px] text-[13px] bg-[#f9fafb] font-inherit"
              />
              <button
                type="submit"
                className="bg-(--green) border-0 px-[16px] cursor-pointer text-white text-[15px]"
              >
                <i
                  className="fa-solid fa-magnifying-glass"
                  aria-hidden="true"
                ></i>
              </button>
            </form>

            {/* Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 w-full bg-white border border-gray-100 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] rounded-xl mt-2 py-2 z-110 max-h-[300px] overflow-y-auto">
                {suggestions.map((product) => (
                  <div
                    key={product._id || product.id}
                    onClick={() => {
                      navigate(`/product/${product._id || product.id}`);
                      setShowSuggestions(false);
                      setSearchQuery("");
                      closeMenu();
                    }}
                    className="px-4 py-2 hover:bg-green-50 cursor-pointer flex items-center gap-3 transition-colors border-b border-gray-50 last:border-0"
                  >
                    <div className="w-10 h-10 rounded-md bg-gray-100 overflow-hidden shrink-0">
                      <img
                        src={
                          product.image ||
                          product.imageUrl ||
                          "/src/assets/sublogo.png"
                        }
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-gray-800">
                        {product.name}
                      </span>
                      <span className="text-xs text-green-600 font-bold">
                        ৳{product.price}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/*Mobile Sidebar Drawer */}
      <div
        className={`fixed inset-0 z-120 ${menuOpen ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity ${menuOpen ? "opacity-100" : "opacity-0"}`}
          onClick={closeMenu}
        />
        <aside
          className={`absolute top-0 left-0 h-full w-[78%] max-w-[320px] bg-white shadow-2xl transition-transform ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-4 border-b border-(--border) flex items-center justify-between">
            <strong className="text-[16px] text-(--green) font-['Playfair_Display']">
              {menu} dssdfsdfds
            </strong>
            <button
              type="button"
              onClick={closeMenu}
              className="w-9 h-9 rounded-lg border border-(--border) flex items-center justify-center"
              aria-label="Close menu"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 6l12 12M18 6l-12 12"
                  stroke="#1f2d26"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          <div className="p-4 space-y-4">
            <Link
              to="/order-tracking"
              className="w-full block  bg-(--green) text-white text-[13px] px-4 py-2 rounded-full"
            >
              {trackOrder}
            </Link>
            <div className="relative" ref={dropdownRef}>
              {user ? (
                <>
                  <button
                    onClick={toggleDropdown}
                    className="flex items-center focus:outline-none"
                    aria-haspopup="true"
                    aria-expanded={isOpen}
                  >
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-orange-500 hover:border-orange-600 transition-all bg-gray-200">
                      {user?.photoURL ? (
                        <img
                          alt={user?.displayName || "User"}
                          src={user?.photoURL || defaultUserSvg}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <img
                          alt="Default User"
                          src={defaultUserSvg}
                          className="w-10 h-10 object-cover p-0.5"
                        />
                      )}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="absolute right-11 mt-2 w-52 bg-white border border-gray-200 rounded-xl shadow-2xl z-100 py-2 animate-in fade-in zoom-in duration-200">
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
                            onClick={handleDashboardClick}
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
                <Link
                  to="/signin"
                  className="group flex flex-col items-center gap-1 transition-colors hover:text-orange-600"
                >
                  <FaUserCircle className="text-[24px] text-gray-600 group-hover:text-orange-600" />
                  <span className="text-[12px] font-medium text-gray-700 group-hover:text-orange-600">
                    {account}
                  </span>
                </Link>
              )}
            </div>
            <Navbar variant="drawer" onNavigate={closeMenu} />
          </div>
        </aside>
      </div>
    </>
  );
};

export default MainMobileHeader;

import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import defaultUserSvg from "../../assets/user-circles.svg";
import { useMemo, useState, useEffect, useRef } from "react";
import { useCart } from "../../context/CartContext";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import footerData from "../../utils/data/footerData.json";
import headerData from "../../utils/data/headerData.json";

//logo/seacrch/buy/cart/account
const MainDesktopHeader = ({user,dropdownRef,isOpen,toggleDropdown,handleSignOut,closeDropdown,}) => {
  const { cartItems } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const navigate = useNavigate();
  const searchRef = useRef(null);
  const axiosPublic = useAxiosPublic();

  const { companyInfo } = footerData;
  const { searchPlaceholder, trackOrder, account, cart } = headerData;

  const photo = useMemo(
    () => user?.photoURL || defaultUserSvg,
    [user?.photoURL],
  );

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
          // এখানে আপনার ব্যাকএন্ডের সঠিক API Endpoint দিন (যেমন: /products?search=...)
          const res = await axiosPublic.get(
            `/products?search=${encodeURIComponent(searchQuery)}`,
          );
          setSuggestions(res.data.slice(0, 5)); // টপ ৫টি প্রোডাক্ট দেখানোর জন্য
          setShowSuggestions(true);
        } catch (error) {
          console.error("Search fetch error:", error);
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

  return (
    <header className="hidden lg:block bg-white border-b border-(--border) shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
      <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row md:items-center md:justify-between px-4 sm:px-6 py-[14px] gap-3  md:gap-4">
        {/* logo */}
        <div className="w-full flex items-center justify-center md:justify-between md:w-auto">
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
              <strong className="block text-[18px] text-(--green) font-['Playfair_Display'] leading-tight">
                {companyInfo.name}
              </strong>
              <span className="text-[11px] text-(--gray) leading-tight">
                {companyInfo.tagline}
              </span>
            </div>
          </Link>
        </div>

        {/* Search Bar with Auto Suggestions */}
        <div
            className="w-full md:flex-1 md:max-w-[480px] order-3 md:order-0 md:mx-4 relative"
            ref={searchRef}
          >
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
                className="flex-1 border-0 outline-none py-[9px] px-[18px] text-[14px] bg-[#f9fafb] font-inherit"
              />
              <button
                type="submit"
                className="bg-(--green) border-0 px-[18px] cursor-pointer text-white text-[16px]"
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
                      navigate(`/shop?search=${product.name}`); // অথবা সরাসরি প্রোডাক্ট পেজে পাঠাতে পারেন `/product/${product._id}`
                      setShowSuggestions(false);
                      setSearchQuery("");
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

        {/* Track Order/ Account / Buy Now*/}
        <div className="w-full md:w-auto flex items-center justify-center md:justify-end gap-4 md:gap-5">
            <Link
              to="/order-tracking"
              className="bg-(--green) text-white text-[13px] px-4 py-2 rounded-full whitespace-nowrap"
            >
              {trackOrder}
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
                    <div className="absolute -right-20 mt-2 w-52 bg-white border border-gray-200 rounded-xl shadow-2xl z-100 py-2 animate-in fade-in zoom-in duration-200">
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
                    {account}
                  </span>
                </Link>
              )}
            </div>

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

      </div>
    </header>
  );
};

export default MainDesktopHeader;

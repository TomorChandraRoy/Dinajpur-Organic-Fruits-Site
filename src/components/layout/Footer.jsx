import {
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";

import { Link } from "react-router-dom";

const Footer = () => {
  const links = [
    { name: "About Us", path: "/about-us" },
    { name: "Meet the Team", path: "meet-team" },
    { name: "How to Order", path: "/how-to-order" },
    { name: "Terms & Condition", path: "/terms-condition" },
  ];

  const helpfulLinks = [
    { name: "Contact", path: "/contact" },
    { name: "FAQs", path: "/faqs" },
    { name: "Live Chat", path: "/chat" },
    { name: "Order Tracking", path: "/order-tracking" },
  ];

  const legalLinks = [
    { name: "Returns Policy", path: "/returns-policy" },
    { name: "Refund Policy", path: "/refund-policy" },
    { name: "Privacy Policy", path: "/privacy-policy" },
  ];

  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-7xl space-y-8 px-4 py-16 sm:px-6 lg:space-y-16 lg:px-8">

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 mb-5">

          {/* LEFT SIDE */}
          <div className="flex flex-col lg:items-start md:items-center">

            {/* LOGO */}
            <div className="flex flex-col items-center md:items-start sm:flex-row gap-3">
              <div className="w-14 h-14 shrink-0 rounded-lg overflow-hidden">
                <img
                  src="/src/assets/sublogo.png"
                  alt="logo"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="text-center sm:text-left">
                <strong className="block text-[18px] text-(--green) font-['Playfair_Display'] leading-tight">
                  Dinajpur Organic Fruits
                </strong>
                <span className="text-[11px] text-gray-400 block mt-1">
                  বিশুদ্ধতা ও স্বাদের নিশ্চয়তা
                </span>
              </div>
            </div>

            {/* DESCRIPTION */}
            <p className="mt-4 p-3 lg:max-w-xs md:max-w-xl lg:p-0 text-gray-500 mx-auto lg:mx-0">
              Dinajpur Organic Fruits offers fresh, organic, and chemical-free fruits sourced directly from local farms. We are committed to providing healthy, safe, and naturally delicious produce so you and your family can enjoy the true taste of nature every day.
            </p>

            {/* SOCIAL ICONS */}
            <ul className="mt-8 flex justify-center lg:justify-start md:justify-start  gap-6">
              <li>
                <a href="#" className="text-gray-700 hover:text-red-500 transition">
                  <span className="sr-only">YouTube</span>
                  <FaYoutube className="w-6 h-6" />
                </a>
              </li>

              <li>
                <a href="#" className="text-gray-700 hover:text-pink-500 transition">
                  <span className="sr-only">Instagram</span>
                  <FaInstagram className="w-6 h-6" />
                </a>
              </li>

              <li>
                <a href="#" className="text-gray-700 hover:text-blue-600 transition">
                  <span className="sr-only">Facebook</span>
                  <FaFacebook className="w-6 h-6" />
                </a>
              </li>

              <li>
                <a href="#" className="text-gray-700 hover:text-green-500 transition">
                  <span className="sr-only">WhatsApp</span>
                  <FaWhatsapp className="w-6 h-6" />
                </a>
              </li>
            </ul>
          </div>

          {/* RIGHT SIDE GRID */}
          <div className="grid grid-cols-2 gap-8  lg:col-span-2 lg:grid-cols-3 md:grid-cols-3">

            {/* INFO */}
            <div className="text-center">
              <p className="font-medium text-gray-900">Information</p>
              <ul className="mt-6 space-y-4 text-sm">
                {links.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      onClick={() => window.scrollTo({ top: 0 })}
                      className="text-gray-700 hover:opacity-75 transition"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* HELPFUL */}
            <div className="text-center">
              <p className="font-medium text-gray-900">Helpful Links</p>
              <ul className="mt-6 space-y-4 text-sm">
                {helpfulLinks.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      onClick={() => window.scrollTo({ top: 0 })}
                      className="text-gray-700 hover:opacity-75 transition"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* LEGAL */}
            <div className="text-center">
              <p className="font-medium text-gray-900">Legal</p>
              <ul className="mt-6 space-y-4 text-sm">
                {legalLinks.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      onClick={() => window.scrollTo({ top: 0 })}
                      className="text-gray-700 hover:opacity-75 transition"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* BOTTOM */}
        <p className="text-xs text-gray-500 border-t border-gray-100 pt-4 text-center lg:text-start md:text-center ">
          &copy; 2026. Dinajpur Organic Fruits. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

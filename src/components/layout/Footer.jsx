import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#1b2d24] text-[rgba(255,255,255,0.72)] pt-14 pb-7 px-6">
      {/* Footer Grid */}
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-9">

        {/* Logo & Description */}
        <div>
            <Link to="/" className="flex items-center gap-[10px] no-underline shrink-0">
              <div className="w-11 h-11  rounded-[10px] flex items-center justify-center text-[22px]">
                <img src="/src/assets/sublogo.png" alt="logo" className="w-full h-full object-cover" />
              </div>
              <div>
                <strong className="block text-[18px] text-white font-['Playfair_Display'] leading-tight">
                  Dinajpur Organic Fruits
                </strong>
                <span className="text-[11px] text-[var(--gray)] leading-tight">বিশুদ্ধতা ও স্বাদের নিশ্চয়তা</span>
              </div>
            </Link>
          <p className="text-[12.5px] leading-[1.8] mb-4">
            Your trusted source for safe, healthy, and organic food products delivered across Bangladesh.
          </p>
          <p className="text-[12.5px] mb-4"><strong className="text-white">DBID: 437361334</strong></p>

          {/* Social Links */}
          <div className="flex gap-2.5">
            <a className="w-8.5 h-8.5 bg-[rgba(255,255,255,0.1)] rounded-lg flex items-center justify-center text-[15px] transition-colors duration-200 cursor-pointer hover:bg-[var(--green)]">📘</a>
            <a className="w-8.5 h-8.5 bg-[rgba(255,255,255,0.1)] rounded-lg flex items-center justify-center text-[15px] transition-colors duration-200 cursor-pointer hover:bg-[var(--green)]">📸</a>
            <a className="w-8.5 h-8.5 bg-[rgba(255,255,255,0.1)] rounded-lg flex items-center justify-center text-[15px] transition-colors duration-200 cursor-pointer hover:bg-[var(--green)]">💬</a>
            <a className="w-8.5 h-8.5 bg-[rgba(255,255,255,0.1)] rounded-lg flex items-center justify-center text-[15px] transition-colors duration-200 cursor-pointer hover:bg-[var(--green)]">▶️</a>
          </div>
        </div>

        {/* Company */}
        <div className="sm:justify-center text-center">
          <h4 className="text-white text-[13px] font-semibold mb-3 uppercase tracking-wide">Company</h4>
          <ul className="list-none text-center">
            <li className="mb-1.5"><a className="text-[12.5px] text-[rgba(255,255,255,0.6)] hover:text-white cursor-pointer transition-colors">About Us</a></li>
            <li className="mb-1.5"><a className="text-[12.5px] text-[rgba(255,255,255,0.6)] hover:text-white cursor-pointer transition-colors">Return Policy</a></li>
            <li className="mb-1.5"><a className="text-[12.5px] text-[rgba(255,255,255,0.6)] hover:text-white cursor-pointer transition-colors">Refund Policy</a></li>
            <li className="mb-1.5"><a className="text-[12.5px] text-[rgba(255,255,255,0.6)] hover:text-white cursor-pointer transition-colors">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Quick Help */}
        <div className="sm:justify-self-start text-center">
          <h4 className="text-white text-[13px] font-semibold mb-3 uppercase tracking-wide">Quick Help</h4>
          <ul className="list-none text-center">
            <li className="mb-1.5"><a className="text-[12.5px] text-[rgba(255,255,255,0.6)] hover:text-white cursor-pointer transition-colors">Customer Care</a></li>
            <li className="mb-1.5"><a className="text-[12.5px] text-[rgba(255,255,255,0.6)] hover:text-white cursor-pointer transition-colors">Track Order</a></li>
            <li className="mb-1.5"><a className="text-[12.5px] text-[rgba(255,255,255,0.6)] hover:text-white cursor-pointer transition-colors">Place Order</a></li>
            <li className="mb-1.5"><a className="text-[12.5px] text-[rgba(255,255,255,0.6)] hover:text-white cursor-pointer transition-colors">FAQ</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="sm:justify-self-start text-center">
          <h4 className="text-white text-[13px] font-semibold mb-3 uppercase tracking-wide">Contact</h4>
          <ul className="list-none text-center">
            <li className="mb-1.5"><a className="text-[12.5px] text-[rgba(255,255,255,0.6)] cursor-pointer">📞 +880 1321-208940</a></li>
            <li className="mb-1.5"><a className="text-[12.5px] text-[rgba(255,255,255,0.6)] cursor-pointer">☎️ 09642-922922</a></li>
            <li className="mb-1.5"><a className="text-[12.5px] text-[rgba(255,255,255,0.6)] cursor-pointer">📧 support@ghorerbazar.com</a></li>
            <li className="mb-1.5"><a className="text-[12.5px] text-[rgba(255,255,255,0.6)] cursor-pointer">📍 Dhaka, Bangladesh</a></li>
          </ul>
        </div>

      </div>

      {/* Footer Bottom */}
      <div className="max-w-[1280px] mx-auto border-t border-[rgba(255,255,255,0.1)] pt-5 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2.5 text-[11.5px] text-[rgba(255,255,255,0.35)] text-center sm:text-left">
        <span>© Dinajpur Organic Fruits 2026 — All Rights Reserved</span>
        <span>Made with ❤️ for Tomor Roy</span>
      </div>
    </footer>
  );
};

export default Footer;

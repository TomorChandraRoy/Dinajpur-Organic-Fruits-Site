import { useEffect } from "react";
import { useLocation } from "react-router-dom";


// 🎯 এখন কী হবে?
// 👉 যখনই user কোনো Footer link click করবে:
// page change হবে
// automatically top এ scroll হয়ে যাবে
// user কে manually scroll করতে হবে না

// 💡 Why this is production standard?
// Because React Router:
// SPA হওয়ায় page reload হয় না
// তাই scroll state preserve করে
// 👉 এই component সেই behavior fix করে

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
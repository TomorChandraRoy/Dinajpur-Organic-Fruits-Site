import { NavLink } from "react-router-dom";

const Navbar = ({ variant = "bar", onNavigate }) => {
  const menus = [
    // { name: "🔥 OFFER ZONE", path: "/offer", special: true },
    { name: "Home", path: "/" },
    { name: "Lychee (লিচু)", path: "/shop/Lychee" },
    { name: "Banana (কলা)", path: "/shop/Banana" },
    { name: "Mango (আম)", path: "/shop/Mango" },
    { name: "Papaya (পেঁপে)", path: "/shop/Papaya" },
    { name: "Jujube (বরই / কুল)", path: "/shop/Jujube" },
    { name: "Shidol (শিদল)", path: "/shop/Shidol" },
    { name: "Beaten Rice (চিড়া)", path: "/shop/Beaten%20Rice" },
    { name: "Papad (পাপড়)", path: "/shop/Papad" },
    { name: "Sugondhi Rice (সুগন্ধী চাল)", path: "/shop/Sugondhi%20Rice" },
    // { name: "Freshwater Fish (মিঠা পানির মাছ)", path: "/freshwaterfish" },
    // { name: "Pickle (আচার)", path: "/pickle" },
  ];

  const isDrawer = variant === "drawer";
  const navClass = isDrawer
    ? "bg-transparent shadow-none"
    : "bg-[var(--green)] shadow-md";
  const containerClass = isDrawer
    ? "flex flex-col gap-2"
    : "max-w-[1280px] mx-auto flex items-center gap-[2px] px-4 sm:px-6 overflow-x-auto whitespace-nowrap snap-x snap-mandatory";
  const linkBase = isDrawer
    ? "text-[13px] leading-none inline-flex items-center justify-start h-[36px] w-full px-3 rounded transition-all"
    : "text-[13px] leading-none inline-flex items-center justify-center h-[32px] px-3 sm:px-4 rounded transition-all whitespace-nowrap snap-start";

  return (
    <nav className={navClass}>
      <div className={containerClass}>
        {menus.map((menu, i) => (
          <NavLink
            key={i}
            to={menu.path}
            onClick={() => onNavigate?.()}
            className={({ isActive }) =>
              `
                ${linkBase}
                ${
                  menu.special
                    ? isDrawer
                      ? "text-[#b45309] font-bold bg-[#fff7ed] hover:bg-[#ffedd5]"
                      : "text-[#ffd166] font-bold hover:text-white hover:bg-[rgba(255,255,255,0.15)]"
                    : isActive
                      ? isDrawer
                        ? "text-white bg-[var(--green)] font-medium"
                        : "text-white bg-[rgba(255,255,255,0.15)] font-medium"
                      : isDrawer
                        ? "text-[var(--dark)] font-medium hover:bg-[#f3f4f6]"
                        : "text-[rgba(255,255,255,0.85)] font-medium hover:text-white hover:bg-[rgba(255,255,255,0.15)]"
                }
                `
            }
          >
            {menu.name}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;

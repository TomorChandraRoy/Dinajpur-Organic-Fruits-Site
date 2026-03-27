import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const useHeader = () => {
  const { user, logOut } = useContext(AuthContext);


  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const mobileDropdownRef = useRef(null);
  const desktopDropdownRef = useRef(null);
  const navigate = useNavigate();

  // dropdown toggle
  const toggleDropdown = () => setIsOpen(prev => !prev);
  const closeDropdown = () => setIsOpen(false);

  // mobile menu
  const openMenu = () => setMenuOpen(true);
  const closeMenu = () => setMenuOpen(false);

  // click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      const insideMobile = mobileDropdownRef.current?.contains(e.target);
      const insideDesktop = desktopDropdownRef.current?.contains(e.target);

      if (!insideMobile && !insideDesktop) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // logout
  const handleSignOut = async () => {
    try {
      await logOut();
      setIsOpen(false);
      navigate("/signin");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return {
    user,
    isOpen,
    menuOpen,
    mobileDropdownRef,
    desktopDropdownRef,
    toggleDropdown,
    closeDropdown,
    openMenu,
    closeMenu,
    handleSignOut,
  };
};

export default useHeader;

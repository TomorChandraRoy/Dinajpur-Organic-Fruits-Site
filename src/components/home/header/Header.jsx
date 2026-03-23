// import { useContext, useEffect, useRef, useState } from "react";
// import { Link,  } from "react-router-dom";
import Navbar from "../../../common/Navbar";
// import { AuthContext } from "../../context/AuthContext";
// import defaultUserSvg from "../../assets/user-circles.svg";
// import { FaUserCircle } from "react-icons/fa";
import ToolBar from "../ToolBar";
import DesktopHeader from "./DesktopHeader";
import useHeader from "../../../hooks/useHeader";
import MobileHeader from "./MobileHeader";
const Header = () => {

    const { user, isOpen, openMenu, menuOpen,closeMenu, dropdownRef, toggleDropdown, closeDropdown, handleSignOut} = useHeader();
  // const [menuOpen, setMenuOpen] = useState(false);
  // const { user, logOut } = useContext(AuthContext);
  // const [isOpen, setIsOpen] = useState(false);

  // const dropdownRef = useRef(null);
  // const navigate = useNavigate();

  // ১. ড্রপডাউনের বাইরে ক্লিক করলে এটি বন্ধ করার লজিক
  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
  //       setIsOpen(false);
  //     }
  //   };
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => document.removeEventListener("mousedown", handleClickOutside);
  // }, []);

  // const handleSignOut = async () => {
  //   try {
  //     await logOut();
  //     setIsOpen(false);
  //     navigate("/signin");
  //   } catch (error) {
  //     console.error("Logout Error:", error);
  //   }
  // };
//menuOpen, openMenu, closeMenu, user, dropdownRef, toggleDropdown, isOpen, handleSignOut, closeDropdown
  return (
    <>
    <ToolBar/>
      <div className="sticky top-0 z-[100]">
        {/* Mobile/Tablet Header */}
        <MobileHeader
        openMenu={openMenu}
        user={user}
        menuOpen={menuOpen}
        closeMenu={closeMenu}
        dropdownRef={dropdownRef}
        toggleDropdown={toggleDropdown}
        isOpen={isOpen}
        handleSignOut={handleSignOut}
        closeDropdown={closeDropdown}
        />
        {/* Desktop Header */}
        <DesktopHeader
          user={user}
            isOpen={isOpen}
            dropdownRef={dropdownRef}
            toggleDropdown={toggleDropdown}
            closeDropdown={closeDropdown}
          handleSignOut={handleSignOut}
        />
        {/* Navbar */}
        <div className="hidden lg:block">
          <Navbar />
        </div>
      </div>

    </>
  );
};

export default Header;


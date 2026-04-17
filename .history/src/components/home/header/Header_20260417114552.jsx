import Navbar from "../../../common/Navbar";
import ToolBar from "../ToolBar";
import MainDesktopHeader from "./";
import useHeader from "../../../hooks/useHeader";
import MobileHeader from "./MobileHeader";
const Header = () => {
  const {user,isOpen,openMenu,menuOpen,closeMenu,mobileDropdownRef,desktopDropdownRef,toggleDropdown,closeDropdown,handleSignOut} = useHeader();

  return (
    <>
      <ToolBar />
      <div className="sticky top-0 z-100">
        {/* Mobile/Tablet Header */}
        <MobileHeader
          openMenu={openMenu}
          user={user}
          menuOpen={menuOpen}
          closeMenu={closeMenu}
          dropdownRef={mobileDropdownRef}
          toggleDropdown={toggleDropdown}
          isOpen={isOpen}
          handleSignOut={handleSignOut}
          closeDropdown={closeDropdown}
        />
        {/* Desktop Header */}
        <MainDesktopHeader
          user={user}
          isOpen={isOpen}
          dropdownRef={desktopDropdownRef}
          toggleDropdown={toggleDropdown}
          closeDropdown={closeDropdown}
          handleSignOut={handleSignOut}
        />
        {/* Navbar */}
        {/* <div className="hidden lg:block">
          <Navbar />
        </div> */}
      </div>
    </>
  );
};

export default Header;


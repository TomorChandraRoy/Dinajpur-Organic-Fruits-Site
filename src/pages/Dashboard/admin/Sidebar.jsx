import { AiOutlineHome } from "react-icons/ai";
import { FiUsers, FiBox } from "react-icons/fi";
import { BiLayout, BiPlus, BiLogOut } from "react-icons/bi";

export default function Sidebar({
  activeTab,
  setActiveTab,
  setPage,
  setSearchQuery,
  handleLogout,
  navigate,
}) {
  return (
    <div
      className="w-[78px] sm:w-24 md:w-64 bg-white border-r border-gray-100 flex flex-col p-2 sm:p-3 md:p-4
       sticky top-0 h-screen z-10 shrink-0"
    >
      <div
        className="hidden md:block mb-10 px-4 mt-4 text-2xl font-black font- text-green-600 italic uppercase
      tracking-tighter"
      >
        ADMIN Panel
      </div>
      <nav className="space-y-2 flex-1">
        {[
          { id: "home", label: "Home", icon: <AiOutlineHome /> },
          { id: "users", label: "Users", icon: <FiUsers /> },
          { id: "orders", label: "Orders", icon: <BiLayout /> },
          { id: "products", label: "Products", icon: <FiBox /> },
          { id: "add-product", label: "Add Product", icon: <BiPlus /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              if (tab.id === "home") {
                navigate("/");
                return;
              }
              setActiveTab(tab.id);
              if (setPage) setPage(1);
              if (setSearchQuery) setSearchQuery("");
            }}
            className={`w-full flex items-center justify-center md:justify-start gap-3 px-2 sm:px-3 md:px-4
              py-3 md:py-3.5 rounded-2xl font-bold transition-all
              ${
                activeTab === tab.id
                  ? "bg-green-600 text-white shadow-lg shadow-green-200"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
          >
            <span className="text-xl sm:text-2xl shrink-0">{tab.icon}</span>
            <span className="hidden md:block">{tab.label}</span>
          </button>
        ))}
      </nav>
      <button
        onClick={handleLogout}
        className="flex items-center justify-center md:justify-start gap-3 px-2
      sm:px-3 md:px-4 py-3 text-red-400 font-bold hover:bg-red-50 rounded-2xl transition-all mb-4"
      >
        <BiLogOut size={20} className="shrink-0" />
        <span className="hidden md:block">Logout</span>
      </button>
    </div>
  );
}

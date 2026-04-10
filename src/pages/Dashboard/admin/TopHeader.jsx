import { IoSearchSharp } from "react-icons/io5";

export default function TopHeader({ activeTab, searchQuery, setSearchQuery, setPage }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <h2 className="text-2xl sm:text-3xl font-black text-gray-800 capitalize tracking-tight break-words">
        {" "}
        {activeTab}
      </h2>
      <div className="flex w-full md:w-auto gap-3">
        <div className="relative group w-full md:w-auto">
          <IoSearchSharp className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder={`Search ${activeTab}...`}
            className="bg-white border-0 py-3 pl-10 pr-4 rounded-2xl shadow-sm outline-none w-full
            md:w-64 focus:ring-2 focus:ring-blue-500 transition-all"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setPage(1);
            }}
          />
        </div>
      </div>
    </div>
  );
}

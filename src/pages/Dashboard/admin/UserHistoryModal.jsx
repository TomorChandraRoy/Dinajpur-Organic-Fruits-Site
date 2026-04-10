import { BiHistory, BiUser, BiX } from "react-icons/bi";
import { FaDolly } from "react-icons/fa";

export default function UserHistoryModal({ userHistory, setUserHistory }) {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 z-[60]">
      <div className="bg-white rounded-xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in fade-in
      duration-300">
        <div className="p-4 sm:p-5 bg-blue-600 text-white flex items-start sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base sm:text-xl font-black italic tracking-wide sm:tracking-widest uppercase
            flex items-center gap-2">
              <BiHistory size={32} className="sm:w-10 sm:h-10 shrink-0" />{" "}
              User Order History
            </h3>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
              <div className="flex items-center gap-1 mt-3">
                <BiUser size={18} />
                <span className="text-xs sm:text-sm font-bold opacity-80 tracking-tight">
                  {userHistory[0]?.customer}
                </span>
              </div>
              <div className="flex items-center gap-1 mt-1 sm:mt-3">
                <FaDolly size={16} />
                <span className="text-xs sm:text-sm font-bold opacity-80 tracking-tight">
                  Total Spent :{" "}
                  {userHistory.reduce((a, b) => a + b.bill, 0)}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setUserHistory(null)}
            className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors cursor-pointer"
          >
            <BiX size={24} />
          </button>
        </div>
        <div className="p-4 sm:p-8 overflow-y-auto max-h-[400px] overflow-x-auto">
          <table className="w-full min-w-[520px] text-left text-sm whitespace-nowrap">
            <thead className="text-gray-500 border-b border-gray-100 text-[10px] uppercase font-bold
            tracking-widest">
              <tr>
                <th className="pb-4">Order ID</th>
                <th className="pb-4">Product</th>
                <th className="pb-4">Bill</th>
                <th className="pb-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {userHistory.map((o) => (
                <tr
                  key={o.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 font-bold text-blue-600">{o.id}</td>
                  <td className="py-4 font-medium text-gray-600">
                    {o.product}
                  </td>
                  <td className="py-4 font-black text-gray-800">
                    {o.bill}
                  </td>
                  <td className="py-4 text-center">
                    <span
                      className={`px-2 py-1 rounded text-[9px] font-black uppercase
                        ${o.status === "Delivered" ? "bg-green-100 text-green-700"
                           : o.status === "Cancel" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"}`}
                    >
                      {o.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default function OrderManageModal({ selectedOrder, setSelectedOrder, updateStatus }) {
  return (
    <div className="fixed inset-0 bg-slate-900/55 backdrop-blur-md flex items-center justify-center p-3
    sm:p-4 z-50">
      <div className="bg-white rounded-[1.5rem] sm:rounded-[2rem] p-5 sm:p-7 w-full max-w-sm
      shadow-[0_28px_70px_-24px_rgba(15,23,42,0.45)] border border-white/70 animate-in zoom-in duration-200">
        <div className="mb-6">
          <p className="text-[11px] font-black uppercase tracking-[0.28em] text-blue-500 mb-2">
            Manage Order
          </p>
          <h3 className="text-2xl font-black text-gray-800 tracking-tight">
            Order Action
          </h3>
          <p className="text-sm text-gray-400 mt-2 font-medium">
            Select a status for order {selectedOrder.id}
          </p>
        </div>
        <div className="space-y-2">
          {["Delivered", "Pending", "Cancel"].map((s) => (
            <button
              key={s}
              onClick={() => updateStatus(selectedOrder.id, s)}
              className={`w-full text-left px-4 py-3.5 rounded-2xl font-bold border transition-all ${
                selectedOrder.status === s
                  ? s === "Delivered"
                    ? "border-green-200 bg-green-50 text-green-700 shadow-sm"
                    : s === "Cancel"
                      ? "border-red-200 bg-red-50 text-red-700 shadow-sm"
                      : "border-yellow-200 bg-yellow-50 text-yellow-700 shadow-sm"
                  : "border-gray-200 bg-gray-50 text-gray-500 hover:border-gray-300 hover:bg-white"
              }`}
            >
              {s}
            </button>
          ))}
          <button
            onClick={() => setSelectedOrder(null)}
            className="w-full mt-5 cursor-pointer rounded-2xl bg-gray-100 py-3 text-gray-500 font-bold
            uppercase text-[15px] hover:bg-gray-200 hover:text-gray-800 transition-all"
          >
            Discard Change
          </button>
        </div>
      </div>
    </div>
  );
}

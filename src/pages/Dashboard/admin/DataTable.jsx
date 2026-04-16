import { BiEditAlt, BiTrash } from "react-icons/bi";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";

export default function DataTable({
  activeTab,
  paginatedData,
  setUserHistory,
  allOrders,
  setSelectedOrder,
  products,
  setProducts,
  perPage,
  setPerPage,
  setPage,
  page,
  totalItems,
  totalPages,
}) {
  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <div
      className="bg-white rounded-xl shadow-[0_22px_55px_-32px_rgba(15,23,42,0.28)] border
    border-green-100/70 overflow-hidden"
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm whitespace-nowrap">
          <thead className="text-gray-500 font-bold border-b border-green-100 text-[12px] uppercase">
            <tr>
              {activeTab === "orders" ? (
                <>
                  <th className="px-6 py-5">Customer</th>
                  <th className="px-6 py-5">Product</th>
                  <th className="px-6 py-5">Bill</th>
                  <th className="px-6 py-5">Status</th>
                  <th className="px-6 py-5 text-center">Action</th>
                </>
              ) : activeTab === "users" ? (
                <>
                  <th className="px-6 py-5">Name</th>
                  <th className="px-6 py-5 text-center">Orders</th>
                  <th className="px-6 py-5 text-center">Spent</th>
                  <th className="px-6 py-5 text-center">History</th>
                </>
              ) : (
                <>
                  <th className="px-6 py-5">Product Name</th>
                  <th className="px-6 py-5">Price</th>
                  <th className="px-6 py-5">Stock</th>
                  <th className="px-6 py-5 text-center">Modify</th>
                </>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-green-50">
            {paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-20 text-gray-400 font-medium"
                >
                  No data found in {activeTab}
                </td>
              </tr>
            ) : (
              paginatedData.map((item, idx) => (
                <tr
                  key={idx}
                  className="group hover:bg-gradient-to-r hover:from-green-50/60
                  hover:to-orange-50/30 transition-all duration-200"
                >
                  {activeTab === "orders" ? (
                    <>
                      <td
                        className="px-6 py-5 font-bold cursor-pointer text-gray-800
                        group-hover:text-green-700 transition-colors"
                        onClick={() =>
                          setUserHistory(
                            allOrders.filter(
                              (o) => o.customer === item.customer,
                            ),
                          )
                        }
                      >
                        {item.customer}
                      </td>
                      <td className="px-6 py-5 font-medium text-gray-600">
                        {item.product}
                      </td>
                      <td className="p-6 font-black text-gray-800">
                        {item.bill}
                      </td>
                      <td className="px-6 py-5">
                        <span
                          className={`inline-flex min-w-[96px] justify-center px-3.5 py-2 rounded-sm
                            text-[10px] font-black uppercase tracking-[0.22em]
                            ${
                              item.status === "Delivered"
                                ? "bg-green-100 text-green-700 ring-1 ring-green-200"
                                : item.status === "Cancel"
                                  ? "bg-red-100 text-red-700 ring-1 ring-red-200"
                                  : "bg-yellow-100 text-yellow-700 ring-1 ring-yellow-200"
                            }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-center">
                        <button
                          onClick={() => setSelectedOrder(item)}
                          className="bg-gray-900 text-white px-5 py-2.5 rounded-sm text-xs font-bold
                          hover:bg-green-600 transition-all shadow-[0_14px_30px_-16px_rgba(22,101,52,0.55)]"
                        >
                          Manage
                        </button>
                      </td>
                    </>
                  ) : activeTab === "users" ? (
                    <>
                      <td className="px-6 py-5">
                        <p className="font-bold text-gray-800">{item.name}</p>
                        <p className="text-[10px] text-gray-400 font-semibold mt-1">
                          {item.phone}
                        </p>
                      </td>
                      <td className="px-6 py-5 text-center font-bold text-gray-700">
                        {item.totalOrders}
                      </td>
                      <td className="p-6 text-center font-black text-green-600">
                        {item.totalSpent}
                      </td>
                      <td className="px-6 py-5 text-center">
                        <button
                          onClick={() =>
                            setUserHistory(
                              allOrders.filter((o) => o.customer === item.name),
                            )
                          }
                          className="inline-flex items-center rounded-xs cursor-pointer bg-blue-50 px-4
                          py-2 text-blue-600 hover:bg-blue-600 hover:text-white font-bold text-xs
                          tracking-tight transition-all"
                        >
                          View Details
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-6 py-5 font-bold text-gray-800">
                        {item.name} <br />{" "}
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.22em]">
                          {item.cat || item.category}
                        </span>
                      </td>
                      <td className="p-6 font-black text-blue-600">
                        {item.price}
                      </td>
                      <td className="p-6 font-bold text-gray-500">
                        {item.stock} in Stock
                      </td>
                      <td className="px-6 py-5 text-center">
                        <div className="flex justify-center gap-2">
                          <button
                            className="p-3 bg-blue-50 text-blue-600 rounded-2xl
                          hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                          >
                            <BiEditAlt size={18} />
                          </button>
                          <button
                            onClick={() =>
                              setProducts(
                                products.filter((p) => (p._id || p.id) !== (item._id || item.id)),
                              )
                            }
                            className="p-3 bg-red-50 text-red-500 rounded-2xl hover:bg-red-500
                            hover:text-white transition-all shadow-sm"
                          >
                            <BiTrash size={18} />
                          </button>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div
        className="p-4 sm:p-6 bg-gradient-to-r from-white via-green-50/30 to-orange-50/20
      border-t border-green-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
      >
        <div className="flex items-center gap-3 text-xs font-bold text-gray-400 uppercase">
          <span>Show:</span>
          <select
            value={perPage[activeTab] || 5}
            onChange={(e) => {
              setPerPage((prev) => ({
                ...prev,
                [activeTab]: Number(e.target.value),
              }));
              setPage(1);
            }}
            className="bg-white border border-green-100 rounded-xs px-3 py-2 outline-none
            focus:ring-2 focus:ring-green-500 cursor-pointer text-gray-700 shadow-sm"
          >
            <option value={5}>5 Rows</option>
            <option value={10}>10 Rows</option>
            <option value={20}>20 Rows</option>
          </select>
        </div>

        <div className="text-[11px] font-bold text-gray-400 uppercase text-left md:text-center break-words">
          Displaying {(page - 1) * perPage + 1} -{" "}
          {Math.min(page * perPage, totalItems)} of {totalItems} {activeTab}
        </div>

        <div className="flex gap-2">
          <button
            onClick={handlePrev}
            disabled={page === 1}
            className="p-3 border border-green-100 bg-white rounded-2xl hover:bg-green-50
            disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm text-gray-600"
          >
            <HiOutlineChevronLeft size={20} />
          </button>
          <button
            onClick={handleNext}
            disabled={page === totalPages || totalPages === 0}
            className="p-3 border border-green-100 bg-white rounded-2xl hover:bg-green-50
            disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm text-gray-600"
          >
            <HiOutlineChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

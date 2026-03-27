import { useContext, useMemo, useState } from "react";
import { BiCalendar, BiPackage, BiPhone, BiX } from "react-icons/bi";
import { FiShoppingCart } from "react-icons/fi";
import { MdCancel, MdOutlineInventory2 } from "react-icons/md";
import { AuthContext } from "../../context/AuthContext";
import defaultUserSvg from "../../assets/user-circles.svg";
import { formatDate } from "../../utils/formatDate";
import { Link } from "react-router-dom";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";

  const stats = [
    { title: "Total Orders", value: 10, color: "blue", icon: <MdOutlineInventory2 size={30} className="shrink-0" /> },
    { title: "Cancel Orders", value: 3, color: "red", icon: <MdCancel size={30} className="shrink-0" /> },
  ];

  const orders = [
    { id: "#1001", product: "Mango", bill: "৳1200", due: "৳0", payment: "Paid", status: "Delivered", date: "Mar 20, 2026", delivery: "Mar 23, 2026" },
    { id: "#1002", product: "Apple", bill: "৳800", due: "৳200", payment: "Partial", status: "Pending", date: "Mar 18, 2026", delivery: "Mar 25, 2026" },
    { id: "#1003", product: "Banana", bill: "৳300", due: "৳0", payment: "Paid", status: "Delivered", date: "Mar 15, 2026", delivery: "Mar 19, 2026" },
    { id: "#1004", product: "Orange", bill: "৳600", due: "৳100", payment: "Partial", status: "Processing", date: "Mar 17, 2026", delivery: "Mar 26, 2026" },
    { id: "#1005", product: "Pineapple", bill: "৳500", due: "৳0", payment: "Paid", status: "Delivered", date: "Mar 10, 2026", delivery: "Mar 14, 2026" },
    { id: "#1006", product: "Grapes", bill: "৳500", due: "৳0", payment: "Paid", status: "Delivered", date: "Mar 10, 2026", delivery: "Mar 14, 2026" },
    { id: "#1007", product: "Grapes", bill: "৳500", due: "৳0", payment: "Paid", status: "Delivered", date: "Mar 10, 2026", delivery: "Mar 14, 2026" },
    { id: "#1008", product: "Grapes", bill: "৳500", due: "৳0", payment: "Paid", status: "Delivered", date: "Mar 10, 2026", delivery: "Mar 14, 2026" },
    { id: "#1009", product: "Grapes", bill: "৳500", due: "৳0", payment: "Paid", status: "Delivered", date: "Mar 10, 2026", delivery: "Mar 14, 2026" },
    { id: "#1010", product: "Grapes", bill: "৳500", due: "৳0", payment: "Paid", status: "Delivered", date: "Mar 10, 2026", delivery: "Mar 14, 2026" },
    { id: "#1011", product: "Grapes", bill: "৳500", due: "৳0", payment: "Paid", status: "Delivered", date: "Mar 10, 2026", delivery: "Mar 14, 2026" },
    { id: "#1012", product: "Grapes", bill: "৳500", due: "৳0", payment: "Paid", status: "Delivered", date: "Mar 10, 2026", delivery: "Mar 14, 2026" },
  ];

const UserDashboardHome=()=> {

  const {userRole } = useContext(AuthContext);

  const photo = useMemo(() => userRole?.photoURL || defaultUserSvg, [userRole?.photoURL]);

  const [perPage, setPerPage] = useState(5);
  const [page, setPage] = useState(1);

  // ১. ভিউ করার জন্য এই স্টেটটি যোগ করা হয়েছে
  const [selectedOrder, setSelectedOrder] = useState(null);

  const totalItems = orders.length;
  const totalPages = Math.ceil(totalItems / perPage);

  const paginatedOrders = useMemo(() => {
    const start = (page - 1) * perPage;
    return orders.slice(start, start + perPage);
  }, [page, perPage]);

  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow p-6 text-center self-start lg:sticky lg:top-6">
          <div className="w-24 h-24 mx-auto rounded-full border-4 border-green-600 flex items-center justify-center">
          <img
            alt={userRole?.displayName || "User"}
            src={photo}
            className="w-full h-full object-cover transition-all duration-300 rounded-full"
            style={{ objectPosition: "center" }}
            loading="lazy"
          />
          </div>
          <h2 className="mt-4 font-semibold text-lg capitalize">{userRole?.name || userRole?.displayName || "User"}</h2>
          <div className="mt-3 space-y-1 text-sm text-gray-600">
            <p className="flex items-center justify-center gap-2"><BiPhone size={14} />
            {userRole?.phoneNumber ? `${userRole.phoneNumber}` : "No number"}
            </p>
            <p className="flex items-center justify-center gap-2"><BiCalendar size={14} /> {formatDate(userRole?.createdAt)}</p>
          </div>
          <div className="mt-6 space-y-3 ">
            <Link to='/order-tracking' className="mx-auto w-44 flex items-center justify-center gap-2 rounded-lg bg-blue-500 px-4 py-3 text-white transition hover:bg-blue-600">
              <BiPackage size={25} className="shrink-0" /> Track Order
            </Link>
            <Link to='/' className="mx-auto w-44 flex items-center justify-center gap-2 rounded-lg bg-green-500 px-4 py-3 text-white transition hover:bg-green-600">
              <FiShoppingCart size={25} className="shrink-0" /> Shop Now
            </Link>
          </div>
        </div>

        {/* Right Section */}
        <div className="lg:col-span-3 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {stats.map((item, i) => (
              <div key={i} className="bg-white rounded-2xl shadow p-5 flex justify-between items-center">
                <div>
                  <p className="text-gray-600 text-lg font-bold">{item.title}</p>
                  <h2 className="text-2xl font-bold">{item.value}</h2>
                </div>
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${item.color === "blue" ? "bg-blue-600 text-blue-100" : "bg-red-700 text-red-100"}`}>
                  {item.icon}
                </div>
              </div>
            ))}
          </div>

          {/* Table Container */}
          <div className="bg-white rounded-2xl shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead>
                  <tr className="bg-gray-50 border-b text-gray-500 font-medium">
                    <th className="p-4">ORDER ID</th>
                    <th className="p-4">PRODUCT</th>
                    <th className="p-4">BILL</th>
                    <th className="p-4">DUE</th>
                    <th className="p-4">PAYMENT</th>
                    <th className="p-4">STATUS</th>
                    <th className="p-4">ORDER DATE</th>
                    <th className="p-4">DELIVERY</th>
                    <th className="p-4 text-center">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {paginatedOrders.length === 0 ? (
                    <tr>
                      <td colSpan="9" className="text-center py-10 text-gray-400">No data available</td>
                    </tr>
                  ) : (
                    paginatedOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                        <td className="p-4 font-medium text-gray-700">{order.id}</td>
                        <td className="p-4">{order.product}</td>
                        <td className="p-4 font-semibold">{order.bill}</td>
                        <td className="p-4 text-red-500">{order.due}</td>
                        <td className="p-4">{order.payment}</td>
                        <td className="p-4">
                           <span className={`px-2 py-1 rounded-full text-[10px] uppercase font-bold ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                            {order.status}
                           </span>
                        </td>
                        <td className="p-4 text-gray-500">{order.date}</td>
                        <td className="p-4 text-gray-500">{order.delivery}</td>
                        <td className="p-4 text-center">
                          {/* ২. এখানে onClick ফাংশন যোগ করা হয়েছে */}
                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="text-blue-600 hover:underline font-medium"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Section */}
            <div className="flex flex-col md:flex-row justify-between items-center p-4 gap-4 text-sm bg-white border-t border-gray-100">
              <div className="flex items-center gap-2 text-gray-600">
                Items per page:
                <select
                  value={perPage}
                  onChange={(e) => {
                    setPerPage(Number(e.target.value));
                    setPage(1);
                  }}
                  className="border rounded px-2 py-1 outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                </select>
              </div>

              <div className="text-gray-500 font-medium">
                {totalItems === 0 ? "0" : `${(page - 1) * perPage + 1} - ${Math.min(page * perPage, totalItems)}`} of {totalItems}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handlePrev}
                  disabled={page === 1}
                  className="p-2 border rounded-lg hover:bg-gray-50 disabled:opacity-30 transition"
                >
                  <HiOutlineChevronLeft/>
                </button>
                <button
                  onClick={handleNext}
                  disabled={page === totalPages || totalPages === 0}
                  className="p-2 border rounded-lg hover:bg-gray-50 disabled:opacity-30 transition"
                >
                  <HiOutlineChevronRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- ৩. ভিউ ডিটেইলস মোডাল (Popup) --- */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="flex justify-between items-center p-5 border-b">
              <h3 className="text-lg font-bold text-gray-800">Order Details</h3>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-1 hover:bg-gray-100 rounded-full transition text-gray-500"
              >
                <BiX size={24} />
              </button>
            </div>

            <div className="p-6 space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Order ID:</span>
                <span className="font-bold text-gray-800">{selectedOrder.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Product Name:</span>
                <span className="font-medium">{selectedOrder.product}</span>
              </div>
              <div className="flex justify-between border-t pt-3">
                <span className="text-gray-500">Total Bill:</span>
                <span className="font-bold text-green-600">{selectedOrder.bill}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Due Amount:</span>
                <span className="font-bold text-red-500">{selectedOrder.due}</span>
              </div>
              <div className="flex justify-between border-t pt-3">
                <span className="text-gray-500">Order Date:</span>
                <span className="text-gray-700">{selectedOrder.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Delivery Date:</span>
                <span className="text-gray-700 font-medium">{selectedOrder.delivery}</span>
              </div>
              <div className="flex justify-between border-t pt-3">
                <span className="text-gray-500">Payment Status:</span>
                <span className="font-semibold text-blue-600">{selectedOrder.payment}</span>
              </div>
            </div>

            <div className="p-4 bg-gray-50 text-right">
              <button
                onClick={() => setSelectedOrder(null)}
                className="bg-gray-800 text-white px-6 py-2 rounded-lg font-bold hover:bg-black transition shadow-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default  UserDashboardHome;

import { useContext, useMemo, useState } from "react";
import {
  BiPackage,
  BiX,
  BiHistory,
  BiLayout,
  BiLogOut,
  BiPlus,
  BiTrash,
  BiEditAlt,
  BiUser,
} from "react-icons/bi";
import { FaDolly } from "react-icons/fa";
import { FiUsers, FiBox } from "react-icons/fi";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import { IoSearchSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { AiOutlineHome } from "react-icons/ai";
import adminOrdersData from "../../utils/data/adminOrders.json";
import productsData from "../../utils/data/products.json";

export default function AdminDashboard() {
  const { logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("users");
  const [perPage, setPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [userHistory, setUserHistory] = useState(null);

  const [allOrders, setAllOrders] = useState(adminOrdersData || []);

  const [products, setProducts] = useState(productsData || []);

  const handleAddProduct = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newProd = {
      id: Date.now(),
      name: formData.get("name"),
      price: formData.get("price"),
      stock: formData.get("stock"),
      cat: formData.get("category"),
    };
    setProducts([...products, newProd]);
    setActiveTab("products");
  };

  const updateStatus = (orderId, newStatus) => {
    setAllOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)),
    );
    setSelectedOrder(null);
  };

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/signin");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const usersList = useMemo(() => {
    const uniqueUsers = [];
    allOrders.forEach((order) => {
      if (!uniqueUsers.find((u) => u.name === order.customer)) {
        const userOrders = allOrders.filter(
          (o) => o.customer === order.customer,
        );
        uniqueUsers.push({
          name: order.customer,
          phone: order.phone,
          totalOrders: userOrders.length,
          cancelOrders: userOrders.filter((o) => o.status === "Cancel").length,
          totalSpent: userOrders.reduce((acc, curr) => acc + curr.bill, 0),
        });
      }
    });
    return uniqueUsers;
  }, [allOrders]);

  const filteredData = useMemo(() => {
    let source = [];
    if (activeTab === "orders") source = allOrders;
    else if (activeTab === "users") source = usersList;
    else if (activeTab === "products") source = products;
    else source = [];

    return source.filter(
      (item) =>
        (item.customer || item.name || "")
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        (item.phone || "").includes(searchQuery) ||
        (item.id &&
          String(item.id).toLowerCase().includes(searchQuery.toLowerCase())),
    );
  }, [searchQuery, allOrders, usersList, products, activeTab]);

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / perPage);

  const paginatedData = useMemo(() => {
    const start = (page - 1) * perPage;
    return filteredData.slice(start, start + perPage);
  }, [page, perPage, filteredData]);

  const stats = [
    { title: "Total Users", value: usersList.length, icon: <FiUsers /> },
    { title: "Total Orders", value: allOrders.length, icon: <BiPackage /> },
    {
      title: "Cancel Orders",
      value: allOrders.filter((order) => order.status === "Cancel").length,
      icon: <BiX />,
    },
    { title: "Active Products", value: products.length, icon: <FiBox /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      <div
        className="w-[78px] sm:w-24 md:w-64 bg-white border-r border-gray-100 flex flex-col p-2 sm:p-3 md:p-4
         sticky top-0 h-screen z-10 shrink-0"
      >
        <div
          className="hidden md:block mb-10 px-4 mt-4 text-2xl font-black text-green-600 italic uppercase
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
                setPage(1);
                setSearchQuery("");
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

      <div className="flex-1 min-w-0 p-3 sm:p-4 md:p-8 overflow-x-hidden">
        <div className="max-w-6xl mx-auto space-y-6">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((s, i) => (
              <div
                key={i}
                className="group bg-white px-4 sm:px-6 py-5 sm:py-7 rounded-xl
                shadow-[0_18px_45px_-22px_rgba(22,101,52,0.3)] border border-green-100/60 flex items-center
                gap-4 sm:gap-5 transition-all duration-300 hover:-translate-y-1
                hover:shadow-[0_24px_55px_-24px_rgba(22,101,52,0.38)]"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center
                text-[1.6rem] sm:text-[2rem] bg-gradient-to-br from-green-100 via-lime-50 to-orange-50
                 text-green-700 shadow-inner shadow-white/80 ring-1 ring-green-100 group-hover:scale-105
                 transition-transform duration-300 shrink-0">
                  {s.icon}
                </div>
                <div className="min-w-0">
                  <p className="text-gray-400 text-[11px] font-extrabold uppercase leading-none mb-2">
                    {s.title}
                  </p>
                  <h3 className="text-2xl sm:text-3xl font-black text-gray-800 tracking-tight leading-none
                  break-words">
                    {s.value}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {activeTab === "add-product" ? (
            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
                <div>
                  <h3 className="text-2xl font-black text-gray-800 tracking-tight">
                    Add Product
                  </h3>
                </div>
                <p className="text-xs font-medium text-gray-400">
                  Home / Add Product
                </p>
              </div>

              <form onSubmit={handleAddProduct} className="space-y-5">
                <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5 shadow-sm">
                  <h4 className="text-sm font-black text-gray-700 mb-5">
                    Products Description
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">
                        Product Name
                      </label>
                      <input
                        name="name"
                        required
                        className="w-full rounded-md border border-gray-300 px-4 py-2.5 outline-none
                        focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter product name"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">
                        Category
                      </label>
                      <select
                        name="category"
                        className="w-full rounded-md border border-gray-300 px-4 py-2.5 outline-none text-gray-600"
                      >
                        <option>Select Category</option>
                        <option>Fruits</option>
                        <option>Vegetables</option>
                        <option>Organic</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">
                        Brand
                      </label>
                      <select className="w-full rounded-md border border-gray-300 px-4 py-2.5 outline-none
                      text-gray-600">
                        <option>Select Brand</option>
                        <option>Organic Fresh</option>
                        <option>Dinajpur Fruits</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">
                        Status
                      </label>
                      <select className="w-full rounded-md border border-gray-300 px-4 py-2.5 outline-none
                      text-gray-600">
                        <option>Select Status</option>
                        <option>Published</option>
                        <option>Draft</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">
                        Weight (kg)
                      </label>
                      <input
                        className="w-full rounded-md border border-gray-300 px-4 py-2.5 outline-none"
                        placeholder="0"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">
                          Length (cm)
                        </label>
                        <input
                          className="w-full rounded-md border border-gray-300 px-4 py-2.5 outline-none"
                          placeholder="0"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">
                          Width (cm)
                        </label>
                        <input
                          className="w-full rounded-md border border-gray-300 px-4 py-2.5 outline-none"
                          placeholder="0"
                        />
                      </div>
                    </div>
                    <div className="space-y-1 md:col-span-2">
                      <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">
                        Description
                      </label>
                      <textarea
                        className="min-h-[140px] w-full resize-none rounded-md border border-gray-300 px-4
                         py-3 outline-none"
                        placeholder="Recievedly feel delightful..."
                      />
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5 shadow-sm">
                  <h4 className="text-sm font-black text-gray-700 mb-5">
                    Pricing & Availability
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">
                        Price
                      </label>
                      <input
                        name="price"
                        type="number"
                        required
                        className="w-full rounded-md border border-gray-300 px-4 py-2.5 outline-none"
                        placeholder="0"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">
                        Stock
                      </label>
                      <input
                        name="stock"
                        type="number"
                        required
                        className="w-full rounded-md border border-gray-300 px-4 py-2.5 outline-none"
                        placeholder="1"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">
                        Availability Status
                      </label>
                      <select className="w-full rounded-md border border-gray-300 px-4 py-2.5 outline-none
                      text-gray-600">
                        <option>Select Availability</option>
                        <option>In Stock</option>
                        <option>Out of Stock</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">
                        Weight Unit
                      </label>
                      <select className="w-full rounded-md border border-gray-300 px-4 py-2.5 outline-none
                      text-gray-600">
                        <option>kg</option>
                        <option>gram</option>
                        <option>piece</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5 shadow-sm">
                  <h4 className="text-sm font-black text-gray-700 mb-5">
                    Products Images
                  </h4>
                  <div className="min-h-[180px] rounded-xl border border-dashed border-gray-300 flex flex-col
                  items-center justify-center text-center px-6">
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full border
                    border-gray-300 text-gray-400">
                      <BiPlus size={20} />
                    </div>
                    <p className="text-sm font-semibold text-gray-500">
                      Click to upload or drag and drop
                    </p>
                    <p className="mt-2 text-xs text-gray-400">
                      PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                </div>

                <div className="flex flex-col-reverse sm:flex-row justify-end gap-3">
                  <button
                    type="button"
                    className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-bold
                     text-gray-500 hover:bg-gray-50 transition-all"
                  >
                    Draft
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-blue-600 px-4 py-2 text-sm font-bold text-white
                    hover:bg-blue-700 transition-all"
                  >
                    Publish Product
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-[0_22px_55px_-32px_rgba(15,23,42,0.28)] border
            border-green-100/70 overflow-hidden">
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
                                    ${item.status === "Delivered" ?
                                       "bg-green-100 text-green-700 ring-1 ring-green-200"
                                       : item.status === "Cancel" ? "bg-red-100 text-red-700 ring-1 ring-red-200" :
                                       "bg-yellow-100 text-yellow-700 ring-1 ring-yellow-200"}`}
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
                                <p className="font-bold text-gray-800">
                                  {item.name}
                                </p>
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
                                      allOrders.filter(
                                        (o) => o.customer === item.name,
                                      ),
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
                                  <button className="p-3 bg-blue-50 text-blue-600 rounded-2xl
                                  hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                                    <BiEditAlt size={18} />
                                  </button>
                                  <button
                                    onClick={() =>
                                      setProducts(
                                        products.filter(
                                          (p) => p.id !== item.id,
                                        ),
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

              <div className="p-4 sm:p-6 bg-gradient-to-r from-white via-green-50/30 to-orange-50/20
              border-t border-green-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-center gap-3 text-xs font-bold text-gray-400 uppercase">
                  <span>Show:</span>
                  <select
                    value={perPage}
                    onChange={(e) => {
                      setPerPage(Number(e.target.value));
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
                  {Math.min(page * perPage, totalItems)} of {totalItems}{" "}
                  {activeTab}
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
          )}
        </div>
      </div>

      {selectedOrder && (
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
      )}

      {userHistory && (
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
      )}
    </div>
  );
}

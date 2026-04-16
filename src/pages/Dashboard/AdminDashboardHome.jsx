import { useContext, useMemo, useState, useEffect } from "react";
import { BiPackage, BiX } from "react-icons/bi";

import { FiUsers, FiBox } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { BeatLoader } from "react-spinners";
import adminOrdersData from "../../utils/data/adminOrders.json";
import Sidebar from "./admin/Sidebar";
import TopHeader from "./admin/TopHeader";
import AddProductForm from "./admin/AddProductForm";
import DataTable from "./admin/DataTable";
import OrderManageModal from "./admin/OrderManageModal";
import UserHistoryModal from "./admin/UserHistoryModal";
import StatCards from "./admin/StatCards";

export default function AdminDashboard() {
  const { logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("users");
  const [perPage, setPerPage] = useState({ orders: 5, users: 5, products: 5 });
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [userHistory, setUserHistory] = useState(null);

  const [allOrders, setAllOrders] = useState(adminOrdersData || []);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axiosPublic.get("/getAllProducts");
        setProducts(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error("Error fetching products in Admin:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [axiosPublic]);

  const handleAddProduct = (newProduct) => {
    // API থেকে সেভ হওয়া ডেটা লোকাল স্টেটে যোগ করা হচ্ছে
    const productWithId = {
      ...newProduct,
      id: newProduct._id || newProduct.id,
    };
    setProducts([...products, productWithId]);
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
          String(item.id).toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item._id &&
          String(item._id).toLowerCase().includes(searchQuery.toLowerCase())),
    );
  }, [searchQuery, allOrders, usersList, products, activeTab]);

  const currentPerPage = perPage[activeTab] || 5;
  const totalItems = filteredData.length;
  // const totalPages = Math.ceil(totalItems / perPage);
  const totalPages = Math.ceil(totalItems / currentPerPage);

  const paginatedData = useMemo(() => {
    //   const start = (page - 1) * perPage;
    //   return filteredData.slice(start, start + perPage);
    // }, [page, perPage, filteredData]);
    const start = (page - 1) * currentPerPage;
    return filteredData.slice(start, start + currentPerPage);
  }, [page, currentPerPage, filteredData]);

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
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setPage={setPage}
        perPage={currentPerPage}
        setPerPage={(newVal) => {
          setPerPage((prev) => ({ ...prev, [activeTab]: newVal }));
          setPage(1);
        }}
        setSearchQuery={setSearchQuery}
        handleLogout={handleLogout}
        navigate={navigate}
      />

      <div className="flex-1 min-w-0 p-3 sm:p-4 md:p-8 overflow-x-hidden">
        <div className="max-w-6xl mx-auto space-y-6">
          <TopHeader
            activeTab={activeTab}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setPage={setPage}
          />
          <StatCards stats={stats} />

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <BeatLoader color="#047857" size={15} />
            </div>
          ) : activeTab === "add-product" ? (
            <AddProductForm handleAddProduct={handleAddProduct} />
          ) : (
            <DataTable
              activeTab={activeTab}
              paginatedData={paginatedData}
              setUserHistory={setUserHistory}
              allOrders={allOrders}
              setSelectedOrder={setSelectedOrder}
              products={products}
              setProducts={setProducts}
              perPage={perPage}
              setPerPage={setPerPage}
              setPage={setPage}
              page={page}
              totalItems={totalItems}
              totalPages={totalPages}
            />
          )}
        </div>
      </div>

      {selectedOrder && (
        <OrderManageModal
          selectedOrder={selectedOrder}
          setSelectedOrder={setSelectedOrder}
          updateStatus={updateStatus}
        />
      )}

      {userHistory && (
        <UserHistoryModal
          userHistory={userHistory}
          setUserHistory={setUserHistory}
        />
      )}
    </div>
  );
}

import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  BiChevronRight,
  BiHeart,
  BiPlus,
  BiReset,
} from "react-icons/bi";
import mango from "../assets/mango.webp";
import banana from "../assets/banna.png";
import lychee from "../assets/lechnu.jpg";
import longan from "../assets/lachu.jpg";
import sublogo from "../assets/sublogo.png";
import mangoo from "../assets/mangoo.jpg";
import { products } from "../utils/data/products";

const productImages = [mango, banana, lychee, longan, sublogo, mangoo];

const categoryVisuals = {
  Honey: { image: sublogo },
  Ghee: { image: mango },
  Dates: { image: sublogo },
  Oil: { image: banana },
  Masala: { image: longan },
  Nuts: { image: lychee },
  Tea: { image: banana },
  Honeycomb: { image: mango },
  Pickle: { image: longan },
};

const CategoryShop = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { categoryName } = useParams();
  const decodedCategory = decodeURIComponent(categoryName || "all");

  const [selectedCategory, setSelectedCategory] = useState(decodedCategory);
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [badgeFilter, setBadgeFilter] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    setSelectedCategory(decodedCategory);
  }, [decodedCategory]);

  const categories = useMemo(() => {
    const counts = products.reduce((acc, product) => {
      acc[product.cat] = (acc[product.cat] || 0) + 1;
      return acc;
    }, {});

    return Object.keys(categoryVisuals).map((name) => ({
      name,
      count: counts[name] || 0,
    }));
  }, []);

  const filteredProducts = useMemo(() => {
    let nextProducts = [...products];

    if (selectedCategory !== "all") {
      nextProducts = nextProducts.filter((product) => product.cat === selectedCategory);
    }

    if (priceMin !== "") {
      nextProducts = nextProducts.filter((product) => product.price >= Number(priceMin));
    }

    if (priceMax !== "") {
      nextProducts = nextProducts.filter((product) => product.price <= Number(priceMax));
    }

    if (badgeFilter !== "all") {
      nextProducts = nextProducts.filter((product) => product.badge === badgeFilter);
    }

    if (sortBy === "price-asc") nextProducts.sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") nextProducts.sort((a, b) => b.price - a.price);
    if (sortBy === "name-asc") nextProducts.sort((a, b) => a.name.localeCompare(b.name));
    if (sortBy === "discount") nextProducts.sort((a, b) => (b.orig - b.price) - (a.orig - a.price));

    return nextProducts;
  }, [badgeFilter, priceMax, priceMin, selectedCategory, sortBy]);

  const resetFilters = () => {
    setSelectedCategory("all");
    setPriceMin("");
    setPriceMax("");
    setBadgeFilter("all");
    setSortBy("default");
    navigate("/shop/all", { replace: true });
  };

  const changeCategory = (category) => {
    setSelectedCategory(category);
    navigate(`/shop/${encodeURIComponent(category)}`, { replace: true });
  };

  const openProduct = (id) => {
    navigate(`/product/${id}`, { state: { from: location.pathname } });
  };

  const shopTitle =
    selectedCategory === "all" ? "Latest Products" : `${selectedCategory} Products`;

  return (
    <section className="bg-[#f6f6f3] py-10">
      <div className="mx-auto max-w-[1240px] px-4">
        <div className="mb-5 flex flex-wrap items-center gap-2 rounded-2xl  px-4 py-3 text-sm text-gray-500 ">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="font-semibold text-green-700 transition hover:text-green-800"
          >
            Home
          </button>
          <BiChevronRight className="text-base" />
          <span className="font-medium text-gray-700">{selectedCategory}</span>
        </div>

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[270px_minmax(0,1fr)]">
          <aside className="h-fit rounded-2xl border border-[#ddd8ca] bg-white p-4 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-sm font-extrabold uppercase tracking-[0.18em] text-gray-800">
                Filters
              </h3>
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center gap-1 text-xs font-semibold text-green-700 transition hover:text-green-800"
              >
                <BiReset className="text-sm" />
                Reset
              </button>
            </div>

            <div className="border-b border-dashed border-[#e7e2d7] pb-5">
              <h4 className="mb-3 text-sm font-bold text-gray-800">Category</h4>
              <div className="space-y-2.5">
                <label className="flex cursor-pointer items-center gap-2.5 text-sm text-gray-700">
                  <input
                    type="radio"
                    name="category-filter"
                    checked={selectedCategory === "all"}
                    onChange={() => changeCategory("all")}
                    className="accent-green-700"
                  />
                  <span>All Products</span>
                  <span className="ml-auto text-xs text-gray-400">{products.length}</span>
                </label>

                {categories.map((cat) => (
                  <label
                    key={cat.name}
                    className="flex cursor-pointer items-center gap-2.5 text-sm text-gray-700"
                  >
                    <input
                      type="radio"
                      name="category-filter"
                      checked={selectedCategory === cat.name}
                      onChange={() => changeCategory(cat.name)}
                      className="accent-green-700"
                    />
                    <span>{cat.name}</span>
                    <span className="ml-auto text-xs text-gray-400">{cat.count}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="border-b border-dashed border-[#e7e2d7] py-5">
              <h4 className="mb-3 text-sm font-bold text-gray-800">Price Range (Tk)</h4>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  value={priceMin}
                  onChange={(e) => setPriceMin(e.target.value)}
                  placeholder="Min"
                  className="rounded-lg border border-[#d9d4c8] px-3 py-2 text-sm outline-none transition focus:border-green-600"
                />
                <input
                  type="number"
                  value={priceMax}
                  onChange={(e) => setPriceMax(e.target.value)}
                  placeholder="Max"
                  className="rounded-lg border border-[#d9d4c8] px-3 py-2 text-sm outline-none transition focus:border-green-600"
                />
              </div>
            </div>

            <div className="py-5">
              <h4 className="mb-3 text-sm font-bold text-gray-800">Badge / Offer</h4>
              <div className="space-y-2.5">
                <label className="flex cursor-pointer items-center gap-2.5 text-sm text-gray-700">
                  <input
                    type="radio"
                    name="badge-filter"
                    checked={badgeFilter === "all"}
                    onChange={() => setBadgeFilter("all")}
                    className="accent-green-700"
                  />
                  <span>All</span>
                </label>
                <label className="flex cursor-pointer items-center gap-2.5 text-sm text-gray-700">
                  <input
                    type="radio"
                    name="badge-filter"
                    checked={badgeFilter === "hot"}
                    onChange={() => setBadgeFilter("hot")}
                    className="accent-green-700"
                  />
                  <span>Hot</span>
                </label>
                <label className="flex cursor-pointer items-center gap-2.5 text-sm text-gray-700">
                  <input
                    type="radio"
                    name="badge-filter"
                    checked={badgeFilter === "sale"}
                    onChange={() => setBadgeFilter("sale")}
                    className="accent-green-700"
                  />
                  <span>On Sale</span>
                </label>
                <label className="flex cursor-pointer items-center gap-2.5 text-sm text-gray-700">
                  <input
                    type="radio"
                    name="badge-filter"
                    checked={badgeFilter === "new"}
                    onChange={() => setBadgeFilter("new")}
                    className="accent-green-700"
                  />
                  <span>New</span>
                </label>
              </div>
            </div>
          </aside>

          <div>
            <div className="mb-5 flex flex-col gap-4 rounded-2xl border border-[#ddd8ca] bg-white px-4 py-4 shadow-sm md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{shopTitle}</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Showing {filteredProducts.length} products
                </p>
              </div>

              <label className="flex items-center gap-2 rounded-xl border border-[#ddd8ca] bg-[#fbfaf7] px-3 py-2 text-sm text-gray-600">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="min-w-[180px] bg-transparent font-medium outline-none"
                >
                  <option value="default">Sort: Popularity</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name-asc">Name: A to Z</option>
                  <option value="discount">Highest Discount</option>
                </select>
              </label>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
              {filteredProducts.map((product) => {
                const discount = Math.round(
                  ((product.orig - product.price) / product.orig) * 100,
                );

                return (
                  <article
                    key={product.id}
                    className="overflow-hidden rounded-2xl border border-[#d9d4c8] bg-white shadow-[0_10px_24px_rgba(17,24,39,0.04)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(17,24,39,0.1)]"
                  >
                    <div
                      className="relative aspect-[0.96] cursor-pointer overflow-hidden"
                      style={{ background: product.bg || "#f4f8f3" }}
                      onClick={() => openProduct(product.id)}
                    >
                      <span
                        className={`absolute left-3 top-3 z-10 rounded-md px-2 py-1 text-[10px] font-extrabold uppercase tracking-[0.14em] text-white ${
                          product.badge === "hot"
                            ? "bg-red-500"
                            : product.badge === "new"
                              ? "bg-green-600"
                              : "bg-orange-500"
                        }`}
                      >
                        {product.badge}
                      </span>

                      <button
                        type="button"
                        className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-600 shadow-sm transition hover:scale-105"
                      >
                        <BiHeart className="h-4 w-4" />
                      </button>

                      <img
                        src={productImages[product.id % productImages.length]}
                        alt={product.name}
                        className="h-full w-full object-cover transition duration-300 hover:scale-105"
                        loading="lazy"
                      />
                    </div>

                    <div className="p-4">
                      <p className="mb-1 text-[10px] font-extrabold uppercase tracking-[0.22em] text-green-700">
                        {product.cat}
                      </p>

                      <h3
                        className="mb-3 line-clamp-2 min-h-[40px] cursor-pointer text-sm font-semibold leading-5 text-gray-900 transition hover:text-green-700"
                        onClick={() => openProduct(product.id)}
                      >
                        {product.name}
                      </h3>

                      <div className="mb-3 flex items-center gap-2 text-[11px] text-gray-500">
                        <span>{product.rating} rating</span>
                        <span className="h-1 w-1 rounded-full bg-gray-300" />
                        <span>{product.reviews} reviews</span>
                      </div>

                      <div className="flex items-end justify-between gap-3">
                        <div>
                          <p className="text-lg font-extrabold text-green-700">
                            Tk {product.price.toLocaleString()}
                          </p>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-400 line-through">
                              Tk {product.orig.toLocaleString()}
                            </span>
                            <span className="rounded bg-green-100 px-1.5 py-0.5 text-[10px] font-bold text-green-700">
                              {discount}% off
                            </span>
                          </div>
                        </div>

                        <button
                          type="button"
                          className="inline-flex h-10 items-center justify-center gap-1 rounded-full bg-green-700 px-3.5 text-xs font-bold text-white transition hover:bg-green-800"
                        >
                          <BiPlus className="text-base" />
                          Add
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {filteredProducts.length === 0 && (
              <div className="rounded-2xl border border-dashed border-[#d9d4c8] bg-white px-6 py-16 text-center text-gray-500 shadow-sm">
                No products found for this filter.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryShop;

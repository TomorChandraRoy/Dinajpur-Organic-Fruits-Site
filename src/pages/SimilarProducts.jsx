import { useParams, useNavigate } from "react-router-dom";
import { products } from "../data/products";
import SimilarProducts from "../components/product/SimilarProducts";

const SimilarProductsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => String(p.id) === String(id));

  if (!product) {
    return (
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-2">Product not found</h2>
          <p className="text-gray-500">The product you requested does not exist.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl border border-gray-100 shadow-[0_10px_24px_rgba(0,0,0,0.08)] p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold text-gray-900">
            Similar to {product.name}
          </h1>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="text-[12px] text-emerald-700 font-semibold"
          >
            Back
          </button>
        </div>
        <SimilarProducts currentProductId={product.id} category={product.cat} />
      </div>
    </section>
  );
};

export default SimilarProductsPage;

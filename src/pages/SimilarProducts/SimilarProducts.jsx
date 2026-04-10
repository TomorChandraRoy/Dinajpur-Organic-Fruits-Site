import { useParams } from "react-router-dom";
import  products  from "../../utils/data/products.json";
import SimilarProducts from "../../components/product/SimilarProducts";

const SimilarProductsPage = () => {
  const { id } = useParams();
  const product = products.find((p) => String(p.id) === String(id));

  if (!product) {
    return (
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-2">Product not found</h2>
          <p className="text-gray-500">
            The product you requested does not exist.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section>
      <SimilarProducts currentProductId={product.id} category={product.cat} />
    </section>
  );
};

export default SimilarProductsPage;

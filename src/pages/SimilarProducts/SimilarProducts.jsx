import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SimilarProducts from "../../components/product/SimilarProducts";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const SimilarProductsPage = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await axiosPublic.get(`/getSingleProduct/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.error("Error fetching product:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [axiosPublic, id]);

  if (loading) {
    return (
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-500">Loading similar products...</p>
        </div>
      </section>
    );
  }

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
      <SimilarProducts
        currentProductId={product._id || product.id}
        category={product.cat || product.category}
      />
    </section>
  );
};

export default SimilarProductsPage;

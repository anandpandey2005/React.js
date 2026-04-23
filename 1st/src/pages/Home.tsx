import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchProducts } from "../store/slices/productSlices";
import { addToCart } from "../store/slices/cartSlices";
import { useToast } from "../components/ToastContainer";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { items, status } = useAppSelector((state) => state.products);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  const handleAddToCart = (product: any) => {
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1,
      }),
    );
    addToast(`${product.title} added to cart!`, "success");
  };

  if (status === "loading") {
    return <div className="text-center py-8">Loading products...</div>;
  }

  if (status === "failed") {
    return (
      <div className="text-center py-8 text-red-500">
        Failed to load products
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            {import.meta.env.VITE_STORE_NAME}
          </h1>
          <button
            onClick={() => navigate("/cart")}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Cart
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">Products</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-4">
                <h2 className="text-lg font-semibold line-clamp-2">
                  {product.title}
                </h2>
                <p className="text-gray-600 text-sm mt-2">{product.category}</p>
                <p className="text-2xl font-bold text-blue-600 mt-4">
                  ₹{product.price}
                </p>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

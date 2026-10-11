// Shopora Products Hook

import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";

function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isActive = true;

    async function loadProducts() {
      try {
        setLoading(true);
        setError("");

        const data = await getProducts();

        if (isActive) {
          setProducts(data);
        }
      } catch (err) {
        if (isActive) {
          setError(err.message || "Something went wrong.");
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      isActive = false;
    };
  }, []);

  return {
    products,
    loading,
    error,
  };
}

export default useProducts;
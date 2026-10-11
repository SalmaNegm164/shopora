
import ProductCard from "./ProductCard";
import useProducts from "../hooks/useProducts";
import { RefreshCw, PackageOpen } from "lucide-react";
import "../styles/ProductGrid.css";

function ProductGrid({
  productsOverride,
  onAddToCart,
  onToggleWishlist,
  favorites = [],
  limit,
}) {
  const { products, loading, error } = useProducts();

  const sourceProducts = productsOverride ?? products;

  const fashionProducts = sourceProducts.filter((product) => {
    const category = product.category?.toLowerCase() ?? "";

    return (
      category.includes("clothing") ||
      category.includes("jewelery") ||
      category.includes("jewelry")
    );
  });

  const displayedProducts =
    typeof limit === "number"
      ? fashionProducts.slice(0, limit)
      : fashionProducts;

  if (productsOverride === undefined && loading) {
    return (
      <div className="product-grid-state" role="status">
        <div className="product-grid-loader" />
        <p>Discovering beautiful pieces...</p>
      </div>
    );
  }

  if (productsOverride === undefined && error) {
    return (
      <div className="product-grid-state product-grid-error" role="alert">
        <PackageOpen size={36} />
        <h3>Unable to load products</h3>
        <p>{error}</p>
        <button
          type="button"
          className="product-grid-retry"
          onClick={() => window.location.reload()}
        >
          <RefreshCw size={16} />
          Try Again
        </button>
      </div>
    );
  }

  if (displayedProducts.length === 0) {
    return (
      <div className="product-grid-state">
        <PackageOpen size={36} />
        <h3>No products found</h3>
        <p>Please try a different search or category.</p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {displayedProducts.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          onToggleWishlist={onToggleWishlist}
          isFavorite={favorites.includes(product.id)}
        />
      ))}
    </div>
  );
}

export default ProductGrid;

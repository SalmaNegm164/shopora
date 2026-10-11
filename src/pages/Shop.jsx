import { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import ProductGrid from "../components/ProductGrid";
import useProducts from "../hooks/useProducts";
import "../styles/Pages.css";

function Shop({
  initialSearch = "",
  onAddToCart,
  onToggleWishlist,
  favorites = [],
}) {
  const { products, loading, error } = useProducts();
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");

  useEffect(() => {
    setSearchTerm(initialSearch);
  }, [initialSearch]);

  const categories = useMemo(() => {
    const fashionCategories = products
      .map((product) => product.category?.toLowerCase())
      .filter(
        (category) =>
          category?.includes("clothing") ||
          category?.includes("jewelery") ||
          category?.includes("jewelry")
      );

    return [...new Set(fashionCategories)].sort();
  }, [products]);

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const category = product.category?.toLowerCase() ?? "";

      return (
        category.includes("clothing") ||
        category.includes("jewelery") ||
        category.includes("jewelry")
      );
    });

    if (selectedCategory !== "all") {
      result = result.filter(
        (product) =>
          product.category?.toLowerCase() === selectedCategory
      );
    }

    const query = searchTerm.trim().toLowerCase();

    if (query) {
      result = result.filter(
        (product) =>
          product.title?.toLowerCase().includes(query) ||
          product.description?.toLowerCase().includes(query) ||
          product.category?.toLowerCase().includes(query)
      );
    }

    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [products, selectedCategory, searchTerm, sortBy]);

  const categoryLabel = (category) =>
    category
      .replace(/'/g, "")
      .replace(/\b\w/g, (letter) => letter.toUpperCase());

  function clearFilters() {
    setSearchTerm("");
    setSelectedCategory("all");
    setSortBy("featured");
  }

  return (
    <main className="shop-page">
      <section className="page-banner shop-banner">
        <div className="container">
          <span className="page-eyebrow">THE SHOPORA EDIT</span>
          <h1>Find Your Signature Style</h1>
          <p>Explore timeless pieces selected for your everyday elegance.</p>
        </div>
      </section>

      <section className="container shop-content">
        <div className="shop-toolbar">
          <div className="shop-results">
            <span className="shop-results-label">Our Collection</span>
            <span className="shop-results-count">
              {loading
                ? "Loading products..."
                : `${filteredProducts.length} products`}
            </span>
          </div>

          <div className="shop-controls">
            <label className="shop-search">
              <Search size={18} />
              <input
                type="search"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                aria-label="Search products"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  aria-label="Clear search"
                >
                  <X size={16} />
                </button>
              )}
            </label>

            <label className="shop-filter">
              <SlidersHorizontal size={17} />
              <select
                value={selectedCategory}
                onChange={(event) => setSelectedCategory(event.target.value)}
                aria-label="Filter by category"
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {categoryLabel(category)}
                  </option>
                ))}
              </select>
            </label>

            <label className="shop-sort">
              <span>Sort:</span>
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                aria-label="Sort products"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </label>
          </div>
        </div>

        {error ? (
          <div className="shop-message">
            <h2>We couldn't load the collection.</h2>
            <p>{error}</p>
            <button
              type="button"
              className="shop-reset-button"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        ) : loading ? (
          <ProductGrid />
        ) : filteredProducts.length > 0 ? (
          <ProductGrid
  productsOverride={filteredProducts}
  onAddToCart={onAddToCart}
  onToggleWishlist={onToggleWishlist}
  favorites={favorites}
/>
        ) : (
          <div className="shop-message">
            <h2>No pieces found</h2>
            <p>Try a different search or category.</p>
            <button
              type="button"
              className="shop-reset-button"
              onClick={clearFilters}
            >
              Clear Filters
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

export default Shop;

import { Heart, ArrowRight, Trash2 } from "lucide-react";
import ProductCard from "../components/ProductCard";
import useProducts from "../hooks/useProducts";
import { useWishlist } from "../context/WishlistContext";
import "../styles/Pages.css";

function Wishlist({ onAddToCart }) {
  const { products, loading, error } = useProducts();
  const { favorites, toggleWishlist, clearWishlist } = useWishlist();

  const favoriteProducts = products.filter((product) =>
    favorites.includes(product.id)
  );

  return (
    <main className="wishlist-page container">
      <div className="wishlist-heading">
        <div>
          <span className="page-eyebrow">YOUR PERSONAL COLLECTION</span>
          <h1>My Wishlist</h1>
          <p>All the pieces you love, gathered in one place.</p>
        </div>

        {favorites.length > 0 && !loading && (
          <button
            type="button"
            className="wishlist-clear-button"
            onClick={clearWishlist}
          >
            <Trash2 size={16} />
            Clear Wishlist
          </button>
        )}
      </div>

      {loading ? (
        <div className="product-grid-state" role="status">
          <div className="product-grid-loader" />
          <p>Loading your favorite pieces...</p>
        </div>
      ) : error ? (
        <div className="product-grid-state" role="alert">
          <h3>Unable to load your wishlist</h3>
          <p>{error}</p>
          <button
            type="button"
            className="wishlist-action-button"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      ) : favoriteProducts.length === 0 ? (
        <div className="wishlist-empty">
          <div className="wishlist-empty-icon">
            <Heart size={32} strokeWidth={1.3} />
          </div>
          <h2>Your wishlist is waiting</h2>
          <p>
            Save the pieces you love and they will appear here.
          </p>
          <button
            type="button"
            className="wishlist-action-button"
            onClick={() => {
              window.location.hash = "shop-all";
            }}
          >
            Explore the Shop
            <ArrowRight size={17} />
          </button>
        </div>
      ) : (
        <>
          <div className="wishlist-results-heading">
            <span>{favoriteProducts.length} saved pieces</span>
          </div>

          <div className="product-grid">
            {favoriteProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onToggleWishlist={toggleWishlist}
                isFavorite={true}
              />
            ))}
          </div>
        </>
      )}
    </main>
  );
}

export default Wishlist;

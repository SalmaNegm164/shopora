
import { Heart, ShoppingBag, Star, Eye } from "lucide-react";
import "../styles/ProductCard.css";

function ProductCard({
  product,
  onAddToCart,
  onToggleWishlist,
  isFavorite = false,
}) {
  if (!product) return null;

  const price = Number(product.price ?? 0);
  const rating = Number(product.rating ?? 0);

  const formattedCategory = (product.category ?? "Fashion")
    .replace(/'/g, "")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

  function handleAddToCart(event) {
    event.stopPropagation();
    onAddToCart?.(product);
  }

  function handleToggleWishlist(event) {
    event.stopPropagation();
    onToggleWishlist?.(product);
  }

  return (
    <article className="product-card">
      <div className="product-card-image">
        <img
          src={product.image}
          alt={product.title || "Shopora product"}
          loading="lazy"
        />

        <span className="product-category-badge">
          {formattedCategory}
        </span>

        <button
          type="button"
          className={`product-wishlist-button ${
            isFavorite ? "is-favorite" : ""
          }`}
          onClick={handleToggleWishlist}
          aria-label={
            isFavorite ? "Remove from wishlist" : "Add to wishlist"
          }
        >
          <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
        </button>

        <div className="product-card-overlay">
          <button
            type="button"
            className="product-quick-view"
            onClick={() =>
              window.location.hash = `product/${product.id}`
            }
          >
            <Eye size={17} />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      <div className="product-card-content">
        <div className="product-card-rating">
          <Star size={14} fill="currentColor" />
          <span>{rating.toFixed(1)}</span>
          <span className="product-rating-count">
            ({Number(product.ratingCount ?? 0)})
          </span>
        </div>

        <h3 className="product-card-title" title={product.title}>
          {product.title}
        </h3>

        <div className="product-card-bottom">
          <span className="product-card-price">
            ${price.toFixed(2)}
          </span>

          <button
            type="button"
            className="product-add-button"
            onClick={handleAddToCart}
            aria-label={`Add ${product.title} to cart`}
          >
            <ShoppingBag size={17} />
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;

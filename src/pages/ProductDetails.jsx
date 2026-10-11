
import { useEffect, useState } from "react";
import { ArrowLeft, Minus, Plus, ShoppingBag, Star } from "lucide-react";
import { getProductById } from "../services/productService";
import "../styles/Pages.css";

function ProductDetails({
  productId,
  onAddToCart,
}) {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isActive = true;

    async function loadProduct() {
      try {
        setLoading(true);
        setError("");

        const data = await getProductById(productId);

        if (isActive) {
          setProduct(data);
        }
      } catch (err) {
        if (isActive) {
          setError(err.message || "Unable to load product details.");
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    }

    if (productId != null) {
      loadProduct();
    } else {
      setProduct(null);
      setError("No product was selected.");
      setLoading(false);
    }

    return () => {
      isActive = false;
    };
  }, [productId]);

  if (loading) {
    return (
      <main className="container product-details-state" role="status">
        <div className="product-grid-loader" />
        <p>Loading product details...</p>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="container product-details-state" role="alert">
        <h1>Product unavailable</h1>
        <p>{error || "We couldn't find this product."}</p>
        <button
          type="button"
          className="product-details-back"
          onClick={() => {
            window.location.hash = "shop-all";
          }}
        >
          <ArrowLeft size={17} />
          Back to Shop
        </button>
      </main>
    );
  }

  const category = (product.category || "Fashion")
    .replace(/'/g, "")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

  function handleAddToCart() {
    for (let index = 0; index < quantity; index += 1) {
      onAddToCart?.(product);
    }
  }

  return (
    <main className="container product-details-page">
      <button
        type="button"
        className="product-details-back"
        onClick={() => {
          window.location.hash = "shop-all";
        }}
      >
        <ArrowLeft size={17} />
        Back to Shop
      </button>

      <div className="product-details-layout">
        <div className="product-details-image">
          <img src={product.image} alt={product.title} />
        </div>

        <div className="product-details-info">
          <span className="page-eyebrow">{category}</span>

          <h1>{product.title}</h1>

          <div className="product-details-rating">
            <Star size={17} fill="currentColor" />
            <strong>{Number(product.rating ?? 0).toFixed(1)}</strong>
            <span>
              ({Number(product.ratingCount ?? 0)} reviews)
            </span>
          </div>

          <p className="product-details-price">
            ${Number(product.price ?? 0).toFixed(2)}
          </p>

          <div className="product-details-divider" />

          <h2>Product Description</h2>
          <p className="product-details-description">
            {product.description}
          </p>

          <div className="product-details-quantity">
            <span>Quantity</span>

            <div className="product-quantity-control">
              <button
                type="button"
                onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                disabled={quantity <= 1}
                aria-label="Decrease quantity"
              >
                <Minus size={16} />
              </button>

              <span>{quantity}</span>

              <button
                type="button"
                onClick={() => setQuantity((current) => current + 1)}
                aria-label="Increase quantity"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          <button
            type="button"
            className="product-details-add-button"
            onClick={handleAddToCart}
          >
            <ShoppingBag size={18} />
            Add to Bag — ${(Number(product.price ?? 0) * quantity).toFixed(2)}
          </button>

          <p className="product-details-note">
            A timeless addition to your collection.
          </p>
        </div>
      </div>
    </main>
  );
}

export default ProductDetails;

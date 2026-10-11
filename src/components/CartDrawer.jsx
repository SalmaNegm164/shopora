
import { useEffect } from "react";
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from "lucide-react";
import "../styles/CartDrawer.css";

function CartDrawer({
  isOpen = false,
  onClose,
  cartItems = [],
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) {
  useEffect(() => {
    if (!isOpen) return undefined;

    function handleEscape(event) {
      if (event.key === "Escape") onClose?.();
    }

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const totalItems = cartItems.reduce(
    (total, item) => total + Math.max(0, Number(item.quantity) || 0),
    0
  );

  const subtotal = cartItems.reduce(
    (total, item) =>
      total + (Number(item.price) || 0) * Math.max(0, Number(item.quantity) || 0),
    0
  );

  if (!isOpen) return null;

  return (
    <div className="cart-drawer-overlay" onClick={onClose}>
      <aside
        className="cart-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-drawer-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="cart-drawer-header">
          <div>
            <h2 id="cart-drawer-title">Your Bag</h2>
            <p>{totalItems} {totalItems === 1 ? "item" : "items"}</p>
          </div>

          <button
            type="button"
            className="cart-close-button"
            onClick={onClose}
            aria-label="Close shopping bag"
          >
            <X size={22} />
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="cart-empty">
            <div className="cart-empty-icon">
              <ShoppingBag size={30} />
            </div>
            <h3>Your bag is waiting</h3>
            <p>Discover your favorite pieces and add them to your bag.</p>
            <button
              type="button"
              className="cart-continue-button"
              onClick={onClose}
            >
              Continue Shopping
              <ArrowRight size={16} />
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items-list">
              {cartItems.map((item) => (
                <article className="cart-item" key={item.id}>
                  <div className="cart-item-image">
                    <img src={item.image} alt={item.title} />
                  </div>

                  <div className="cart-item-details">
                    <h3>{item.title}</h3>
                    <p className="cart-item-price">
                      ${(Number(item.price) || 0).toFixed(2)}
                    </p>

                    <div className="cart-item-actions">
                      <div className="cart-quantity-control">
                        <button
                          type="button"
                          onClick={() =>
                            onUpdateQuantity?.(
                              item.id,
                              Math.max(1, (Number(item.quantity) || 1) - 1)
                            )
                          }
                          aria-label={`Decrease quantity of ${item.title}`}
                        >
                          <Minus size={13} />
                        </button>

                        <span>{item.quantity}</span>

                        <button
                          type="button"
                          onClick={() =>
                            onUpdateQuantity?.(
                              item.id,
                              (Number(item.quantity) || 1) + 1
                            )
                          }
                          aria-label={`Increase quantity of ${item.title}`}
                        >
                          <Plus size={13} />
                        </button>
                      </div>

                      <button
                        type="button"
                        className="cart-remove-button"
                        onClick={() => onRemoveItem?.(item.id)}
                        aria-label={`Remove ${item.title}`}
                      >
                        <Trash2 size={15} />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="cart-drawer-footer">
              <div className="cart-subtotal">
                <span>Subtotal</span>
                <strong>${subtotal.toFixed(2)}</strong>
              </div>

              <p className="cart-shipping-note">
                Shipping and taxes are calculated at checkout.
              </p>

              <button
                type="button"
                className="cart-checkout-button"
                onClick={onCheckout}
              >
                Proceed to Checkout
                <ArrowRight size={17} />
              </button>

              <button
                type="button"
                className="cart-continue-link"
                onClick={onClose}
              >
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

export default CartDrawer;


import { useState } from "react";
import { ArrowLeft, CheckCircle2, LockKeyhole, ShoppingBag } from "lucide-react";
import "../styles/Pages.css";

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  notes: "",
};

function Checkout({
  cartItems = [],
  cartTotal,
  onUpdateQuantity,
  onRemoveItem,
  onPlaceOrder,
}) {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const calculatedTotal = cartItems.reduce(
    (total, item) =>
      total + (Number(item.price) || 0) * (Number(item.quantity) || 0),
    0
  );

  const subtotal = Number.isFinite(Number(cartTotal))
    ? Number(cartTotal)
    : calculatedTotal;

  const shipping = cartItems.length > 0 ? 0 : 0;
  const total = subtotal + shipping;

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setFormError("");

    if (cartItems.length === 0) {
      setFormError("Your shopping bag is empty.");
      return;
    }

    if (!form.fullName.trim() || !form.email.trim() || !form.phone.trim() || !form.address.trim() || !form.city.trim()) {
      setFormError("Please complete all required fields.");
      return;
    }

    setSubmitting(true);

    try {
      if (onPlaceOrder) {
        await onPlaceOrder({
          customer: form,
          items: cartItems,
          subtotal,
          shipping,
          total,
        });
      }

      setSubmitted(true);
    } catch {
      setFormError("We couldn't process your order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <main className="container checkout-success">
        <CheckCircle2 size={56} />
        <span className="page-eyebrow">THANK YOU</span>
        <h1>Your order request is complete.</h1>
        <p>
          Your checkout information has been submitted. Order processing and
          payment confirmation will depend on the store's order system.
        </p>
        <button
          type="button"
          className="checkout-primary-button"
          onClick={() => {
            window.location.hash = "home";
          }}
        >
          Continue Shopping
        </button>
      </main>
    );
  }

  return (
    <main className="container checkout-page">
      <button
        type="button"
        className="product-details-back"
        onClick={() => {
          window.location.hash = "shop-all";
        }}
      >
        <ArrowLeft size={17} />
        Continue Shopping
      </button>

      <div className="checkout-heading">
        <span className="page-eyebrow">ALMOST YOURS</span>
        <h1>Checkout</h1>
        <p>Complete your details to continue with your order.</p>
      </div>

      {cartItems.length === 0 ? (
        <div className="shop-message">
          <ShoppingBag size={36} />
          <h2>Your bag is empty</h2>
          <p>Add a few favorite pieces before checking out.</p>
          <button
            type="button"
            className="shop-reset-button"
            onClick={() => {
              window.location.hash = "shop-all";
            }}
          >
            Explore the Shop
          </button>
        </div>
      ) : (
        <div className="checkout-layout">
          <form className="checkout-form" onSubmit={handleSubmit}>
            <section className="checkout-form-section">
              <h2>Contact Information</h2>

              <label className="checkout-field">
                Full Name *
                <input
                  type="text"
                  name="fullName"
                  autoComplete="name"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </label>

              <div className="checkout-field-row">
                <label className="checkout-field">
                  Email Address *
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                  />
                </label>

                <label className="checkout-field">
                  Phone Number *
                  <input
                    type="tel"
                    name="phone"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Your phone number"
                    required
                  />
                </label>
              </div>
            </section>

            <section className="checkout-form-section">
              <h2>Delivery Address</h2>

              <label className="checkout-field">
                Street Address *
                <input
                  type="text"
                  name="address"
                  autoComplete="street-address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Street, building, apartment"
                  required
                />
              </label>

              <label className="checkout-field">
                City *
                <input
                  type="text"
                  name="city"
                  autoComplete="address-level2"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="Your city"
                  required
                />
              </label>

              <label className="checkout-field">
                Delivery Notes
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  placeholder="Landmarks or special delivery instructions"
                  rows={3}
                />
              </label>
            </section>

            {formError && (
              <p className="checkout-error" role="alert">
                {formError}
              </p>
            )}

            <button
              type="submit"
              className="checkout-primary-button"
              disabled={submitting}
            >
              <LockKeyhole size={17} />
              {submitting ? "Processing..." : "Place Order"}
            </button>

            <p className="checkout-secure-note">
              This demo does not collect payment details or process payments.
            </p>
          </form>

          <aside className="checkout-summary">
            <h2>Order Summary</h2>

            <div className="checkout-summary-items">
              {cartItems.map((item) => (
                <article className="checkout-summary-item" key={item.id}>
                  <img src={item.image} alt={item.title} />

                  <div className="checkout-summary-item-info">
                    <h3>{item.title}</h3>
                    <p>Qty: {item.quantity}</p>
                    <strong>
                      ${((Number(item.price) || 0) * (Number(item.quantity) || 0)).toFixed(2)}
                    </strong>

                    <div className="checkout-summary-actions">
                      <button
                        type="button"
                        onClick={() =>
                          onUpdateQuantity?.(
                            item.id,
                            Math.max(1, (Number(item.quantity) || 1) - 1)
                          )
                        }
                        disabled={Number(item.quantity) <= 1}
                      >
                        Decrease
                      </button>

                      <button
                        type="button"
                        onClick={() => onRemoveItem?.(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="checkout-summary-line">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="checkout-summary-line">
              <span>Shipping</span>
              <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
            </div>

            <div className="checkout-summary-total">
              <span>Total</span>
              <strong>${total.toFixed(2)}</strong>
            </div>
          </aside>
        </div>
      )}
    </main>
  );
}

export default Checkout;

import { useCallback, useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";
import { useCart } from "./context/CartContext";
import { useWishlist } from "./context/WishlistContext";

function getCurrentRoute() {
  const hash = window.location.hash.slice(1) || "home";
  const queryIndex = hash.indexOf("?");
  const path = queryIndex === -1 ? hash : hash.slice(0, queryIndex);
  const queryString = queryIndex === -1 ? "" : hash.slice(queryIndex + 1);

  return {
    path,
    search: new URLSearchParams(queryString).get("search") || "",
  };
}

function App() {
  const [route, setRoute] = useState(getCurrentRoute);
  const [cartOpen, setCartOpen] = useState(false);

  const {
    cartItems,
    cartCount,
    cartTotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  } = useCart();

  const {
    favorites,
    wishlistCount,
    toggleWishlist,
    isFavorite,
  } = useWishlist();

  useEffect(() => {
    function handleHashChange() {
      setRoute(getCurrentRoute());
      setCartOpen(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const navigate = useCallback((path) => {
    if (window.location.hash === `#${path}`) {
      setRoute(getCurrentRoute());
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    window.location.hash = path;
  }, []);

  function handleAddToCart(product) {
    addToCart(product);
    setCartOpen(true);
  }

  async function handlePlaceOrder(order) {
    if (!order || !Array.isArray(order.items) || order.items.length === 0) {
      throw new Error("The shopping bag is empty.");
    }

    clearCart();
  }

  const sharedProductProps = {
    onAddToCart: handleAddToCart,
    onToggleWishlist: toggleWishlist,
    favorites,
    isFavorite,
  };

  function renderPage() {
    if (route.path === "home" || route.path === "") {
      return <Home {...sharedProductProps} />;
    }

    if (
      route.path === "shop-all" ||
      route.path === "shop"
    ) {
      return (
        <Shop
          key={route.path}
          initialSearch={route.search}
          {...sharedProductProps}
        />
      );
    }

    if (route.path === "collections" || route.path === "about" || route.path === "contact") {
      return <Home {...sharedProductProps} />;
    }

    if (route.path === "wishlist") {
      return <Wishlist onAddToCart={handleAddToCart} />;
    }

    if (route.path === "checkout") {
      return (
        <Checkout
          cartItems={cartItems}
          cartTotal={cartTotal}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeFromCart}
          onPlaceOrder={handlePlaceOrder}
        />
      );
    }

    if (route.path.startsWith("product/")) {
      const productId = route.path.split("/")[1];

      return (
        <ProductDetails
          productId={productId}
          onAddToCart={handleAddToCart}
        />
      );
    }

    return <NotFound />;
  }

  return (
    <>
      <Navbar
        cartCount={cartCount}
        wishlistCount={wishlistCount}
        onCartClick={() => setCartOpen(true)}
      />

      {renderPage()}

      <Footer />

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onCheckout={() => {
          setCartOpen(false);
          navigate("checkout");
        }}
      />
    </>
  );
}

export default App;
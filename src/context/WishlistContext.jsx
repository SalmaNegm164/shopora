
import { createContext, useContext, useEffect, useState } from "react";

const WishlistContext = createContext(null);
const WISHLIST_STORAGE_KEY = "shopora-wishlist";

function getInitialWishlist() {
  try {
    const savedWishlist = localStorage.getItem(WISHLIST_STORAGE_KEY);

    if (!savedWishlist) return [];

    const parsedWishlist = JSON.parse(savedWishlist);

    if (!Array.isArray(parsedWishlist)) return [];

    return parsedWishlist.filter(
      (id) => typeof id === "number" || typeof id === "string"
    );
  } catch {
    return [];
  }
}

export function WishlistProvider({ children }) {
  const [favorites, setFavorites] = useState(getInitialWishlist);

  useEffect(() => {
    try {
      localStorage.setItem(
        WISHLIST_STORAGE_KEY,
        JSON.stringify(favorites)
      );
    } catch {
      console.error("Unable to save the wishlist.");
    }
  }, [favorites]);

  function toggleWishlist(product) {
    const productId =
      typeof product === "object" && product !== null
        ? product.id
        : product;

    if (productId == null) return;

    setFavorites((currentFavorites) =>
      currentFavorites.includes(productId)
        ? currentFavorites.filter((id) => id !== productId)
        : [...currentFavorites, productId]
    );
  }

  function removeFromWishlist(productId) {
    setFavorites((currentFavorites) =>
      currentFavorites.filter((id) => id !== productId)
    );
  }

  function isFavorite(productId) {
    return favorites.includes(productId);
  }

  function clearWishlist() {
    setFavorites([]);
  }

  const value = {
    favorites,
    wishlistCount: favorites.length,
    toggleWishlist,
    removeFromWishlist,
    isFavorite,
    clearWishlist,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error(
      "useWishlist must be used within a WishlistProvider."
    );
  }

  return context;
}

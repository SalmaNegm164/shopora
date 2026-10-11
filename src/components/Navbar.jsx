
import { useState } from "react";
import {
  Search,
  ShoppingBag,
  Menu,
  X,
  Heart,
  UserRound,
  ChevronDown,
} from "lucide-react";
import "../styles/Navbar.css";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Shop", href: "#shop-all", hasDropdown: true },
  { label: "Collections", href: "#collections" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

function Navbar({ cartCount = 0, wishlistCount = 0, onCartClick }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  const handleSearch = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const query = formData.get("search")?.toString().trim();

    if (query) {
      window.location.hash = `shop-all?search=${encodeURIComponent(query)}`;
      setSearchOpen(false);
      closeMenu();
    }
  };

  return (
    <header className="shopora-header">
      <div className="shopora-announcement">
        <p>Complimentary shipping on orders over $150</p>
      </div>

      <nav className="shopora-navbar container">
        <button
          type="button"
          className="navbar-icon mobile-menu-toggle"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>

        <a
          href="#home"
          className="shopora-logo"
          aria-label="Shopora home"
          onClick={closeMenu}
        >
          SHOPORA<span>.</span>
          <small>THE ART OF EVERYDAY LUXURY</small>
        </a>

        <div className={`navbar-links ${menuOpen ? "is-open" : ""}`}>
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="navbar-link"
              onClick={closeMenu}
            >
              {link.label}
              {link.hasDropdown && (
                <ChevronDown size={14} className="navbar-chevron" />
              )}
            </a>
          ))}

          <div className="mobile-nav-actions">
            <a href="#account" onClick={closeMenu}>
              <UserRound size={18} />
              My Account
            </a>

            <a href="#wishlist" onClick={closeMenu}>
              <Heart size={18} />
              My Wishlist
              {wishlistCount > 0 && (
                <span className="navbar-mobile-count">{wishlistCount}</span>
              )}
            </a>

            <button
              type="button"
              onClick={() => {
                closeMenu();
                onCartClick?.();
              }}
            >
              <ShoppingBag size={18} />
              My Bag
              {cartCount > 0 && (
                <span className="navbar-mobile-count">{cartCount}</span>
              )}
            </button>
          </div>
        </div>

        <div className="navbar-actions">
          <button
            type="button"
            className="navbar-icon search-toggle"
            aria-label={searchOpen ? "Close search" : "Open search"}
            aria-expanded={searchOpen}
            onClick={() => setSearchOpen((open) => !open)}
          >
            {searchOpen ? <X size={21} /> : <Search size={21} />}
          </button>

          <a
            href="#account"
            className="navbar-icon account-link"
            aria-label="My account"
          >
            <UserRound size={21} />
          </a>

          <a
            href="#wishlist"
            className="navbar-icon wishlist-link"
            aria-label={`My wishlist${wishlistCount ? `, ${wishlistCount} items` : ""}`}
          >
            <Heart size={21} />
            {wishlistCount > 0 && (
              <span className="wishlist-count">{wishlistCount}</span>
            )}
          </a>

          <button
            type="button"
            className="navbar-icon cart-link"
            aria-label={`Shopping bag, ${cartCount} items`}
            onClick={onCartClick}
          >
            <ShoppingBag size={21} />
            <span className="cart-count">{cartCount}</span>
          </button>
        </div>
      </nav>

      {searchOpen && (
        <div className="navbar-search-panel">
          <form className="navbar-search-form container" onSubmit={handleSearch}>
            <Search size={20} />

            <input
              type="search"
              name="search"
              placeholder="Search products, collections..."
              aria-label="Search products"
              autoFocus
            />

            <button type="submit">SEARCH</button>
          </form>
        </div>
      )}
    </header>
  );
}

export default Navbar;

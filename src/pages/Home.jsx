import Hero from "../components/Hero";
import CategorySection from "../components/CategorySection";
import ProductGrid from "../components/ProductGrid";
import { ArrowRight } from "lucide-react";
import "../styles/Pages.css";

function Home({ onAddToCart, onToggleWishlist, favorites = [] }) {
  return (
    <main className="home-page">
      <Hero />

      <CategorySection />

      <section className="container home-featured section-padding" id="shop">
        <div className="home-featured-heading">
          <div className="section-heading">
            <span className="page-eyebrow">CURATED FOR YOU</span>
            <h2>Timeless Favorites</h2>
            <p>Pieces worth keeping, styles worth repeating.</p>
          </div>

          <a className="home-view-all" href="#shop-all">
            View All Products
            <ArrowRight size={17} />
          </a>
        </div>

        <ProductGrid
          limit={8}
          onAddToCart={onAddToCart}
          onToggleWishlist={onToggleWishlist}
          favorites={favorites}
        />

        <div className="home-mobile-view-all">
          <a href="#shop-all">
            Explore All Products
            <ArrowRight size={16} />
          </a>
        </div>
      </section>

      <section className="home-promo">
        <div className="container home-promo-content">
          <span className="page-eyebrow">THE ART OF EVERYDAY STYLE</span>
          <h2>Less, But Better.</h2>
          <p>
            Discover thoughtfully selected pieces that make getting dressed
            feel effortless.
          </p>
          <a href="#shop-all" className="home-promo-button">
            Explore the Collection
            <ArrowRight size={17} />
          </a>
        </div>
      </section>
    </main>
  );
}

export default Home;
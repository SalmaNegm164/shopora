import { ArrowRight } from "lucide-react";
import "../styles/Hero.css";

function Hero() {
  return (
    <section className="shopora-hero" id="home">
      <div className="hero-image">
        <img
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=2000&q=85"
          alt="Elegant contemporary fashion collection"
          fetchPriority="high"
        />
      </div>

      <div className="hero-overlay"></div>

      <div className="hero-content container">
        <span className="hero-eyebrow">
          THE NEW SEASON COLLECTION
        </span>

        <h1>
          Elegance in
          <br />
          Every <span>Detail.</span>
        </h1>

        <p className="hero-description">
          Discover timeless pieces designed to elevate your
          everyday style with effortless sophistication.
        </p>

        <div className="hero-actions">
          <a href="#shop" className="hero-button">
            SHOP COLLECTION
            <ArrowRight size={17} />
          </a>

          <a href="#collections" className="hero-secondary-link">
            Explore our story
          </a>
        </div>

        <div className="hero-bottom">
          <span>TIMELESS STYLE. MODERN LIVING.</span>
          <span className="hero-slide-number">01 — 03</span>
        </div>
      </div>
    </section>
  );
}

export default Hero;

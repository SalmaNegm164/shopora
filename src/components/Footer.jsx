import {
  ArrowRight,
  Mail,
  MapPin,
} from "lucide-react";
import "../styles/Footer.css";

const footerLinks = {
  explore: [
    { label: "Home", href: "#home" },
    { label: "Shop All", href: "#shop-all" },
    { label: "Collections", href: "#collections" },
    { label: "Our Story", href: "#about" },
  ],
  support: [
    { label: "Contact Us", href: "#contact" },
    { label: "Shipping & Delivery", href: "#shipping" },
    { label: "Returns & Exchanges", href: "#returns" },
    { label: "FAQs", href: "#faqs" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#privacy" },
    { label: "Terms & Conditions", href: "#terms" },
  ],
};

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="shopora-footer" id="contact">
      <div className="footer-main container">
        <div className="footer-brand">
          <a href="#home" className="footer-logo">
            SHOPORA<span>.</span>
          </a>

          <p className="footer-brand-description">
            Thoughtful fashion, timeless elegance, and everyday
            essentials designed to make every moment feel special.
          </p>

          <div className="footer-socials">
            <a href="#instagram" aria-label="Instagram">IG</a>
            <a href="#facebook" aria-label="Facebook">FB</a>
            <a href="#youtube" aria-label="YouTube">YT</a>
          </div>

        </div>

        <div className="footer-column">
          <h3>Explore</h3>
          {footerLinks.explore.map((link) => (
            <a key={link.label} href={link.href}>
              {link.label}
            </a>
          ))}
        </div>

        <div className="footer-column">
          <h3>Customer Care</h3>
          {footerLinks.support.map((link) => (
            <a key={link.label} href={link.href}>
              {link.label}
            </a>
          ))}
        </div>

        <div className="footer-newsletter">
          <h3>Join Our World</h3>
          <p>
            Subscribe for new arrivals, exclusive offers, and a
            little inspiration in your inbox.
          </p>

          <form
            className="footer-newsletter-form"
            onSubmit={(event) => {
              event.preventDefault();
              const form = event.currentTarget;
              const email = new FormData(form).get("email");

              if (email) {
                alert("Thank you for joining the Shopora community!");
                form.reset();
              }
            }}
          >
            <label className="footer-email-label" htmlFor="footer-email">
              Email address
            </label>
            <div className="footer-email-input">
              <input
                id="footer-email"
                name="email"
                type="email"
                placeholder="Your email address"
                autoComplete="email"
                required
              />
              <button type="submit" aria-label="Subscribe to newsletter">
                <ArrowRight size={20} />
              </button>
            </div>
          </form>

          <div className="footer-contact">
            <p>
              <Mail size={15} />
              hello@shopora.com
            </p>
            <p>
              <MapPin size={15} />
              Cairo, Egypt
            </p>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-inner container">
          <p>© {currentYear} Shopora. All rights reserved.</p>

          <div className="footer-legal-links">
            {footerLinks.legal.map((link) => (
              <a key={link.label} href={link.href}>
                {link.label}
              </a>
            ))}
          </div>

          <p className="footer-made-with">
            Made with care <span>♥</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
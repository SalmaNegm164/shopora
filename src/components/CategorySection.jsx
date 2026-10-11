import { ArrowUpRight } from "lucide-react";
import "../styles/CategorySection.css";

const categories = [
  {
    id: 1,
    name: "Clothing",
    subtitle: "Refined essentials",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=85",
    className: "category-large",
    href: "#shop",
  },
  {
    id: 2,
    name: "Bags",
    subtitle: "Everyday elegance",
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=85",
    className: "category-small",
    href: "#shop",
  },
  {
    id: 3,
    name: "Accessories",
    subtitle: "The finishing touch",
    image:
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=800&q=85",
    className: "category-small",
    href: "#shop",
  },
];

function CategorySection() {
  return (
    <section className="shopora-categories section-padding" id="collections">
      <div className="container">
        <div className="categories-heading">
          <div>
            <span className="categories-eyebrow">CURATED FOR YOU</span>
            <h2>Discover Your Style</h2>
            <p>
              Thoughtfully selected pieces for every side of you.
            </p>
          </div>

          <a href="#shop" className="categories-view-all">
            VIEW ALL
            <ArrowUpRight size={17} />
          </a>
        </div>

        <div className="categories-grid">
          {categories.map((category) => (
            <a
              key={category.id}
              href={category.href}
              className={`category-card ${category.className}`}
            >
              <img
                src={category.image}
                alt={category.name}
                loading="lazy"
              />

              <div className="category-image-overlay"></div>

              <div className="category-card-content">
                <div>
                  <span>{category.subtitle}</span>
                  <h3>{category.name}</h3>
                </div>

                <span className="category-arrow" aria-hidden="true">
                  <ArrowUpRight size={19} />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CategorySection;
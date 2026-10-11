
import { ArrowLeft, Home } from "lucide-react";
import "../styles/Pages.css";

function NotFound() {
  return (
    <main className="not-found-page">
      <span className="not-found-code">404</span>

      <span className="page-eyebrow">A LITTLE DETOUR</span>

      <h1>This page is nowhere to be found.</h1>

      <p>
        The page may have moved, or the link might be incorrect.
        Let's get you back to discovering beautiful pieces.
      </p>

      <div className="not-found-actions">
        <button
          type="button"
          className="not-found-primary"
          onClick={() => {
            window.location.hash = "home";
          }}
        >
          <Home size={17} />
          Back to Home
        </button>

        <button
          type="button"
          className="not-found-secondary"
          onClick={() => {
            window.location.hash = "shop-all";
          }}
        >
          <ArrowLeft size={17} />
          Explore the Shop
        </button>
      </div>
    </main>
  );
}

export default NotFound;

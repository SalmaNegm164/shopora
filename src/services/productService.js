// Shopora Product API Service

const API_BASE_URL = "https://fakestoreapi.com";

export async function getProducts() {
  const response = await fetch(`${API_BASE_URL}/products`);

  if (!response.ok) {
    throw new Error("Failed to fetch products. Please try again.");
  }

  const products = await response.json();

  return products.map((product) => ({
    id: product.id,
    title: product.title,
    price: product.price,
    description: product.description,
    category: product.category,
    image: product.image,
    rating: product.rating?.rate ?? 0,
    ratingCount: product.rating?.count ?? 0,
  }));
}

export async function getProductById(id) {
  const response = await fetch(`${API_BASE_URL}/products/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch product details.");
  }

  const product = await response.json();

  return {
    id: product.id,
    title: product.title,
    price: product.price,
    description: product.description,
    category: product.category,
    image: product.image,
    rating: product.rating?.rate ?? 0,
    ratingCount: product.rating?.count ?? 0,
  };
}

export async function getProductCategories() {
  const response = await fetch(`${API_BASE_URL}/products/categories`);

  if (!response.ok) {
    throw new Error("Failed to fetch product categories.");
  }

  return response.json();
}
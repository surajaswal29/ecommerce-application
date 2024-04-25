// Localhost URI
export const MAIN_URI =
  import.meta.env.DEV && window.location.hostname === "localhost"
    ? "http://localhost:4000"
    : "https://ecommerce-app-i3h2.onrender.com";

// Production URI
export const FRONT_MAIN_URI = "https://ecommerce-app-i3h2.onrender.com";

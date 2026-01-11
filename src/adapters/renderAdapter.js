const isLocalhost = window.location.hostname === "localhost";
const renderBackendUrl = isLocalhost
  ? "http://localhost:3000"
  : "https://render-backend-g0u7.onrender.com";

function normalizeFestivalResponse() {
  return {
    success: false,
    message: "Festival response normalization is not implemented yet.",
    festivals: [],
  };
}

export async function fetchFestivals() {
  void renderBackendUrl;
  throw new Error("fetchFestivals is not implemented yet.");
}

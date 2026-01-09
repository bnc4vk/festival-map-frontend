import { createFestivalMap } from "./src/index.js";

const isLocalhost = window.location.hostname === "localhost";

mapboxgl.accessToken = isLocalhost
  ? "pk.eyJ1IjoiYm5jNHZrIiwiYSI6ImNtZmtuNzExZTBma2YyaXB5N2V3cnNqZHYifQ.81pi_QteF8dXpaLdAgAcbA"
  : "pk.eyJ1IjoiYm5jNHZrIiwiYSI6ImNtZmttd2l0NDBlcmgybXB6engyZ3NsOXMifQ.ispasH40DZiTItGPC7EuQQ";


const sampleFeatureIds = {
  country: ["US", "CA", "MX", "BR", "FR", "DE", "IN", "JP", "AU"],
  state: ["US-CA", "US-TX", "US-NY", "CA-ON", "CA-QC"],
  city: ["US-CA", "US-TX", "US-NY"],
};

async function fetchCounts({ levelId }) {
  await new Promise((resolve) => setTimeout(resolve, 600));
  const ids = sampleFeatureIds[levelId] || [];

  return {
    counts: ids.map((featureId) => ({
      featureId,
      count: Math.round(Math.random() * 250),
    })),
  };
}

createFestivalMap({
  containerId: "festival-map",
  dateRangeContainer: "festival-date-range",
  legendContainer: "festival-legend",
  loadingContainer: "festival-loading",
  fetchCounts,
  initialDateRange: {
    start: "2024-01-01",
    end: "2024-12-31",
  },
});

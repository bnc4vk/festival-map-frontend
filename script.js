import { createMap } from "map-ui-common/map-core";
import { getMapConfig } from "map-ui-common/map-core/config";

const { accessToken, mapCenter, zoomLevel } = getMapConfig();

if (!accessToken) {
  const warning = document.createElement("p");
  warning.textContent =
    "Add a Mapbox access token in getMapConfig to load the map.";
  warning.className = "map-warning";
  document.querySelector("main")?.prepend(warning);
} else {
  mapboxgl.accessToken = accessToken;

  createMap({
    containerId: "map",
    mapStyle: "mapbox://styles/mapbox/light-v10",
    center: mapCenter,
    zoom: zoomLevel,
    vectorSourceConfig: {
      id: "countries",
      source: {
        type: "vector",
        url: "mapbox://mapbox.country-boundaries-v1",
      },
    },
    layerConfig: {
      baseLayer: {
        id: "countries-base",
        type: "fill",
        "source-layer": "country_boundaries",
        paint: { "fill-color": "#dfe6e9" },
      },
      overlayLayer: {
        id: "countries-overlay",
        type: "fill",
        "source-layer": "country_boundaries",
        paint: { "fill-color": "#74b9ff" },
      },
    },
  });
}

import { createMap } from "map-ui-common/map-core";
import { getMapConfig } from "map-ui-common/map-core/config";
import { createSearchTile, SearchTileController } from "map-ui-common/ui/search-tile";
import { createDateRange } from "map-ui-common/ui/date-range";
import { createMapLegend } from "map-ui-common/ui/map-legend";

const { accessToken, mapCenter, zoomLevel } = getMapConfig();

if (!accessToken) {
  const warning = document.createElement("p");
  warning.textContent =
    "Add a Mapbox access token in getMapConfig to load the map.";
  warning.className = "map-warning";
  document.querySelector("main")?.prepend(warning);
} else {
  window.mapboxgl = mapboxgl;
  mapboxgl.accessToken = accessToken;

  const { map } = createMap({
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

  const searchTile = createSearchTile({ placeholder: "Search festivals" });
  const searchController = new SearchTileController({
    ...searchTile,
    onSubmit: async (query) => {
      console.log("Search:", query);
    },
  });

  document.querySelector("#search-tile")?.appendChild(searchTile.root);

  const handleDocumentClick = (event) => {
    if (!searchTile.root.contains(event.target)) {
      searchController.setExpanded(false);
    }
  };

  document.addEventListener("click", handleDocumentClick);

  const dateRange = createDateRange({
    startLabel: "Start date",
    endLabel: "End date",
    onChange: ({ start, end }) => {
      console.log("Date range:", start, end);
    },
  });

  document.querySelector("#date-range-tile")?.appendChild(dateRange.element);

  const legend = createMapLegend({
    statusColors: {
      Upcoming: "#6c5ce7",
      Ongoing: "#00b894",
      Past: "#b2bec3",
    },
  });

  document.querySelector("#legend")?.appendChild(legend.root);

  map.on("remove", () => {
    searchController.destroy();
    document.removeEventListener("click", handleDocumentClick);
  });
}

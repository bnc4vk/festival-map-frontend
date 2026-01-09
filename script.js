import { createLevelAwareMap } from "map-ui-common/map-core";
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

  const { map, setLevel } = createLevelAwareMap({
    containerId: "map",
    mapStyle: "mapbox://styles/mapbox/light-v10",
    center: mapCenter,
    zoom: zoomLevel,
    levels: [
      {
        id: "countries",
        minZoom: 0,
        maxZoom: 4,
        vectorSourceConfig: {
          id: "admin-0",
          source: {
            type: "vector",
            url: "mapbox://mapbox.mapbox-streets-v8",
          },
        },
        layerConfig: {
          baseLayer: {
            id: "countries-borders",
            type: "line",
            "source-layer": "admin",
            filter: ["==", ["get", "admin_level"], 0],
            paint: { "line-color": "#636e72", "line-width": 1 },
          },
        },
      },
      {
        id: "states",
        minZoom: 4,
        maxZoom: 7,
        vectorSourceConfig: {
          id: "admin-1",
          source: {
            type: "vector",
            url: "mapbox://mapbox.mapbox-streets-v8",
          },
        },
        layerConfig: {
          baseLayer: {
            id: "states-borders",
            type: "line",
            "source-layer": "admin",
            filter: ["==", ["get", "admin_level"], 1],
            paint: { "line-color": "#2d3436", "line-width": 0.8 },
          },
        },
      },
      {
        id: "cities",
        minZoom: 7,
        maxZoom: 24,
        vectorSourceConfig: {
          id: "admin-2",
          source: {
            type: "vector",
            url: "mapbox://mapbox.mapbox-streets-v8",
          },
        },
        layerConfig: {
          baseLayer: {
            id: "cities-borders",
            type: "line",
            "source-layer": "admin",
            filter: ["==", ["get", "admin_level"], 2],
            paint: { "line-color": "#0984e3", "line-width": 0.6 },
          },
        },
      },
    ],
  });
  setLevel("countries");

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

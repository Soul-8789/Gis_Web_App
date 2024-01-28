import { useMap } from "react-leaflet";
import { GeoSearchControl } from "leaflet-geosearch";
import React, { useEffect } from "react";
import L from "leaflet";

const SearchField = (props) => {
  const map = useMap();

  useEffect(() => {
    if (map) {
      // Define worldwide search bounds
      const worldSearchBounds = [
        [-90, -180], // Southwest corner of the world
        [90, 180], // Northeast corner of the world
      ];

      // Create a GeoSearchControl with the provider and search bounds
      const searchControl = new GeoSearchControl({
        provider: props.provider,
        style: "bar height:300px align-items:center",
        marker: {
          icon: new L.icon({
            iconUrl:
              "https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png",
            iconSize: [25, 41],
            iconAnchor: [10, 41],
            popupAnchor: [2, -40],
          }),
        },
        searchBounds: worldSearchBounds, // Set the search bounds here
        ...props,
      });

      map.addControl(searchControl);

      // Handle search results
      map.on("geosearch/showlocation", function (e) {
        let marker = {
          name: e.location.label,
          position: [e.location.x, e.location.y],
        };
        console.log(e.location);
        props.addMarker(marker);
      });

      // Cleanup
      return () => {
        map.removeControl(searchControl);
      };
    }
  }, [map, props]);

  return null;
};

export default SearchField;

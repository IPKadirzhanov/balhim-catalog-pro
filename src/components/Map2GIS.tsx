import React, { useEffect, useRef } from "react";
import { load } from "@2gis/mapgl";

const MapContainer = React.memo(
  () => <div id="map-container" style={{ width: "100%", height: "100%" }} />,
  () => true
);

const Map2GIS: React.FC = () => {
  const mapRef = useRef<any>(null);

  useEffect(() => {
    let destroyed = false;

    load().then((mapglAPI) => {
      if (destroyed) return;

      mapRef.current = new mapglAPI.Map("map-container", {
        center: [76.889094, 43.284668],
        zoom: 16,
        key: "bc48dfec-371c-4550-ba50-c4b2e947b25b",
      });

      new mapglAPI.Marker(mapRef.current, {
        coordinates: [76.889094, 43.284668],
      });
    });

    return () => {
      destroyed = true;
      if (mapRef.current) {
        mapRef.current.destroy();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <MapContainer />
    </div>
  );
};

export default Map2GIS;

import { useMap } from "react-leaflet";
import { useEffect } from "react";

function MapUpdater({ position }) {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.flyTo(position, 10, { duration: 1.2 });
    }
  }, [position, map]);

  return null;
}

export default MapUpdater;

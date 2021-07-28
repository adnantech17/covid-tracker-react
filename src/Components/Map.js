import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";

const Map = () => {
  return (
    <div>
      <MapContainer className="markercluster-map">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
      </MapContainer>
    </div>
  );
};

export default Map;

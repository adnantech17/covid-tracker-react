import React, { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { showDataOnMap } from "../util";

const Map = ({ countries, center, zoom, casesType }) => {
  const [map, setmap] = useState(null);
  if (map) {
    map.setView(center, zoom);
  }
  return (
    <div className="map">
      <MapContainer center={center} zoom={zoom} whenCreated={setmap}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        ></TileLayer>
        {showDataOnMap(countries, casesType)}
      </MapContainer>
    </div>
  );
};

export default Map;

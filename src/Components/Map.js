import React from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Map = ({ geoJsonData }) => {
  const onEachFeature = (feature, layer) => {
    const props = feature.properties;
    let popup = "";

    if (props) {
      popup += props.zone_type ? `<b>Zone:</b> ${props.zone_type}<br/>` : "";
      popup += props.area_m2 ? `<b>Area:</b> ${props.area_m2} m²<br/>` : "";
      popup += props.price_rs ? `<b>Price:</b> ₹${props.price_rs}<br/>` : "";
      popup += props.year ? `<b>Year:</b> ${props.year}` : "";
    }

    layer.bindPopup(popup || "Plot details");
  };

  return (
    <MapContainer center={[16.51, 80.63]} zoom={14} style={{ height: "100%", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap contributors"
      />
      {geoJsonData && (
        <GeoJSON
  data={JSON.parse(geoJsonData)}
  pointToLayer={(feature, latlng) => {
    return L.circleMarker(latlng, {
      radius: 6,
      fillColor: "red",
      color: "#00008B",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.9,
    });
  }}
  style={(feature) => {
    const geom = feature.geometry?.type;
    if (geom === "LineString") {
      return { color: "brown", weight: 3, dashArray: "4 4" };
    }
    if (geom === "Polygon") {
      return { color: "green", weight: 2, fillOpacity: 0.4 };
    }
    if (geom === "Point") {
      return { color: "yellow", weight: 3, fillOpacity: 0.4 };
    }
    return {}; // points are styled in pointToLayer
  }}
  onEachFeature={(feature, layer) => {
    const props = feature.properties || {};
    let popup = "";

    if (props.name) popup += `<b>Name:</b> ${props.name}<br/>`;
    if (props.road_type) popup += `<b>Road Type:</b> ${props.road_type}<br/>`;
    if (props.zone_type) popup += `<b>Zone:</b> ${props.zone_type}<br/>`;
    if (props.price_rs) popup += `<b>Price:</b> ₹${props.price_rs}<br/>`;
    if (props.area_m2) popup += `<b>Area:</b> ${props.area_m2} m²<br/>`;
    if (props.utility_type) popup += `<b>Utility:</b> ${props.utility_type}<br/>`;

    layer.bindPopup(popup || "Feature details");
  }}
/>)}
    </MapContainer>
  );
};

export default Map;






import React from "react";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const MapChart = (props) => {
  //Initial position on map could be anything
  const position = [51.505772, -0.016460175];

  return (
    <MapContainer center={position} zoom={13} scrollWheelZoom={true}>
      <TileLayer
        attribution="&copy;"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {props?.stationsMapOverChartData.map((dt) => {
        return (
          <Marker key={dt.terminal_id} position={[dt.latitude, dt.longitude]}>
            <Popup>{dt.terminal_name}</Popup>
            <Tooltip>{dt.terminal_name}</Tooltip>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default MapChart;

import { useNavigate, useSearchParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import styles from "./Map.module.css";
import { useState } from "react";

function Map() {
  //bara inke bdon inke link dashte bashim betunim ye seri etelaat b url befrestim
  const navigate = useNavigate();
  const [mapPosition, setMapPosition] = useState([40, 0]);

  //khondane query ha mese state e taghribn e avalie dare ye tabe bara b roz resani
  const [searchParams, setSearchParams] = useSearchParams();
  //bara gereftan har kodom az query ha bayad az methode get estefade konim o tu moteghayer zakhire konim
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return (
    <div className={styles.mapContainer} onClick={() => navigate("form")}>
      <MapContainer
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        <Marker position={mapPosition}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default Map;

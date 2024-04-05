import { useNavigate, useSearchParams } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvent,
} from "react-leaflet";

import styles from "./Map.module.css";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesContext";
import { UseGeoLocate } from "../hooks/useGeolocation";
import Button from "./Button";

function Map() {
  //bara inke bdon inke link dashte bashim betunim ye seri etelaat b url befrestim
  const navigate = useNavigate();

  const { cities } = useCities();
  const [mapPosition, setMapPosition] = useState([40, 0]);
  //khondane query ha mese state e taghribn e avalie dare ye tabe bara b roz resani
  const [searchParams, setSearchParams] = useSearchParams();

  //hook sefareshi gablan khodemon tu use-geolocation project k inja estefade darim mikonim
  const {
    isLoading: isLoadingPosition,
    postion: geolocationPostion,
    getPosition,
  } = UseGeoLocate();

  //bara gereftan har kodom az query ha bayad az methode get estefade konim o tu moteghayer zakhire konim
  const mapLat = searchParams.get("lat");
  const mapLng = searchParams.get("lng");

  // vaghti az city back mizanim position map barmigarde ru default
  // mamikhaym vaghti back zadim map ru position hamon shahr bemine pas omadim hamgam sazi kardim ba position url
  useEffect(
    function () {
      if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
    },
    [mapLat, mapLng]
  );

  useEffect(
    function () {
      if (geolocationPostion)
        setMapPosition([geolocationPostion.lat, geolocationPostion.lng]);
    },
    [geolocationPostion]
  );

  return (
    // <div className={styles.mapContainer} onClick={() => navigate("form")}>
    <div className={styles.mapContainer}>
      {!geolocationPostion && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "Loading..." : "use your position"}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span> <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}

        {/* vaghti aghab ru mizanim dg on position ru nadarim pas in null mishe va dg nemikhone pa miyam ye pishfarz besh midim 40,0 */}
        <ChangeCenter position={mapPosition} />
        <DetectedClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

// chon mostaghim nemitunim on click ru bara inke harja map click shod form ru baz kone gharar bedim
// miyaym mese changeCenter khodemon dorostesh mikonim  ba estefade az degar library haye leafletmese mapevent
function DetectedClick() {
  const navigate = useNavigate();

  useMapEvent({
    // noe event ru migire va dar on ye callback function migore
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
    //vaghti az event console.lag begirim mibinim k bad click ru map tu latlng ye position mide
    //mamiyaym in position ru b onvan query  dar url migirim ta az khondanesh az url dar form estefade konim
    //k vaghti click mishe dar form on position ru bezanim
  });
}
export default Map;

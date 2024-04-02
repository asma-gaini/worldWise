import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";

function Map() {
  //bara inke bdon inke link dashte bashim betunim ye seri etelaat b url befrestim
  const navigate = useNavigate();

  //khondane query ha mese state e taghribn e avalie dare ye tabe bara b roz resani
  const [searchParams, setSearchParams] = useSearchParams();
  //bara gereftan har kodom az query ha bayad az methode get estefade konim o tu moteghayer zakhire konim
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return (
    <div className={styles.mapContainer} onClick={() => navigate("form")}>
      <h1>Map</h1>
      <h1>
        Position : {lat} , {lng}
      </h1>
      <button
        onClick={() => {
          setSearchParams({ lat: 23, lng: 50 });
        }}
      >
        Change pos
      </button>
    </div>
  );
}

export default Map;

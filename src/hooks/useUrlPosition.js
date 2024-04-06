import { useSearchParams } from "react-router-dom";

export function useUrlPosition() {
  //khondane query ha mese state e taghribn e avalie dare ye tabe bara b roz resani
  const [searchParams, setSearchParams] = useSearchParams();
  //bara gereftan har kodom az query ha bayad az methode get estefade konim o tu moteghayer zakhire konim
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return [lat, lng];
}

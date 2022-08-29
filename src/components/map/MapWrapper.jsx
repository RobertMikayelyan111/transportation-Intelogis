import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useMapEvent, useMap } from "react-leaflet";
import { MapContainer } from "react-leaflet";
import Leaflet from "leaflet";
import { geocoders, geocoder } from "leaflet-control-geocoder";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-control-geocoder";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import { getSelectedAdress } from "../../redux/reducers/adressesSlice";

function RoutingControl(points, map) {
  return Leaflet.Routing.control({
    waypoints: points,
    routeWhileDragging: false,
    show: false,
    showAlternatives: false,
    addWaypoints: false,
    fitSelectedRoutes: false,
    collapsible: true,
    geocoder: geocoders.nominatim(),
  }).addTo(map);
}

const SetViewOnClick = () => {
  const map = useMapEvent("click", ({ latlng }) => {
    map.setView(latlng, map.getZoom(), {
      animate: true,
    });
  });

  return null;
};

const Map = () => {
  const selectedAdress = useSelector(getSelectedAdress);
  const map = useMap();

  Leaflet.Icon.Default.mergeOptions({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
  });

  Leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
    map
  );

  geocoder({
    collapsed: true,
  });

  useEffect(() => {
    if (!map) return;

    if (selectedAdress.pointA?.point && selectedAdress.pointB?.point) {
      RoutingControl(
        [
          Leaflet.latLng(selectedAdress.pointA.point),
          Leaflet.latLng(selectedAdress.pointB.point),
        ],
        map
      );
    }

    return undefined;
  });

  return null;
};

export const MapWrapper = () => {
  return (
    <MapContainer
      center={[40.184476598049855, 44.571485213134754]}
      zoom={12}
      scrollWheelZoom
    >
      <Map />
      <SetViewOnClick />
    </MapContainer>
  );
};

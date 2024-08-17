import { MapContainer,TileLayer, Marker, CircleMarker, Popup,} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import style from "./map.module.css";
import "./map.module.css";

function Map() {
  return (
    <main className="d w-[100%] h-[10vh] z-1">
      {/*leaflet and react-leaflet*/}
      <div>
        <MapContainer className={style.map} center={[33.589886, -7.603869]} zoom={13}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <CircleMarker
            className="n w-[150px] h-[150px]"
            center={[33.589886, -7.603869]}
            radius={10}
            color="transparent"
            fillColor="green"
            fillOpacity={0.5}
          >
            <Popup className="w-[460px] h-[150px]">
              <p className="text-[25px]">My Location </p>
            </Popup>
          </CircleMarker>
        </MapContainer>
      </div>
    </main>
  );
}

export default Map;

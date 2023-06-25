import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { IProduct } from "../../../../types";
import Markers from "./Markers";

export default function Leaflet({ products }: { products: IProduct[] }) {
  return (
    <div className="h-[800px] w-full">
      <MapContainer
        style={{ height: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Markers products={products} />
      </MapContainer>
    </div>
  );
}

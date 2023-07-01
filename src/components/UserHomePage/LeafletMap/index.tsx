import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { IProduct } from "../../../../types";
import Markers from "./Markers";
import DbClickDetectorLayer from "./DbClickDetectorLayer";

export default function Leaflet({ products }: { products: IProduct[] }) {
  return (
    <div className="h-[869px] w-full">
      <MapContainer
        style={{ height: "100%" }}
        maxBounds={[
          [-90, -180], // Southwestern coordinates
          [90, 180], // Northeastern coordinates
        ]}
        center={[30, 30]}
        zoom={3}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {products.length > 0 && <Markers products={products} />}
        <DbClickDetectorLayer />
      </MapContainer>
    </div>
  );
}

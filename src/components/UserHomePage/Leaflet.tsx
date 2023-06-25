import { useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";

import "leaflet/dist/leaflet.css";
import { IProduct } from "../../../types";
import capitalize from "../../utils/capitalize";

// Custom marker icon
const customIcon = L.icon({
  iconUrl: "/img/marker.svg",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [0, -35],
});

export default function Leaflet({ products }: { products: IProduct[] }) {
  const mapContainerRef = useRef(null);

  return (
    <div ref={mapContainerRef} className="h-[800px] w-full">
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        style={{ height: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {products.map((product, idx) => (
          <Marker
            key={idx}
            position={[product.latitude, product.longitude]}
            icon={customIcon}
          >
            <Popup>
              <b>{product.project.title}</b> <br />
              {capitalize(product.type)} - {product.area}m<sup>2</sup>
              <br />
              {/* <span className="underline">Details</span> */}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

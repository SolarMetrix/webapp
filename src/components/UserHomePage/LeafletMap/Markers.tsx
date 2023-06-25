import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap, Popup } from "react-leaflet";
import L, { LatLngBoundsExpression } from "leaflet";
import { IProduct } from "../../../../types";
import capitalize from "../../../utils/capitalize";

// Custom marker icon
const customIcon = L.icon({
  iconUrl: "/img/marker.svg",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [0, -35],
});

export default function Markers({ products }: { products: IProduct[] }) {
  const map = useMap();

  useEffect(() => {
    if (products.length > 0) {
      const bounds = calculateBounds(products);

      map.fitBounds(bounds);
    }
  }, [products]);

  const calculateBounds = (products: IProduct[]): LatLngBoundsExpression => {
    const bounds = L.latLngBounds([]);

    products.forEach((product) => {
      const { latitude, longitude } = product;
      bounds.extend([latitude, longitude]);
    });

    return bounds;
  };

  return (
    <>
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
          </Popup>
        </Marker>
      ))}
    </>
  );
}

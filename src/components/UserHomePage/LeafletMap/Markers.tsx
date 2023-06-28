import { useEffect, useState } from "react";
import { Marker, useMap, Popup } from "react-leaflet";
import L, { LatLngBoundsExpression } from "leaflet";
import { FolderOpenIcon } from "@heroicons/react/24/outline";

import { IProduct } from "../../../../types";
import capitalize from "../../../utils/capitalize";
import Link from "next/link";
import DeleteProductModal from "../ProjectsPage/DeleteProductModal";

const customIcon = L.icon({
  iconUrl: "/img/marker.svg",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [0, -35],
});

export default function Markers({ products }: { products: IProduct[] }) {
  const [removeModal, setRemoveModal] = useState<boolean>(false);
  const [toDeleteItemProjectId, setToDeleteItemProjectId] =
    useState<string>("");
  const [toDeleteProductId, setToDeleteProductId] = useState<string>("");
  const map = useMap();

  useEffect(() => {
    if (products.length > 0) {
      const bounds = calculateBounds(products);

      map.fitBounds(bounds);
    }
  }, [map, products]);

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
          <Popup className="request-popup">
            <div className="flex flex-col text-gray-500">
              <div className="flex">
                <FolderOpenIcon className="mr-1 inline-block h-4 w-4" />
                <div className="flex flex-col">
                  <span className="font-bold">{product.project.title}</span>
                  <span className="">
                    {capitalize(product.type)} - {product.area}m<sup>2</sup>
                  </span>
                </div>
              </div>

              <span className="my-2 h-[2px] w-full rounded-lg bg-gray-200"></span>
              <span
                className="mb-1 cursor-pointer hover:text-gray-700"
                onClick={() => {
                  setToDeleteItemProjectId(product.project.uuid);
                  setToDeleteProductId(product.uuid);
                  setRemoveModal(true);
                }}
              >
                - Remove this product
              </span>
              {!product.project.readonly && (
                <Link href={`/projects/${product.project.uuid}/add-product`}>
                  <a>+ Add new product</a>
                </Link>
              )}
            </div>
          </Popup>
        </Marker>
      ))}

      <DeleteProductModal
        isOpen={removeModal}
        close={() => setRemoveModal(false)}
        projectId={toDeleteItemProjectId}
        productId={toDeleteProductId}
      />
    </>
  );
}

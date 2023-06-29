import { useEffect, useState } from "react";
import { Marker, useMap, Popup, useMapEvents } from "react-leaflet";
import L, { LatLngBoundsExpression } from "leaflet";
import { FolderOpenIcon } from "@heroicons/react/24/outline";

import { IProduct } from "../../../../types";
import capitalize from "../../../utils/capitalize";
import Link from "next/link";
import DeleteProductModal from "../ProjectsPage/DeleteProductModal";
import AddProductInfoModal from "./AddProductInfoModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import Loader from "../../HelperComponents/Loader";

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
  const [newProductInfoModalOpen, setNewProductInfoModalOpen] =
    useState<boolean>(false);
  const [newProductLatitude, setNewProductLatitude] = useState<number>();
  const [newProductLongitude, setNewProductLongitude] = useState<number>();

  const map = useMap();

  useMapEvents({
    dblclick(e) {
      const { lat, lng } = e.latlng;
      setNewProductLatitude(lat);
      setNewProductLongitude(lng);
      setNewProductInfoModalOpen(true);
    },
  });

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
                {product.project.readonly ? (
                  <FontAwesomeIcon
                    icon={faLock}
                    className="mt- mr-1 h-3 w-3 translate-y-0.5 text-gray-500"
                  />
                ) : (
                  <Loader size={3} color="text-gray-500 mt-[2px]" />
                )}
                <div className="flex max-w-[140px] flex-col">
                  <Link href={`/projects/${product.project.uuid}`}>
                    <a className="truncate overflow-ellipsis font-bold hover:underline">
                      {product.project.title}
                    </a>
                  </Link>
                  <span className="">
                    {capitalize(product.type)} - {product.area}m<sup>2</sup>
                  </span>
                </div>
              </div>

              <span className="my-2 h-[2px] w-full rounded-lg bg-gray-200"></span>
              {product.project.readonly ? (
                <span>
                  Generated output:{" "}
                  {(product.totalGeneratedElectricity / 1000).toFixed(2)} kWh
                </span>
              ) : (
                <>
                  <span
                    className="mb-1 cursor-pointer text-gray-600 hover:text-gray-700"
                    onClick={() => {
                      setToDeleteItemProjectId(product.project.uuid);
                      setToDeleteProductId(product.uuid);
                      setRemoveModal(true);
                    }}
                  >
                    - Remove this product
                  </span>

                  <Link href={`/projects/${product.project.uuid}/add-product`}>
                    <a>+ Add new product to this project</a>
                  </Link>
                </>
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

      <AddProductInfoModal
        isOpen={newProductInfoModalOpen}
        close={() => setNewProductInfoModalOpen(false)}
        latitude={newProductLatitude as number}
        longitude={newProductLongitude as number}
      />
    </>
  );
}

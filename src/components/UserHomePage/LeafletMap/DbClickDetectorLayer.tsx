import React, { useState } from "react";
import { useMapEvents } from "react-leaflet";
import AddProductInfoModal from "./AddProductInfoModal";

export default function DbClickDetectorLayer() {
  const [newProductInfoModalOpen, setNewProductInfoModalOpen] =
    useState<boolean>(false);
  const [newProductLatitude, setNewProductLatitude] = useState<number>();
  const [newProductLongitude, setNewProductLongitude] = useState<number>();

  useMapEvents({
    dblclick(e) {
      const { lat, lng } = e.latlng;
      setNewProductLatitude(lat);
      setNewProductLongitude(lng);
      setNewProductInfoModalOpen(true);
    },
  });

  return (
    <AddProductInfoModal
      isOpen={newProductInfoModalOpen}
      close={() => setNewProductInfoModalOpen(false)}
      latitude={newProductLatitude as number}
      longitude={newProductLongitude as number}
    />
  );
}

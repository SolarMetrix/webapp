import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { addProduct } from "../../../services/product.service";
import Loader from "../../HelperComponents/Loader";
import { OrientationT, ProductT } from "../../../../types";

export default function NewProductForm({ projectId }: { projectId: string }) {
  const [product, setProduct] = useState<ProductT>("firstsolar");
  const [powerPeak, setPowerPeak] = useState<number>(480);
  const [area, setArea] = useState<number>(0);
  const [orientation, setOrientation] = useState<OrientationT>("north");
  const [inclination, setInclination] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [latitude, setLatitude] = useState<number>(0);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.error("Error getting geolocation:", error);
        }
      );
    }
  }, []);

  const handleProductChange = (event: any) => {
    const inputValue = event.target.value;
    setProduct(inputValue);

    switch (inputValue) {
      case "firstsolar":
        setPowerPeak(+process.env.NEXT_PUBLIC_FIRSTSOLAR_POWER!);
        break;
      case "jinkosolar":
        setPowerPeak(+process.env.NEXT_PUBLIC_JINKOSOLAR_POWER!);
        break;
      case "sunpower":
        setPowerPeak(+process.env.NEXT_PUBLIC_SUNPOWER_POWER!);
        break;
      default:
        setPowerPeak(+process.env.NEXT_PUBLIC_FIRSTSOLAR_POWER!);
        break;
    }
  };

  const { mutate: addProductMutation, isLoading: addProductLoading } =
    useMutation(addProduct, {
      onSuccess: () => window.location.replace("/"),
      // onError: (err: any) => setError(err.response.data.message),
    });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        addProductMutation({
          projectId,
          type: product,
          power_peak: powerPeak,
          area,
          orientation,
          inclination,
          longitude,
          latitude,
        });
      }}
    >
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Personal Information
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Use a permanent address where you can receive mail.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-6">
              <label
                htmlFor="country"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                PV system
              </label>
              <div className="mt-2">
                <select
                  id="product"
                  name="product"
                  value={product}
                  onChange={handleProductChange}
                  className="sm:text-md block w-full rounded-md border-0 py-2 text-gray-600 shadow transition focus:shadow-md focus:ring-0 sm:leading-6"
                >
                  <option value="firstsolar">Firstsolar (Series 6)</option>
                  <option value="jinkosolar">
                    Jinkosolar (Tiger Pro series, 72 HC Bifacial)
                  </option>
                  <option value="sunpower">
                    Sunpower (M SERIES, SPR-M440- H-AC)
                  </option>
                </select>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Power peak
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  value={powerPeak}
                  disabled={true}
                  className="sm:text-md block w-full cursor-not-allowed rounded-md border-0 bg-gray-100 py-2 text-gray-600 shadow transition focus:shadow-md focus:ring-0 sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="area"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Area (m<sup>2</sup>)
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  name="area"
                  min="0"
                  id="area"
                  value={area}
                  onChange={(e) => setArea(+e.target.value)}
                  className="sm:text-md block w-full rounded-md border-0 py-2 text-gray-600 shadow transition focus:shadow-md focus:ring-0 sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="orientation"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Orientation
              </label>
              <div className="mt-2">
                <select
                  id="orientation"
                  name="orientation"
                  value={orientation}
                  onChange={(e) =>
                    setOrientation(e.target.value as OrientationT)
                  }
                  className="sm:text-md block w-full rounded-md border-0 py-2 text-gray-600 shadow transition focus:shadow-md focus:ring-0 sm:leading-6"
                >
                  <option value="north">North</option>
                  <option value="east">East</option>
                  <option value="south">South</option>
                  <option value="west">West</option>
                </select>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="inclination"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Inclination (degrees)
              </label>
              <div className="mt-2">
                <input
                  id="inclination"
                  name="inclination"
                  type="number"
                  min="0"
                  value={inclination}
                  onChange={(e) => setInclination(+e.target.value)}
                  className="sm:text-md block w-full rounded-md border-0 py-2 text-gray-600 shadow transition focus:shadow-md focus:ring-0 sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="longitude"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Longitude
              </label>
              <div className="mt-2">
                <input
                  name="longitude"
                  id="longitude"
                  type="number"
                  value={longitude}
                  onChange={(e) => setLongitude(+e.target.value)}
                  className="sm:text-md block w-full rounded-md border-0 py-2 text-gray-600 shadow transition focus:shadow-md focus:ring-0 sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="latitude"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Latitude
              </label>
              <div className="mt-2">
                <input
                  name="latitude"
                  id="latitude"
                  type="number"
                  value={latitude}
                  onChange={(e) => setLatitude(+e.target.value)}
                  className="sm:text-md block w-full rounded-md border-0 py-2 text-gray-600 shadow transition focus:shadow-md focus:ring-0 sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex items-center rounded-md bg-smMain-500 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-smMain-600"
          disabled={addProductLoading}
        >
          {addProductLoading && <Loader size={5} />}
          <span>Add product to project</span>
        </button>
      </div>
    </form>
  );
}

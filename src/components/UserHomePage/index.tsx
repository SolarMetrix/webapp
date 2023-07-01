import dynamic from "next/dynamic";
import { FETCH_PRODUCTS_KEY } from "../../utils/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../services/product.service";
import { IProduct } from "../../../types";
import DotsLoader from "../HelperComponents/DotsLoader";

const Leaflet = dynamic(() => import("./LeafletMap"), { ssr: false });

export default function UserHomePage() {
  const { data: products, status: productsStatus } = useQuery(
    [FETCH_PRODUCTS_KEY],
    () => getProducts(),
    {
      staleTime: 1000 * 60 * 60,
    }
  );

  if (productsStatus === "loading") {
    return <DotsLoader />;
  }

  return (
    <div>
      <h1 className="inline-block px-4 text-2xl font-bold text-gray-600 sm:px-6 md:text-3xl lg:px-8">
        Home
      </h1>
      <h2 className="px-4 text-gray-500 sm:px-6 lg:px-8">
        See your products on the map below
      </h2>

      <div className="mt-10">
        <span className="mb-2 block px-4 text-lg font-semibold text-gray-600 sm:px-6 lg:px-8">
          You have {products!.length} products
        </span>
        <Leaflet products={products as IProduct[]} />
      </div>
    </div>
  );
}

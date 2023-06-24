import dynamic from "next/dynamic";
import { FETCH_PRODUCTS_KEY } from "../../utils/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../services/product.service";
import { IProduct } from "../../../types";
import DotsLoader from "../HelperComponents/DotsLoader";

const Leaflet = dynamic(() => import("./Leaflet"), { ssr: false });

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
    <div className="px-3 md:px-0">
      <h1 className="inline-block text-2xl font-bold text-gray-600 md:text-3xl">
        Home
      </h1>
      <h2 className="text-gray-500">See your products on the map below</h2>

      <div className="mt-10">
        <span className="mb-2 block text-lg font-semibold text-gray-600">
          You have {products!.length} products
        </span>
        <Leaflet products={products as IProduct[]} />
      </div>
    </div>
  );
}

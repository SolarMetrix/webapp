import dayjs from "dayjs";

import { IProduct } from "../../../../types";
import capitalize from "../../../utils/capitalize";
import formatDate from "../../../helpers/format-date";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function ProductsTable({
  projectId,
  products,
}: {
  projectId: string;
  products: IProduct[];
}) {
  return (
    <div className="inline-block w-full min-w-full overflow-x-scroll align-middle">
      <table className="min-w-full">
        <thead className="bg-gray-200">
          <tr>
            <th
              scope="col"
              className="py-3.5 text-left text-sm font-semibold text-gray-600 sm:pl-6"
            >
              PV-system
            </th>
            <th
              scope="col"
              className="py-3.5 text-left text-sm font-semibold text-gray-600"
            >
              Power Peak
            </th>
            <th
              scope="col"
              className="py-3.5 text-left text-sm font-semibold text-gray-600"
            >
              Area
            </th>
            <th
              scope="col"
              className="py-3.5 text-left text-sm font-semibold text-gray-600"
            >
              Orientation
            </th>
            <th
              scope="col"
              className="py-3.5 text-left text-sm font-semibold text-gray-600"
            >
              Inclination
            </th>
            <th
              scope="col"
              className="py-3.5 text-left text-sm font-semibold text-gray-600"
            >
              Latitude/Longitude
            </th>
            <th
              scope="col"
              className="py-3.5 text-left text-sm font-semibold text-gray-600"
            >
              Added on
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {products?.map((product: IProduct, idx: number) => (
            <tr key={idx} className="bg-white">
              <td className="text-md whitespace-nowrap py-6 text-gray-600 sm:pl-6">
                {capitalize(product.type)}
              </td>
              <td className="text-md whitespace-nowrap py-6 text-gray-500">
                {product.powerPeak} watts
              </td>
              <td className="text-md whitespace-nowrap py-6 text-gray-500">
                {product.area} m<sup>2</sup>
              </td>
              <td className="text-md whitespace-nowrap py-6 text-gray-500">
                {capitalize(product.orientation)}
              </td>
              <td className="text-md whitespace-nowrap py-6 text-gray-500">
                {product.inclination}
                <sup>°</sup>
              </td>
              <td className="text-md whitespace-nowrap py-6 text-gray-500">
                {product.latitude}
                <sup>°</sup>, {product.longitude}
                <sup>°</sup>
              </td>
              <td className="text-md whitespace-nowrap py-6 text-gray-500">
                {capitalize(
                  formatDate(
                    dayjs(product.createdAt).format("YYYY-MM-DD"),
                    true
                  )
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-7 flex justify-end pb-2">
        <Link href={`/projects/${projectId}/add-product`}>
          <a className="inline-flex items-center rounded-md bg-smMain-500 p-3 text-center font-semibold text-white shadow-md transition hover:bg-smMain-600">
            <FontAwesomeIcon
              icon={faPlus}
              className="mr-1 h-5 w-5 text-white"
            />
            Add new product
          </a>
        </Link>
      </div>
    </div>
  );
}

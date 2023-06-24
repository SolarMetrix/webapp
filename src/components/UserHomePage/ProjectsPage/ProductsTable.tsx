import dayjs from "dayjs";

import { IProduct } from "../../../../types";
import capitalize from "../../../utils/capitalize";
import formatDate from "../../../helpers/format-date";

export default function ProductsTable({ products }: { products: any }) {
  return (
    <div className="inline-block w-full min-w-full overflow-x-scroll align-middle">
      <div className="rounded-lg">
        <table className="min-w-full">
          <thead className=" bg-gray-200/70">
            <tr className="">
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
          <tbody className="divide-y">
            {products?.map((product: IProduct, idx: number) => (
              <tr key={idx} className="transition hover:bg-gray-200">
                <td className="text-md whitespace-nowrap py-4 text-gray-600 sm:pl-6">
                  {capitalize(product.type)}
                </td>
                <td className="text-md whitespace-nowrap py-4 text-gray-500">
                  {product.powerPeak} watts
                </td>
                <td className="text-md whitespace-nowrap py-4 text-gray-500">
                  {product.area} m<sup>2</sup>
                </td>
                <td className="text-md whitespace-nowrap py-4 text-gray-500">
                  {capitalize(product.orientation)}
                </td>
                <td className="text-md whitespace-nowrap py-4 text-gray-500">
                  {product.inclination}
                  <sup>°</sup>
                </td>
                <td className="text-md whitespace-nowrap py-4 text-gray-500">
                  {product.latitude}
                  <sup>°</sup>, {product.longitude}
                  <sup>°</sup>
                </td>
                <td className="text-md whitespace-nowrap py-4 text-gray-500">
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
      </div>
    </div>
  );
}

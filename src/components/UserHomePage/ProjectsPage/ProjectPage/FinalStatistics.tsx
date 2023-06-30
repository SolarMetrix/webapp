import React from "react";
import { IProduct } from "../../../../../types";
import capitalize from "../../../../utils/capitalize";

export default function FinalStatistics({
  products,
}: {
  products: IProduct[];
}) {
  return (
    <div className="mb-20 inline-block w-full min-w-full overflow-x-scroll rounded-b-md align-middle">
      <table className="min-w-full">
        <thead className="bg-gray-200">
          <tr>
            <th
              scope="col"
              className="rounded-tl-md py-3.5 text-left text-sm font-semibold text-gray-600 sm:pl-6"
            >
              PV-system
            </th>
            <th
              scope="col"
              className="py-3.5 text-left text-sm font-semibold text-gray-600"
            >
              Coordinates
            </th>
            <th
              scope="col"
              className="py-3.5 text-left text-sm font-semibold text-gray-600"
            >
              Average daily radiation
            </th>
            <th
              scope="col"
              className="py-3.5 text-left text-sm font-semibold text-gray-600"
            >
              Total insolation
            </th>
            <th
              scope="col"
              className="py-3.5 text-left text-sm font-semibold text-gray-600"
            >
              Total generated electricity
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
                {Math.abs(product.latitude)}
                <sup>°</sup> {product.latitude > 0 ? "N" : "S"},{" "}
                {Math.abs(product.longitude)}
                <sup>°</sup> {product.longitude > 0 ? "E" : "W"}
              </td>
              <td className="text-md whitespace-nowrap py-6 text-gray-500">
                {product.finalStats.averageDailyRadiation} W/m<sup>2</sup>
              </td>
              <td className="text-md whitespace-nowrap py-6 text-gray-500">
                {product.finalStats.totalInsolation} Wh/m<sup>2</sup>
              </td>
              <td className="text-md whitespace-nowrap py-6 text-gray-500">
                {(product.finalStats.totalGeneratedElectricity / 1000).toFixed(
                  3
                )}{" "}
                kWh
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

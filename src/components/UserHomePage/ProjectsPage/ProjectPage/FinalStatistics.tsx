import React from "react";
import { IProduct } from "../../../../../types";
import capitalize from "../../../../utils/capitalize";

export default function FinalStatistics({
  totalProjectOutput,
  products,
}: {
  totalProjectOutput: number;
  products: IProduct[];
}) {
  return (
    <div className="w-1/2">
      <h2 className="text-2xl font-medium text-gray-600">
        30-days statistics
      </h2>
      {products.map((product, idx) => (
        <div className="mt-4 flex items-center justify-between" key={idx}>
          <div className="flex flex-col">
            <div className="flex items-center text-gray-500">
              <div className="mr-2 h-3 w-3 rounded-sm bg-gray-500"></div>
              <span className="text-gray-600">
                {capitalize(product.type)} - {Math.abs(product.latitude)}
                <sup>°</sup> {product.latitude > 0 ? "N" : "S"},{" "}
                {Math.abs(product.longitude)}
                <sup>°</sup> {product.longitude > 0 ? "E" : "W"}
              </span>
            </div>
            <div className="flex flex-col pl-5 text-sm text-gray-500">
              <span>
                Average daily radiation:{" "}
                {product.finalStats.averageDailyRadiation} W/m<sup>2</sup>
              </span>
              <span>
                Total insolation: {product.finalStats.totalInsolation} Wh/m
                <sup>2</sup>
              </span>
              <span>
                Total generated electricity:{" "}
                {(product.finalStats.totalGeneratedElectricity / 1000).toFixed(
                  3
                )}{" "}
                kWh
              </span>
            </div>
          </div>
        </div>
      ))}
      <div className="mt-5">
        <span className="mr-3 text-2xl font-medium text-gray-600">
          Total project output:
        </span>
        <span className="total-output-underline mt-2 inline-block text-2xl text-gray-600">
          {(totalProjectOutput / 1000).toFixed(3)} kWh
        </span>
      </div>
    </div>
  );
}

import dayjs from "dayjs";

import { IProduct } from "../../../../../types";
import capitalize from "../../../../utils/capitalize";
import formatDate from "../../../../helpers/format-date";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileLines,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Tooltip from "../../../HelperComponents/Tooltip";
import { useMutation } from "@tanstack/react-query";
import { deleteProduct } from "../../../../services/product.service";
import { queryClient } from "../../../../helpers/queryClient";
import {
  FETCH_PRODUCTS_KEY,
  FETCH_PROJECT_KEY,
} from "../../../../utils/queryKeys";
import { useState } from "react";
import GenerateReportModal from "./GenerateReportModal";

export default function ProductsTable({
  projectId,
  products,
}: {
  projectId: string;
  products: IProduct[];
}) {
  const [generateReportModalOpen, setGenerateReportModalOpen] =
    useState<boolean>(false);

  const { mutate: deleteProductMutation } =
    useMutation(deleteProduct, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [FETCH_PROJECT_KEY, projectId],
        });
        queryClient.invalidateQueries({
          queryKey: [FETCH_PRODUCTS_KEY, projectId],
        });
        queryClient.invalidateQueries({
          queryKey: [FETCH_PRODUCTS_KEY],
        });
      },
    });

  return (
    <>
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
                Efficiency
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
                Coordinates
              </th>
              <th
                scope="col"
                className="py-3.5 text-left text-sm font-semibold text-gray-600"
              >
                Added on
              </th>
              <th
                scope="col"
                className="py-3.5 text-left text-sm font-semibold text-gray-600"
              ></th>
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
                  {product.efficiency}%
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
                  {Math.abs(product.latitude)}
                  <sup>°</sup> {product.latitude > 0 ? "N" : "S"},{" "}
                  {Math.abs(product.longitude)}
                  <sup>°</sup> {product.longitude > 0 ? "E" : "W"}
                </td>
                <td className="text-md whitespace-nowrap py-6 text-gray-500">
                  {capitalize(
                    formatDate(
                      dayjs(product.createdAt).format("YYYY-MM-DD"),
                      true
                    )
                  )}
                </td>
                <td className="text-md whitespace-nowrap py-6 text-gray-500">
                  <Tooltip text="Delete product">
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="h-4 w-4 cursor-pointer text-gray-500 transition hover:text-gray-600"
                      onClick={() =>
                        deleteProductMutation({ uuid: product.uuid })
                      }
                    />
                  </Tooltip>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-7 flex justify-end gap-5 pb-3">
          <Link href={`/projects/${projectId}/add-product`}>
            <a className="inline-flex items-center rounded-md bg-smMain-400 p-3 text-center font-semibold text-white shadow-md transition hover:bg-smMain-500">
              <FontAwesomeIcon
                icon={faPlus}
                className="mr-1 h-5 w-5 text-white"
              />
              Add new product
            </a>
          </Link>
          <button
            className="inline-flex items-center rounded-md bg-smMain-400 p-3 text-center font-semibold text-white shadow-md transition hover:bg-smMain-500"
            onClick={() => setGenerateReportModalOpen(true)}
          >
            <FontAwesomeIcon
              icon={faFileLines}
              className="mr-1 h-5 w-5 text-white"
            />
            Generate report
          </button>
        </div>
      </div>
      <GenerateReportModal
        isOpen={generateReportModalOpen}
        close={() => setGenerateReportModalOpen(false)}
        projectId={projectId}
      />
    </>
  );
}

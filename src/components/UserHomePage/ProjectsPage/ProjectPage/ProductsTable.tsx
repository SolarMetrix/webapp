import Link from "next/link";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileLines,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

import { IProduct, IProject } from "../../../../../types";
import capitalize from "../../../../utils/capitalize";
import formatDate from "../../../../helpers/format-date";
import Tooltip from "../../../HelperComponents/Tooltip";
import { useState } from "react";
import GenerateReportModal from "./GenerateReportModal";
import DeleteProductModal from "../DeleteProductModal";

export default function ProductsTable({
  project,
  products,
}: {
  project: IProject;
  products: IProduct[];
}) {
  const [generateReportModalOpen, setGenerateReportModalOpen] =
    useState<boolean>(false);
  const [removeModal, setRemoveModal] = useState<boolean>(false);
  const [toDeleteItemProjectId, setToDeleteItemProjectId] =
    useState<string>("");
  const [toDeleteProductId, setToDeleteProductId] = useState<string>("");

  return (
    <>
      <div className="inline-block w-full min-w-full overflow-x-scroll rounded-b-md align-middle">
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
                className="rounded-tr-md py-3.5 text-left text-sm font-semibold text-gray-600"
              >
                Date added
              </th>
              {!project.readonly && (
                <th
                  scope="col"
                  className="rounded-tr-md py-3.5 text-left text-sm font-semibold text-gray-600"
                ></th>
              )}
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
                {!project.readonly && (
                  <td className="text-md whitespace-nowrap py-6 text-gray-500">
                    <Tooltip text="Delete product">
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="h-4 w-4 cursor-pointer text-gray-500 transition hover:text-gray-600"
                        onClick={() => {
                          setRemoveModal(true);
                          setToDeleteItemProjectId(project.uuid);
                          setToDeleteProductId(product.uuid);
                        }}
                      />
                    </Tooltip>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!project.readonly && (
          <div className="mt-7 flex flex-col sm:flex-row sm:justify-end gap-5 pb-3">
            <Link href={`/projects/${project.uuid}/add-product`}>
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
        )}
      <DeleteProductModal
        isOpen={removeModal}
        close={() => setRemoveModal(false)}
        projectId={toDeleteItemProjectId}
        productId={toDeleteProductId}
      />

      <GenerateReportModal
        isOpen={generateReportModalOpen}
        close={() => setGenerateReportModalOpen(false)}
        projectId={project.uuid}
      />
    </>
  );
}

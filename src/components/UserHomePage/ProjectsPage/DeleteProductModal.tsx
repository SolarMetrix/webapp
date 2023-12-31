import { Dialog } from "@headlessui/react";
import {
  ExclamationTriangleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import {
  FETCH_PRODUCTS_KEY,
  FETCH_PROJECTS_KEY,
  FETCH_PROJECT_KEY,
} from "../../../utils/queryKeys";
import { useMutation } from "@tanstack/react-query";
import { IModal } from "../../../../types";
import { queryClient } from "../../../helpers/queryClient";
import Modal from "../../HelperComponents/Modals";
import HttpButton from "../../HelperComponents/HttpButton";
import { deleteProduct } from "../../../services/product.service";

type Props = IModal & {
  projectId: string;
  productId: string;
};

export default function DeleteProductModal({
  isOpen,
  close,
  projectId,
  productId,
}: Props) {
  const { mutate: deleteProductMutation, isLoading: deleteProductLoading } =
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
        queryClient.invalidateQueries({
          queryKey: [FETCH_PROJECTS_KEY],
        });
        close();
      },
    });

  return (
    <Modal open={isOpen} onClose={() => close()}>
      <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
        <button
          type="button"
          className="rounded-md bg-white text-gray-400 outline-none hover:text-gray-500"
          onClick={() => close()}
        >
          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <div className="sm:flex sm:items-start">
        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
          <ExclamationTriangleIcon
            className="h-6 w-6 text-red-600"
            aria-hidden="true"
          />
        </div>
        <div className="mt-3 sm:ml-4 sm:mt-0">
          <Dialog.Title
            as="h3"
            className="text-center text-lg font-medium leading-6 text-gray-600 sm:text-left"
          >
            Delete product
          </Dialog.Title>
          <div className="mt-2">
            <span className="text-sm text-gray-400">
              Once deleted, you will not be able to recover the product and all
              its associated activities.
            </span>
          </div>
        </div>
      </div>
      <div className="mt-5 flex flex-row-reverse">
        <HttpButton
          text="Delete"
          fnc={() => deleteProductMutation({ uuid: productId })}
          customClasses="ml-4 w-auto bg-red-500 hover:bg-red-600 transition"
          iconSize={4}
          isLoading={deleteProductLoading}
          disabled={deleteProductLoading}
        />

        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-600 shadow-sm hover:text-gray-500 focus:outline-none sm:mt-0 sm:w-auto sm:text-sm"
          onClick={() => close()}
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
}

import { Dialog } from "@headlessui/react";
import {
  ExclamationTriangleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import { IModal } from "../../../../types";
import Modal from "../../HelperComponents/Modals";

export default function WeatherApiErrorModal({ isOpen, close }: IModal) {
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
        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 sm:mx-0 sm:h-10 sm:w-10">
          <ExclamationTriangleIcon
            className="h-6 w-6 text-gray-600"
            aria-hidden="true"
          />
        </div>
        <div className="mt-3 sm:ml-4 sm:mt-0">
          <Dialog.Title
            as="h3"
            className="text-center text-lg font-medium leading-6 text-gray-600 sm:text-left"
          >
            Weather API Error
          </Dialog.Title>
          <div className="mt-2">
            <span className="text-sm text-gray-400">
              The product was added successfully, but the weather API failed to
              fetch the weather data their rules and restrictions.
            </span>
          </div>
        </div>
      </div>
      <div className="mt-5 flex flex-row-reverse">
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-600 shadow-sm hover:text-gray-500 focus:outline-none sm:mt-0 sm:w-auto sm:text-sm"
          onClick={() => close()}
        >
          Close
        </button>
      </div>
    </Modal>
  );
}

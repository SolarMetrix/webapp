import { Dialog } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import { IModal } from "../../../../types";
import Modal from ".";

export default function AuthFailedModal({ isOpen, close }: IModal) {
  return (
    <Modal open={isOpen} onClose={() => close()}>
      <div className="sm:flex sm:items-start">
        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 sm:mx-0 sm:h-10 sm:w-10">
          <FontAwesomeIcon icon={faXmark} className="h-5 w-5 text-gray-600" />
        </div>
        <div className="mt-3 text-left sm:ml-4 sm:mt-0">
          <Dialog.Title
            as="h3"
            className="text-lg font-medium leading-6 text-gray-600"
          >
            Login Failed
          </Dialog.Title>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Login failed. Please try again.
            </p>
            <p className="mt-2 text-sm text-gray-500"></p>
          </div>
        </div>
      </div>
      <div className="mt-5 sm:flex sm:flex-row-reverse">
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-600 shadow-sm hover:text-gray-500 focus:outline-none sm:mt-0 sm:w-auto"
          onClick={() => close()}
        >
          Close
        </button>
      </div>
    </Modal>
  );
}

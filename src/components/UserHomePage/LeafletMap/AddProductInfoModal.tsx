import { Dialog } from "@headlessui/react";
import { XMarkIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/outline";

import { IModal } from "../../../../types";
import Modal from "../../HelperComponents/Modals";
import Link from "next/link";
import { FETCH_PROJECTS_KEY } from "../../../utils/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { getProjects } from "../../../services/project.service";

type Props = IModal & {
  latitude: number;
  longitude: number;
};

export default function AddProductInfoModal({
  isOpen,
  close,
  latitude,
  longitude,
}: Props) {
  const { data: projects } = useQuery(
    [FETCH_PROJECTS_KEY],
    () => getProjects(),
    {
      staleTime: 1000 * 60 * 60,
    }
  );

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
          <QuestionMarkCircleIcon
            className="h-6 w-6 text-gray-600"
            aria-hidden="true"
          />
        </div>
        <div className="mt-3 sm:ml-4 sm:mt-0">
          <Dialog.Title
            as="h3"
            className="text-center text-lg font-medium leading-6 text-gray-600 sm:text-left"
          >
            Add new product
          </Dialog.Title>
          {projects && projects.length > 0 ? (
            <div className="mt-2">
              <span className="text-sm text-gray-400">
                Do you want to add a new product at {latitude}
                <sup>°</sup>, {longitude}
                <sup>°</sup>?
              </span>
              <span className="mt-2 block text-sm text-gray-400">
                If yes, please select a project to add the product to:
              </span>
              <div className="mt-2">
                {projects
                  ?.filter((project) => !project.readonly)
                  .map((project, idx) => (
                    <Link
                      key={idx}
                      href={`/projects/${project.uuid}/add-product?latitude=${latitude}&longitude=${longitude}`}
                    >
                      <a className="mb-2 block text-sm text-gray-400 underline hover:text-gray-500">
                        {project.title}
                      </a>
                    </Link>
                  ))}
              </div>
            </div>
          ) : (
            <span className="mt-2 block text-sm text-gray-400">
              You do not have any projects yet. Please create a new project
              first.
            </span>
          )}
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

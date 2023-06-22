import { Dialog } from "@headlessui/react";
import {
  ExclamationTriangleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import { FETCH_PROJECTS_KEY } from "../../../utils/queryKeys";
import { useMutation } from "@tanstack/react-query";
import { IModal, IProject } from "../../../../types";
import { queryClient } from "../../../helpers/queryClient";
import { removeProject } from "../../../services/project.service";
import Modal from "../../HelperComponents/Modals";
import HttpButton from "../../HelperComponents/HttpButton";

type Props = IModal & {
  project: IProject;
};

export default function DeleteProjectModal({ isOpen, close, project }: Props) {
  const { mutate: removeProjectMutation, isLoading: removeProjectLoading } =
    useMutation(removeProject, {
      onSuccess: () => {
        close();
        queryClient.invalidateQueries({
          queryKey: [FETCH_PROJECTS_KEY],
        });
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
            Delete project
          </Dialog.Title>
          <div className="mt-2">You are about to delete the project</div>
        </div>
      </div>
      <div className="mt-5 flex flex-row-reverse">
        <HttpButton
          text="Delete"
          fnc={() => removeProjectMutation({ uuid: project.uuid })}
          customClasses="ml-4 w-auto bg-red-500 hover:bg-red-600 transition"
          iconSize={4}
          isLoading={removeProjectLoading}
          disabled={removeProjectLoading}
        />

        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-600 shadow-sm hover:text-gray-500 focus:outline-none sm:mt-0 sm:w-auto sm:text-sm"
          onClick={() => close()}
        >
          Cacnel
        </button>
      </div>
    </Modal>
  );
}

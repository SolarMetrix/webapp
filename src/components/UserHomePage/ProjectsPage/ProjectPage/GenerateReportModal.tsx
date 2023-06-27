import { Dialog } from "@headlessui/react";
import { XMarkIcon, InformationCircleIcon } from "@heroicons/react/24/outline";
import Modal from "../../../HelperComponents/Modals";
import HttpButton from "../../../HelperComponents/HttpButton";
import { IModal } from "../../../../../types";
import { useMutation } from "@tanstack/react-query";
import { generateReport } from "../../../../services/project.service";
import { queryClient } from "../../../../helpers/queryClient";
import {
  FETCH_PROJECTS_KEY,
  FETCH_PROJECT_KEY,
} from "../../../../utils/queryKeys";

type Props = IModal & {
  projectId: string;
};

export default function GenerateReportModal({
  isOpen,
  close,
  projectId,
}: Props) {
  const { mutate: generateReportMutation, isLoading: generateReportLoading } =
    useMutation(generateReport, {
      onSuccess: () => {
        close();
        queryClient.invalidateQueries({
          queryKey: [FETCH_PROJECT_KEY, projectId],
        });
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
        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 sm:mx-0 sm:h-10 sm:w-10">
          <InformationCircleIcon
            className="h-6 w-6 text-gray-600"
            aria-hidden="true"
          />
        </div>
        <div className="mt-3 sm:ml-4 sm:mt-0">
          <Dialog.Title
            as="h3"
            className="text-center text-lg font-medium leading-6 text-gray-600 sm:text-left"
          >
            Generate report
          </Dialog.Title>
          <div className="mt-2">
            <span className="text-sm text-gray-400">
              If you generate the report, the project will be set to read-only
              mode.
            </span>
          </div>
        </div>
      </div>
      <div className="mt-5 flex flex-row-reverse">
        <HttpButton
          text="Generate now"
          fnc={() => generateReportMutation(projectId)}
          customClasses="ml-4 w-auto bg-smMain-400 shadow-md hover:bg-smMain-500 transition"
          iconSize={4}
          isLoading={generateReportLoading}
          disabled={generateReportLoading}
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

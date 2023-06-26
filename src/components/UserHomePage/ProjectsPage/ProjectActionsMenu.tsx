import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsis,
  faFileLines,
  faPen,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

import UpdateProjectModal from "./UpdateProjectModal";
import DeleteProjectModal from "./DeleteProjectModal";
import { IProject } from "../../../../types";

export default function ProjectActionsMenu({
  isOpen,
  project,
}: {
  isOpen: boolean;
  project: IProject;
}) {
  const [UpdateProjectModalOpen, setUpdateProjectModalOpen] =
    useState<boolean>(false);
  const [DeleteProjectModalOpen, setDeleteProjectModalOpen] =
    useState<boolean>(false);

  return (
    <>
      <Menu as="div">
        <Menu.Button>
          <FontAwesomeIcon
            icon={faEllipsis}
            className="flex h-7 w-7 text-lg text-gray-400 transition hover:text-gray-600"
          />
        </Menu.Button>
        <Transition
          show={isOpen}
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 top-6 min-w-[200px] origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1">
              {!project.readonly && (
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active && "bg-gray-100"
                      } group flex w-full items-center rounded-md px-2 py-2`}
                      onClick={() => setUpdateProjectModalOpen(true)}
                    >
                      <div className="flex w-full items-center">
                        <FontAwesomeIcon
                          icon={faFileLines}
                          className={`mr-2 h-4 w-4 text-gray-500 transition`}
                        />
                        <span className="text-sm text-gray-600">
                          Generate report
                        </span>
                      </div>
                    </button>
                  )}
                </Menu.Item>
              )}

              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active && "bg-gray-100"
                    } group flex w-full items-center rounded-md px-2 py-2`}
                    onClick={() => setUpdateProjectModalOpen(true)}
                  >
                    <div className="flex w-full items-center">
                      <FontAwesomeIcon
                        icon={faPen}
                        className={`mr-2 h-4 w-4 text-gray-500 transition`}
                      />
                      <span className="text-sm text-gray-600">Edit</span>
                    </div>
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active && "bg-gray-100"
                    } group flex w-full items-center rounded-md px-2 py-2`}
                    onClick={() => setDeleteProjectModalOpen(true)}
                  >
                    <div className="flex w-full items-center">
                      <FontAwesomeIcon
                        icon={faTrash}
                        className={`mr-2 h-4 w-4 text-gray-500 transition`}
                      />
                      <span className="text-sm text-gray-600">Delete</span>
                    </div>
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>

      <UpdateProjectModal
        isOpen={UpdateProjectModalOpen}
        close={() => setUpdateProjectModalOpen(false)}
        project={project}
      />

      <DeleteProjectModal
        isOpen={DeleteProjectModalOpen}
        close={() => setDeleteProjectModalOpen(false)}
        project={project}
      />
    </>
  );
}

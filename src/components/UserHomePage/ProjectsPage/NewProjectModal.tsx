import { useState } from "react";
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";
// import { queryClient } from "../../../../helpers/queryClient";
// import { FETCH_USER_COLLECTIONS_KEY } from "../../../../utils/queryKeys";
import { useMutation } from "@tanstack/react-query";
import { IModal } from "../../../../types";
import { createProject } from "../../../services/project.service";
import Modal from "../../HelperComponents/Modals";
import HttpButton from "../../HelperComponents/HttpButton";
import classnames from "../../../utils/classnames";
import { queryClient } from "../../../helpers/queryClient";
import { FETCH_PROJECTS_KEY } from "../../../utils/queryKeys";

export default function NewProjectModal({ isOpen, close }: IModal) {
  const [projectTitle, setProjectTitle] = useState<string>("");
  const [projectDescription, setProjectDescription] = useState<string>("");

  const { mutate: createProjectMutation, isLoading: createProjectLoading } =
    useMutation(createProject, {
      onSuccess: () => {
        emptyAndClose();
        queryClient.invalidateQueries({
          queryKey: [FETCH_PROJECTS_KEY],
        });
      },
    });

  const createNewProject = () => {
    if (
      projectTitle?.trim().length >= 4 &&
      projectTitle?.trim().length <= 100 &&
      projectDescription.trim().length <= 250
    ) {
      try {
        return createProjectMutation({
          title: projectTitle,
          description: projectDescription,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  function emptyAndClose() {
    setProjectTitle("");
    setProjectDescription("");
    close();
  }

  return (
    <Modal open={isOpen} onClose={() => emptyAndClose()}>
      <div className="mb-8">
        <div className="mb-2">
          <span className="font-bold text-gray-600">Title*</span>
          <p className="text-[0.77rem] text-gray-500">
            Project name or title to distinguish it from other projects
          </p>
        </div>
        <input
          type="text"
          name="title"
          className="block w-full rounded-md border-none px-3 py-3 text-lg text-gray-600 shadow-md ring-1 ring-gray-100 focus:ring-0"
          value={projectTitle}
          onChange={(event) => setProjectTitle(event.target.value)}
        />
      </div>

      <div className="mb-10">
        <div className="mb-2">
          <span className="font-bold text-gray-600">Description</span>
          <p className="text-[0.77rem] text-gray-500">
            Optional project information
          </p>
        </div>
        <input
          type="text"
          name="goalTitle"
          className="block w-full rounded-md border-none px-3 py-3 text-lg text-gray-600 shadow-md ring-1 ring-gray-100 focus:ring-0"
          value={projectDescription}
          onChange={(event) => setProjectDescription(event.target.value)}
        />
      </div>

      <HttpButton
        text="Create project"
        faIcon={faFolderPlus}
        customClasses={classnames(
          "w-full py-4 bg-smMain-400 hover:bg-smMain-500 transition"
        )}
        fnc={() => createNewProject()}
        isLoading={createProjectLoading}
        disabled={
          projectTitle?.trim().length < 4 ||
          projectTitle?.trim().length > 100 ||
          projectDescription.trim().length > 250 ||
          createProjectLoading
        }
      />
    </Modal>
  );
}

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { updateProject } from "../../../services/project.service";
import { IModal, IProject } from "../../../../types";
import { queryClient } from "../../../helpers/queryClient";
import { FETCH_PROJECTS_KEY } from "../../../utils/queryKeys";
import Modal from "../../HelperComponents/Modals";
import HttpButton from "../../HelperComponents/HttpButton";

type Props = IModal & {
  project: IProject;
};

export default function UpdateProjectModal({ isOpen, close, project }: Props) {
  const [projectTitle, setProjectTitle] = useState<string>(project.title);
  const [projectDescription, setProjectDescription] = useState<string>(
    project.description
  );

  const { mutate: updateProjectMutation, isLoading: updateProjectLoading } =
    useMutation(updateProject, {
      onSuccess: () => {
        close();
        queryClient.invalidateQueries({
          queryKey: [FETCH_PROJECTS_KEY],
        });
      },
    });

  const update = async () => {
    if (projectTitle.trim().length > 3) {
      try {
        return updateProjectMutation({
          projectId: project.uuid,
          title: projectTitle,
          description: projectDescription,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Modal open={isOpen} onClose={() => close()}>
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
        text="Update project"
        faIcon={faPen}
        iconSize={4}
        customClasses="w-full py-4 bg-smMain-500"
        fnc={() => update()}
        isLoading={updateProjectLoading}
        disabled={projectTitle.trim().length < 4 || updateProjectLoading}
      />
    </Modal>
  );
}

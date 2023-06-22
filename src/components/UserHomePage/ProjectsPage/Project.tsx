import { useEffect, useRef, useState } from "react";
import { IProject } from "../../../../types";
import listenForOutsideClicks from "../../../helpers/listen-for-outside-clicks";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import capitalize from "../../../utils/capitalize";
import { faFolder, faLock } from "@fortawesome/free-solid-svg-icons";
import formatDate from "../../../helpers/format-date";
import dayjs from "dayjs";
import ProjectActionsMenu from "./ProjectActionsMenu";
import Loader from "../../HelperComponents/Loader";
import Tooltip from "../../HelperComponents/Tooltip";

export default function Project({ project }: { project: IProject }) {
  const [projectActionsMenuOpen, setProjectActionsMenuOpen] =
    useState<boolean>(false);

  const menuRef = useRef(null);
  const [listening, setListening] = useState(false);

  useEffect(
    listenForOutsideClicks(
      listening,
      setListening,
      menuRef,
      setProjectActionsMenuOpen
    )
  );

  const close = () => setProjectActionsMenuOpen(!projectActionsMenuOpen);

  return (
    <div className="relative min-h-[220px] cursor-pointer rounded-md border bg-white px-5 py-7 shadow-md transition hover:shadow-lg">
      <div
        className="absolute right-4 top-5 z-20 flex h-8 w-8 cursor-pointer"
        ref={menuRef}
        onClick={close}
      >
        <ProjectActionsMenu isOpen={projectActionsMenuOpen} project={project} />
      </div>
      {projectActionsMenuOpen && (
        <div className={`absolute inset-0 z-10 bg-white/60`}></div>
      )}

      <Link href={`/notes/c/${project.uuid}`} prefetch={false}>
        <a className="relative flex h-full flex-col justify-between">
          <div className="grow">
            <FontAwesomeIcon
              icon={faFolder}
              className="h-12 w-12 text-gray-600"
            />
            <div className="mb-3 mt-3 flex flex-col">
              <span className="font-semibold text-gray-600">
                {project.title}
              </span>
              <span className="overflow-hidden overflow-ellipsis whitespace-nowrap text-sm text-gray-400">
                {project.description}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">
              Created on{" "}
              {capitalize(
                formatDate(dayjs(project.createdAt).format("YYYY-MM-DD"), false)
              )}
            </span>
            {project.readonly ? (
              <FontAwesomeIcon
                icon={faLock}
                className="h-4 w-4 text-gray-500"
              />
            ) : (
              <Loader color="text-gray-500" />
            )}
          </div>
        </a>
      </Link>
    </div>
  );
}

import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PlusIcon } from "@heroicons/react/20/solid";
import { useSpring, animated } from "react-spring";
import NewCollectionModal from "./NewCollectionModal";
import { useState } from "react";

export default function NewProject() {
  const [newProjectModalOpen, setNewProjectModalOpen] =
    useState<boolean>(false);
  const springAnimation = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
  });

  return (
    <div className="w-[400px] py-10 text-center">
      <div>
        <animated.div style={springAnimation} className="collections-grid">
          <div
            className="relative flex min-h-[220px] cursor-pointer flex-col justify-start rounded-md border-2 border-dashed bg-transparent px-5 py-7 shadow-md transition hover:shadow-lg"
            onClick={() => setNewProjectModalOpen(true)}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <FontAwesomeIcon
                icon={faFolderPlus}
                className="h-12 w-12 text-gray-600 transition"
              />
              <span className="mt-2 text-sm font-semibold text-gray-600">
                Add new project
              </span>
            </div>
          </div>
        </animated.div>
      </div>

      <NewCollectionModal
        isOpen={newProjectModalOpen}
        close={() => setNewProjectModalOpen(false)}
      />
    </div>
  );
}

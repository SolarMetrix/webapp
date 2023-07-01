import { Fragment, useState } from "react";
import Image from "next/image";
import { useSpring, animated } from "react-spring";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "@tanstack/react-query";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import classnames from "../../utils/classnames";

const filterTypes = [
  { id: 1, name: "All", value: "all" },
  { id: 2, name: "Active projects", value: "active" },
  { id: 3, name: "Old projects", value: "old" },
];

import SEO from "../../components/SEO";
import getParsedCookies from "../../utils/cookie-parser";
import { FETCH_PROJECTS_KEY } from "../../utils/queryKeys";
import { getProjects } from "../../services/project.service";
import NewProjectModal from "../../components/UserHomePage/ProjectsPage/NewProjectModal";
import ProjectSkeleton from "../../components/HelperComponents/Skeleton/ProjectSkeleton";
import Project from "../../components/UserHomePage/ProjectsPage/Project";

export default function ProjectsPage(): JSX.Element {
  const [newProjectModalOpen, setNewProjectModalOpen] =
    useState<boolean>(false);
  const [selectedFilter, setSelectedFilter] = useState(filterTypes[0]);

  const springAnimation = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
  });

  const { status: projectsStatus, data: projects } = useQuery(
    [FETCH_PROJECTS_KEY],
    () => getProjects(),
    {
      staleTime: 1000 * 60 * 60,
    }
  );

  if (projectsStatus === "loading") {
    return <ProjectSkeleton />;
  }

  return (
    <>
      <SEO
        url={`${process.env.NEXT_PUBLIC_WEB_APP_ENDPOINT}/projects`}
        description="Projects page"
        title="Projects"
      />
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="mb-14 flex justify-between">
          <h1 className="inline-block text-2xl font-bold text-gray-600 md:text-3xl">
            Projects
          </h1>
          {projects?.length! > 0 && (
            <div className="float-right w-[250px] justify-end">
              <Listbox value={selectedFilter} onChange={setSelectedFilter}>
                {({ open }) => (
                  <>
                    <div className="relative mt-2">
                      <Listbox.Button className="sm:text-md relative w-full cursor-default rounded-md bg-white py-2.5 pl-3 pr-10 text-left text-gray-600 shadow-sm ring-1 ring-gray-300 transition hover:shadow-md focus:outline-none sm:leading-6">
                        <span className="block truncate">
                          {selectedFilter?.name}
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                          <ChevronUpDownIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </span>
                      </Listbox.Button>

                      <Transition
                        show={open}
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg  focus:outline-none sm:text-sm">
                          {filterTypes.map((person) => (
                            <Listbox.Option
                              key={person.id}
                              className={({ active }) =>
                                classnames(
                                  active
                                    ? "bg-smMain-400 text-white"
                                    : "text-gray-600",
                                  "relative cursor-default select-none py-2 pl-3 pr-9"
                                )
                              }
                              value={person}
                            >
                              {({ selected, active }) => (
                                <>
                                  <span
                                    className={classnames(
                                      selected
                                        ? "font-semibold"
                                        : "font-normal",
                                      "block truncate"
                                    )}
                                  >
                                    {person.name}
                                  </span>

                                  {selected ? (
                                    <span
                                      className={classnames(
                                        active
                                          ? "text-white"
                                          : "text-smMain-400",
                                        "absolute inset-y-0 right-0 flex items-center pr-4"
                                      )}
                                    >
                                      <CheckIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </>
                )}
              </Listbox>
            </div>
          )}
        </div>

        {projects?.length === 0 && (
          <div className="flex flex-col text-center">
            <Image
              src="/img/storyset-2.svg"
              alt="Storyset 1"
              width={1000}
              height={542}
            />
            <a
              href="https://storyset.com/worker"
              rel="noreferrer"
              target="_blank"
              className="mx-auto w-auto -translate-y-8 text-gray-200/50"
            >
              Worker illustrations by Storyset
            </a>
            <button
              className="mx-auto w-[200px] rounded-md bg-smMain-500 py-3 font-semibold text-white shadow-md transition hover:bg-smMain-600"
              onClick={() => setNewProjectModalOpen(true)}
            >
              Add new project
            </button>
          </div>
        )}

        {projects?.length! > 0 && (
          <>
            <div>
              <animated.div style={springAnimation} className="projects-grid">
                {projects
                  ?.filter((elem) => {
                    switch (selectedFilter?.value) {
                      case "all":
                        return true;
                      case "active":
                        return !elem.readonly;
                      case "old":
                        return elem.readonly;
                      default:
                        return false;
                    }
                  })
                  .map((project, idx) => (
                    <Project key={idx} project={project} />
                  ))}

                {selectedFilter?.value !== "old" && (
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
                )}
              </animated.div>
            </div>
          </>
        )}
      </div>
      <NewProjectModal
        isOpen={newProjectModalOpen}
        close={() => setNewProjectModalOpen(false)}
      />
    </>
  );
}

export async function getServerSideProps(context: any) {
  const cookies = context.req.headers.cookie;
  const cookiesObj = getParsedCookies(cookies);

  if (
    !cookiesObj ||
    (cookiesObj && !Object.prototype.hasOwnProperty.call(cookiesObj, "sid"))
  ) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

import { useState } from "react";
import Image from "next/image";
import { useSpring, animated } from "react-spring";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "@tanstack/react-query";

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
      <div className="px-3 md:px-0">
        <h1 className="mb-14 inline-block text-2xl font-bold text-gray-600 md:text-3xl">
          Projects
        </h1>

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
          <div>
            <animated.div style={springAnimation} className="projects-grid">
              {projects?.map((project, idx) => (
                <Project key={idx} project={project} />
              ))}

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

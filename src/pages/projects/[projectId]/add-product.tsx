import { useState } from "react";
import Link from "next/link";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import SEO from "../../../components/SEO";
const DotsLoader = dynamic(
  () => import("../../../components/HelperComponents/DotsLoader")
);

import useAuth from "../../../context/AuthContext";
import { FETCH_PROJECT_KEY } from "../../../utils/queryKeys";
import getParsedCookies from "../../../utils/cookie-parser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getProject } from "../../../services/project.service";
import NotFoundPage from "../../404";
import NewProductForm from "../../../components/UserHomePage/ProjectsPage/NewProductForm";

export default function AddProductPage() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const { projectId } = router.query;

  const { data: project, status: projectStatus } = useQuery(
    [FETCH_PROJECT_KEY, projectId],
    () => getProject(projectId as string),
    {
      staleTime: 1000 * 60 * 60,
      enabled: isLoggedIn,
    }
  );

  if (projectStatus === "error" || project?.readonly) {
    return <NotFoundPage />;
  }
  if (projectStatus === "loading") {
    return <DotsLoader />;
  }

  return (
    <>
      <SEO title={project?.title} />
      <div className="mb-32 px-5 md:px-0">
        <div className="mb-14 flex flex-col justify-between md:flex-row md:items-center">
          <div className="md:mb-0 md:w-2/3">
            <h1 className="flex text-2xl font-bold text-gray-600 md:text-3xl">
              <Link href="/projects" prefetch={false}>
                <a className="text-gray-400">
                  Projects
                  <FontAwesomeIcon
                    icon={faAngleRight}
                    className="mx-2 h-6 w-6"
                  />
                </a>
              </Link>
              <Link href={`/projects/${projectId}`} prefetch={false}>
                <a className="text-gray-400">
                  {project?.title}
                  <FontAwesomeIcon
                    icon={faAngleRight}
                    className="mx-2 h-6 w-6"
                  />
                </a>
              </Link>
              Add product
            </h1>
          </div>
        </div>
        <div className="w-[500px]">
          <NewProductForm projectId={projectId as string} />
        </div>
      </div>
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

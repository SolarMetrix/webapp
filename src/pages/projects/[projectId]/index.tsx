import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { PlusIcon } from "@heroicons/react/20/solid";
import {
  faAngleRight,
  faFileCirclePlus,
  faSolarPanel,
} from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import Router, { useRouter } from "next/router";

import SEO from "../../../components/SEO";
const NewItemBtn = dynamic(
  () => import("../../../components/HelperComponents/NewItemBtn")
);
const DotsLoader = dynamic(
  () => import("../../../components/HelperComponents/DotsLoader")
);

import useAuth from "../../../context/AuthContext";
import useUI from "../../../context/UIContext";
import {
  FETCH_PRODUCTS_KEY,
  FETCH_PROJECT_KEY,
} from "../../../utils/queryKeys";
import getParsedCookies from "../../../utils/cookie-parser";
import { IUser } from "../../../../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getProjectProducts } from "../../../services/product.service";
import { getProject } from "../../../services/project.service";
import NotFoundPage from "../../404";

export default function ProjectPage() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const [subRequiredModalOpen, setSubRequiredModalOpen] =
    useState<boolean>(false);
  const [subUserNoNotesModal, setSubUserNoNotesModal] =
    useState<boolean>(false);
  const { projectId } = router.query;

  const { data: project, status: projectStatus } = useQuery(
    [FETCH_PROJECT_KEY, projectId],
    () => getProject(projectId as string),
    {
      staleTime: 1000 * 60 * 60,
    }
  );

  const { data: products, status: productsStatus } = useQuery(
    [FETCH_PRODUCTS_KEY, projectId],
    () => getProjectProducts(projectId as string),
    {
      staleTime: 1000 * 60 * 60,
      enabled: isLoggedIn,
      retry: 1,
    }
  );

  if (projectStatus === "error" || productsStatus === "error") {
    return <NotFoundPage />;
  }
  if (projectStatus === "loading" || productsStatus === "loading") {
    return <DotsLoader />;
  }

  return (
    <>
      <SEO title={project?.title} />
      <div className="mb-32 px-5 md:px-0">
        <div className="flex flex-col justify-between md:flex-row md:items-center">
          <div className="mb-3 md:mb-0 md:w-2/3">
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
              {project?.title}
            </h1>
            {project?.description && (
              <span className="mt-1 block text-lg text-gray-400">
                {project?.description}
              </span>
            )}
          </div>
        </div>
        <div className="mt-[200px] text-center">
          {/* <Image src="/img/solar-panel.svg" width={100} height={100} /> */}
          <FontAwesomeIcon
            icon={faSolarPanel}
            className="h-28 w-28 text-gray-600"
          />
          <h3 className="mt-2 text-sm font-semibold text-gray-700">
            No products
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by adding a new product.
          </p>
          <div className="mt-6">
            <Link href={`/projects/${projectId}/add-product`}>
              <a className="inline-flex items-center rounded-md bg-smMain-500 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-smMain-600">
                <PlusIcon
                  className="-ml-0.5 mr-1.5 h-5 w-5"
                  aria-hidden="true"
                />
                New Product
              </a>
            </Link>
          </div>
        </div>

        {/* <NotesList notes={notes} sortByStarred={false} showCta={true} /> */}
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

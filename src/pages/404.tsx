import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faCircleQuestion,
  faUser,
  faRightToBracket,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import SEO from "../components/SEO";
import useAuth from "../context/AuthContext";
// import classnames from "../utils/classnames";

export default function NotFoundPage() {
  const { isLoggedIn } = useAuth();
  // const marginStyles = isLoggedIn
  //   ? "mt-[60px] lg:mt-[100px]"
  //   : "md:mt-[50px] lg:mt-[60px]";

  const links = [
    {
      title: "Home page",
      description: "Go to the home page",
      href: "/",
      icon: faHouse,
    },
    {
      title: "Join page",
      description: "Sign in to your account",
      href: "/signin",
      icon: faRightToBracket,
    },
    {
      title: "Profile",
      description: "View my profile and other contact information",
      href: "/profile",
      icon: faUser,
    },
  ];

  const adjustedLinks = isLoggedIn
    ? links.filter((_, idx) => idx !== 1)
    : links.filter((_, idx) => idx !== 2);

  return (
    <>
      <SEO url={`${process.env.NEXT_PUBLIC_WEB_APP_ENDPOINT}/`} />
      <div className="mx-4 md:mt-[50px] lg:mt-[200px]">
        <div className="mx-auto max-w-xl">
          <div className="text-center">
            <p className="text-base font-semibold text-smMain-400">404</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-smMain-600 sm:tracking-tight md:text-4xl">
              Page not found
            </h1>
            <p className="mt-3 text-lg text-gray-500">
              The page you are looking for does not exist or has been moved.
            </p>
          </div>
          <div className="mt-12">
            <h2 className="text-base font-semibold text-gray-500">
              Other pages
            </h2>
            <ul
              role="list"
              className="mt-4 divide-y divide-gray-200 border-b border-t border-gray-200"
            >
              {adjustedLinks.map((link, idx) => (
                <li
                  key={idx}
                  className="relative flex items-start space-x-4 py-6"
                >
                  <div className="flex-shrink-0">
                    <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-200/50">
                      <FontAwesomeIcon
                        icon={link.icon}
                        className="h-6 w-6 text-smMain-500"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base font-medium text-gray-700">
                      <span className="rounded-sm">
                        <Link href={link.href} prefetch={false}>
                          <a className="focus:outline-none">
                            <span
                              className="absolute inset-0"
                              aria-hidden="true"
                            />
                            {link.title}
                          </a>
                        </Link>
                      </span>
                    </h3>
                    <p className="text-base text-gray-500">
                      {link.description}
                    </p>
                  </div>
                  <div className="flex-shrink-0 self-center">
                    <FontAwesomeIcon
                      icon={faChevronRight}
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

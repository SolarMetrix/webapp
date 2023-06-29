import { Fragment, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFolderClosed,
  faHouse,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { Dialog, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

import useAuth from "../../../context/AuthContext";
import classnames from "../../../utils/classnames";
import constructUserInitials from "../../../helpers/construct-user-initials";
import Tooltip from "../../HelperComponents/Tooltip";
import { logout } from "../../../services/user.service";
import Loader from "../../HelperComponents/Loader";

const navigation = [
  {
    name: "Home",
    href: "/",
    icon: faHouse,
    isFontAwesomeIcon: false,
    current: true,
  },
  {
    name: "Projects",
    href: "/projects",
    icon: faFolderClosed,
    isFontAwesomeIcon: true,
    current: false,
  },
];
const products = [
  { id: 1, name: "FirstSolar", initial: "F", powerPeak: 480, efficiency: 19 },
  { id: 2, name: "Sunpower", initial: "S", powerPeak: 440, efficiency: 22.8 },
  {
    id: 3,
    name: "JinkoSolar",
    initial: "J",
    powerPeak: 535,
    efficiency: 21.16,
  },
];

export default function SidebarWithLayout({ children }: { children: any }) {
  const { user } = useAuth();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [signoutLoading, setSignoutLoading] = useState(false);

  const signout = () => {
    setSignoutLoading(true);
    return logout()
      .then((result: any) => {
        if (result.success) {
          localStorage.removeItem("auth");
          window.location.replace("/");
        }
      })
      .catch((_) => {});
  };

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-[400] lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2">
                    <div className="flex h-16 shrink-0 items-center">
                      <Image
                        src="/img/logo.svg"
                        alt="Logo"
                        className="border"
                        width={150}
                        height={40}
                      />
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                              <Link href={item.href} key={item.name}>
                                <a
                                  className={classnames(
                                    router.pathname === item.href
                                      ? "bg-gray-100 text-gray-600"
                                      : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600",
                                    "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                                  )}
                                >
                                  <FontAwesomeIcon
                                    icon={item.icon}
                                    className={classnames(
                                      router.pathname === item.href
                                        ? "text-indigo-600"
                                        : "text-gray-400 group-hover:text-indigo-600",
                                      "h-6 w-6 shrink-0"
                                    )}
                                    aria-hidden="true"
                                  />
                                  {item.name}
                                </a>
                              </Link>
                            ))}
                          </ul>
                        </li>
                        <li>
                          <div className="text-xs font-semibold leading-6 text-gray-400">
                            Products
                          </div>
                          <ul role="list" className="-mx-2 mt-2 space-y-1">
                            {products.map((product) => (
                              <li key={product.name}>
                                <div className="group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-50 hover:text-gray-600">
                                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white text-[0.625rem] font-medium text-gray-400 group-hover:border-indigo-600 group-hover:text-indigo-600">
                                    {product.initial}
                                  </span>
                                  <span className="truncate">
                                    {product.name}
                                  </span>
                                </div>
                              </li>
                            ))}
                            <li>
                              <div className="group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-50 hover:text-gray-600">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white text-[0.625rem] font-medium text-gray-400 group-hover:border-indigo-600 group-hover:text-indigo-600">
                                  F
                                </span>
                                <span className="truncate">
                                  More coming soon...
                                </span>
                              </div>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
            <div className="flex h-16 shrink-0 items-center">
              <Image
                src="/img/logo.svg"
                alt="Logo"
                className="border"
                width={170}
                height={40}
              />
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <Link href={item.href} key={item.name}>
                        <a
                          className={classnames(
                            router.pathname === item.href
                              ? "bg-gray-100 text-gray-600"
                              : "text-gray-400 hover:bg-gray-50 hover:text-gray-600",
                            "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                          )}
                        >
                          <FontAwesomeIcon
                            icon={item.icon}
                            className={classnames(
                              router.pathname === item.href
                                ? "text-gray-600"
                                : "text-gray-400 group-hover:text-gray-600",
                              "h-5 w-5 shrink-0"
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </a>
                      </Link>
                    ))}
                  </ul>
                </li>
                <li>
                  <div className="text-xs font-semibold leading-6 text-gray-400">
                    Products
                  </div>
                  <ul role="list" className="-mx-2 mt-2 space-y-1">
                    {products.map((product) => (
                      <li key={product.name}>
                        <div className="leading-6m group flex gap-x-3 rounded-md p-2 text-sm font-semibold text-gray-400 hover:bg-gray-50 hover:text-gray-600">
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white text-[0.625rem] font-medium text-gray-400 group-hover:border-gray-600 group-hover:text-gray-600">
                            {product.initial}
                          </span>
                          <div className="flex flex-col">
                            <span className="truncate">{product.name}</span>
                            <div>
                              <span className="text-xs font-normal text-gray-400">
                                {product.powerPeak} Wp -{" "}
                              </span>
                              <span className="text-xs font-normal text-gray-400">
                                {product.efficiency}% efficiency
                              </span>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                    <li>
                      <div className="leading-6m group flex gap-x-3 rounded-md p-2 text-sm font-semibold text-gray-400 hover:bg-gray-50 hover:text-gray-600">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white text-[0.625rem] font-medium text-gray-400 group-hover:border-gray-600 group-hover:text-gray-600">
                          F
                        </span>
                        <span className="truncate">More coming soon...</span>
                      </div>
                    </li>
                  </ul>
                </li>
                <li className="-mx-6 mt-auto flex items-center justify-between px-7 py-3">
                  <Link href="/profile">
                    <a className="flex w-[180px] items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
                      <span className="inline-flex min-h-[30px] min-w-[30px] items-center justify-center rounded-md bg-smMain-500">
                        <span className="text-xs font-medium leading-none text-white">
                          {constructUserInitials(user)}
                        </span>
                      </span>
                      <span
                        aria-hidden="true"
                        className="truncate overflow-ellipsis text-gray-500"
                      >
                        {user?.email}
                      </span>
                    </a>
                  </Link>
                  <Tooltip text={signoutLoading ? "Signing out" : "Sign out"}>
                    {signoutLoading ? (
                      <Loader size={5} classes="mr-0" />
                    ) : (
                      <FontAwesomeIcon
                        icon={faRightFromBracket}
                        className="h-5 w-5 cursor-pointer text-gray-500"
                        onClick={() => signout()}
                      />
                    )}
                  </Tooltip>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="sticky top-0 z-20 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex-1 text-sm font-semibold leading-6 text-gray-900">
            Home
          </div>
          <Link href="/profile">
            <a className="flex items-center gap-x-2 text-sm font-semibold leading-6 text-gray-900">
              <span className="inline-flex min-h-[30px] min-w-[30px] items-center justify-center rounded-md bg-smMain-500">
                <span className="text-xs font-medium leading-none text-white">
                  {constructUserInitials(user)}
                </span>
              </span>
            </a>
          </Link>
        </div>

        <main className="pt-10 lg:pl-72">
          <div className="px-4 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </>
  );
}

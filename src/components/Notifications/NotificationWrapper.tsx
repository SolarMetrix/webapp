import { Fragment } from "react";
import { Transition } from "@headlessui/react";

export default function NotificationWrapper({
  show,
  children,
}: {
  show: boolean;
  children: any;
}) {
  return (
    <div
      aria-live="assertive"
      className="pointer-events-none fixed bottom-0 right-0 z-30 flex min-w-full items-end px-4 py-6 sm:items-start sm:p-6"
    >
      <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
        <Transition
          show={show}
          as={Fragment}
          enter="transform ease-out duration-300 transition"
          enterFrom="translate-y-2 opacity-0"
          enterTo="translate-y-0 opacity-100"
          leave="transition ease-in duration-200"
          leaveFrom="translate-y-0 opacity-100"
          leaveTo="translate-y-0 opacity-0"
          appear={true}
        >
          {children}
        </Transition>
      </div>
    </div>
  );
}

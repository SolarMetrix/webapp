import { useEffect } from "react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

import NotificationWrapper from "./NotificationWrapper";

export default function AuthSuccessNotification({
  show,
  text,
  hide,
}: {
  show: boolean;
  text: string;
  hide: () => void;
}) {
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    timer = setTimeout(() => hide(), 4000);

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, []);

  return (
    <NotificationWrapper show={show}>
      <div className="pointer-events-auto min-w-[300px] max-w-sm overflow-hidden rounded-md bg-ebGreen-500  shadow-lg">
        <div className="p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <CheckCircleIcon
                className="h-8 w-8 text-white"
                aria-hidden="true"
              />
            </div>
            <div className="ml-2">
              <p className="text-sm font-bold text-white">{text}</p>
            </div>
          </div>
        </div>
      </div>
    </NotificationWrapper>
  );
}

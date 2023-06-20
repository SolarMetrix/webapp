import { useState } from "react";
import Image from "next/image";
import { useSpring, animated } from "react-spring";

import { queryClient } from "../../../helpers/queryClient";
import { IUser } from "../../../../types";
import { FETCH_AUTH_USER_KEY } from "../../../utils/queryKeys";
import { useMutation } from "@tanstack/react-query";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import HttpButton from "../../HelperComponents/HttpButton";

export default function ProfileData({ user }: { user: IUser }) {
  const [firstname, setFirstname] = useState<string>(user?.firstname);
  const [lastname, setLastname] = useState<string>(user?.lastname);
  const valuesAreDifferent =
    firstname !== user?.firstname || lastname !== user?.lastname;

  const springAnimation = useSpring({
    from: { display: "none", opacity: 0 },
    to: {
      display: "block",
      opacity:
        valuesAreDifferent && firstname?.length > 2 && lastname?.length > 2
          ? 1
          : 0,
    },
    config: { duration: 200 },
  });

  return (
    <div className="max-w-[350px]">
      <div className="mb-8 flex flex-col">
        <span className="mb-1 font-medium text-gray-600">Firstname</span>
        <input
          type="text"
          className="text-md focus:border-1 transition-400 rounded-md border border-gray-200 px-2 py-3 text-gray-500 shadow-sm ring-0 transition focus:border-gray-300 focus:shadow-md focus:outline-none focus:ring-0"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
      </div>

      <div className="mb-8 flex flex-col">
        <span className="mb-1 font-medium text-gray-600">Lastname</span>
        <input
          type="text"
          className="text-md focus:border-1 transition-400 rounded-md border border-gray-200 px-2 py-3 text-gray-500 shadow-sm ring-0 transition focus:border-gray-300 focus:shadow-md focus:outline-none focus:ring-0"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
      </div>

      <div className="mb-8 flex flex-col">
        <span className="mb-1 font-medium text-gray-600">Email</span>
        <span className="text-md cursor-not-allowed rounded-md border border-gray-200 px-2 py-3 text-gray-500 shadow-sm">
          {user?.email}
        </span>
      </div>

      <animated.div style={springAnimation}>
        <HttpButton
          text="Save updates"
          faIcon={faPen}
          customClasses="w-full shadow-md py-3 bg-ebGreen-500 hover:bg-ebGreen-600 transition"
          fnc={() => {}}
          isLoading={false}
          disabled={false}
        />
      </animated.div>
    </div>
  );
}

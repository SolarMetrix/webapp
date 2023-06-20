import { useState } from "react";
import { faPen } from "@fortawesome/free-solid-svg-icons";

import { queryClient } from "../../../helpers/queryClient";
import { IUser } from "../../../../types";
import { FETCH_AUTH_USER_KEY } from "../../../utils/queryKeys";
import { useMutation } from "@tanstack/react-query";
import HttpButton from "../../HelperComponents/HttpButton";

export default function PersonalInformation({ user }: { user: IUser }) {
  const [firstname, setFirstname] = useState<string>(user?.firstname);
  const [lastname, setLastname] = useState<string>(user?.lastname);
  const valuesAreDifferent =
    (firstname?.length > 2 && firstname !== user?.firstname) ||
    (lastname?.length > 2 && lastname !== user?.lastname);

  return (
    <div className="mb-20">
      <h2 className="text-xls inline-block text-gray-600 md:text-2xl">
        Personal Information
      </h2>

      <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <label
            htmlFor="first-name"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            First name
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="first-name"
              id="first-name"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              className="sm:text-md block w-full rounded-md border-0 py-2 text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 transition placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-400 sm:leading-6"
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="last-name"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Last name
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="last-name"
              id="last-name"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              className="sm:text-md block w-full rounded-md border-0 py-2 text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 transition placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-400 sm:leading-6"
            />
          </div>
        </div>

        <div className="sm:col-span-6">
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Email address
          </label>
          <div className="mt-2">
            <span className="sm:text-md block w-full cursor-not-allowed rounded-md border-0 px-2 py-2 text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 transition placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-400 sm:leading-6">
              {user?.email}
            </span>
          </div>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="first-name"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Country
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="Country"
              id="Country"
              className="sm:text-md block w-full rounded-md border-0 py-2 text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 transition placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-400 sm:leading-6"
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="city"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            City
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="city"
              id="city"
              className="sm:text-md block w-full rounded-md border-0 py-2 text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 transition placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-400 sm:leading-6"
            />
          </div>
        </div>

        <div className="sm:col-span-6">
          <HttpButton
            text="Save updates"
            faIcon={faPen}
            iconSize={4}
            customClasses="w-full shadow-md py-3 bg-smMain-500 hover:bg-ebGreen-600 transition"
            fnc={() => {}}
            isLoading={false}
            disabled={!valuesAreDifferent}
          />
        </div>
      </div>
    </div>
  );
}

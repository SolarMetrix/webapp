import { useState } from "react";
import { faPen } from "@fortawesome/free-solid-svg-icons";

import { queryClient } from "../../../helpers/queryClient";
import { IUser } from "../../../../types";
import { FETCH_AUTH_USER_KEY } from "../../../utils/queryKeys";
import { useMutation } from "@tanstack/react-query";
import HttpButton from "../../HelperComponents/HttpButton";
import classnames from "../../../utils/classnames";
import { updateUser } from "../../../services/user.service";

export default function PersonalInformation({ user }: { user: IUser }) {
  const [firstname, setFirstname] = useState<string>(user?.firstname);
  const [lastname, setLastname] = useState<string>(user?.lastname);
  const [country, setCountry] = useState<string>(user?.country);
  const [city, setCity] = useState<string>(user?.city);

  const valuesAreDifferent =
    (firstname?.length > 2 && firstname !== user?.firstname) ||
    (lastname?.length > 2 && lastname !== user?.lastname) ||
    (country?.length > 1 && country !== user?.country) ||
    (city?.length > 1 && city !== user?.city);

  const { mutate: updateUserMutation, isLoading: updateUserLoading } =
    useMutation(updateUser, {
      onSuccess: () => {
        close();
        queryClient.invalidateQueries({
          queryKey: [FETCH_AUTH_USER_KEY],
        });
      },
    });

  return (
    <div className="mb-20">
      <h2 className="text-xls inline-block text-gray-600 md:text-2xl">
        Personal Information
      </h2>

      <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <label
            htmlFor="firstname"
            className="block text-sm font-medium leading-6 text-gray-700"
          >
            First name
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="firstname"
              id="firstname"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              className="sm:text-md block w-full rounded-md border-0 py-2 text-gray-600 shadow transition focus:shadow-md focus:ring-0 sm:leading-6"
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="lastname"
            className="block text-sm font-medium leading-6 text-gray-700"
          >
            Last name
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="lastname"
              id="lastname"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              className="sm:text-md block w-full rounded-md border-0 py-2 text-gray-600 shadow transition focus:shadow-md focus:ring-0 sm:leading-6"
            />
          </div>
        </div>

        <div className="sm:col-span-6">
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-700"
          >
            Email address
          </label>
          <div className="mt-2">
            <span className="sm:text-md block w-full cursor-not-allowed rounded-md px-2 py-2 text-gray-600 shadow sm:leading-6">
              {user?.email}
            </span>
          </div>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="country"
            className="block text-sm font-medium leading-6 text-gray-700"
          >
            Country
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="country"
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="sm:text-md block w-full rounded-md border-0 py-2 text-gray-600 shadow transition focus:shadow-md focus:ring-0 sm:leading-6"
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="city"
            className="block text-sm font-medium leading-6 text-gray-700"
          >
            City
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="city"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="sm:text-md block w-full rounded-md border-0 py-2 text-gray-600 shadow transition focus:shadow-md focus:ring-0 sm:leading-6"
            />
          </div>
        </div>

        <div className="sm:col-span-6">
          <HttpButton
            text="Save updates"
            faIcon={faPen}
            iconSize={4}
            customClasses={classnames(
              "w-full shadow-md py-3 bg-smMain-500",
              valuesAreDifferent && "hover:bg-smMain-600 transition"
            )}
            fnc={() =>
              updateUserMutation({ firstname, lastname, country, city })
            }
            isLoading={updateUserLoading}
            disabled={!valuesAreDifferent || updateUserLoading}
          />
        </div>
      </div>
    </div>
  );
}

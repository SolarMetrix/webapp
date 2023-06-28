import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import classnames from "../../../../utils/classnames";

const filterTypes = [
  { id: 1, name: "All" },
  { id: 2, name: "Active projects"},
  { id: 3, name: "Old projects"},
];

export default function FilterDropdown() {
  const [selected, setSelected] = useState(filterTypes[0]);

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <div className="relative mt-2">
            <Listbox.Button className="sm:text-md relative w-full cursor-default rounded-md bg-white py-2.5 pl-3 pr-10 text-left text-gray-600 shadow-sm ring-1 ring-gray-300 transition hover:shadow-md focus:outline-none sm:leading-6">
              <span className="block truncate">{selected?.name}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg  focus:outline-none sm:text-sm">
                {filterTypes.map((person) => (
                  <Listbox.Option
                    key={person.id}
                    className={({ active }) =>
                      classnames(
                        active ? "bg-smMain-400 text-white" : "text-gray-600",
                        "relative cursor-default select-none py-2 pl-3 pr-9"
                      )
                    }
                    value={person}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={classnames(
                            selected ? "font-semibold" : "font-normal",
                            "block truncate"
                          )}
                        >
                          {person.name}
                        </span>

                        {selected ? (
                          <span
                            className={classnames(
                              active ? "text-white" : "text-smMain-400",
                              "absolute inset-y-0 right-0 flex items-center pr-4"
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}

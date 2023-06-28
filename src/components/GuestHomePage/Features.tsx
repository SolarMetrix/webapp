import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  DocumentChartBarIcon,
  MapIcon,
  FolderIcon,
} from "@heroicons/react/20/solid";

const features = [
  {
    name: "Visual map",
    description:
      "View your solar panels on a map and get a quick overview of their status",
    icon: MapIcon,
  },
  {
    name: "Projects",
    description:
      "Group related solar panels into projects for better organization",
    icon: FolderIcon,
  },
  {
    name: "30-day reports",
    description:
      "Get a quick overview of the performance of your solar panels over the last 30 days",
    icon: DocumentChartBarIcon,
  },
];

export default function Features() {
  return (
    <div
      className="mx-auto max-w-7xl px-6 sm:mt-56 lg:mb-32 lg:px-8 lg:pt-6"
      id="features"
    >
      <div className="relative isolate px-6 sm:rounded-3xl sm:px-10 xl:px-24">
        <div className="text-center">
          <Image
            src="/img/storyset-3.svg"
            alt="Storyset 1"
            width={2000}
            height={1042}
          />
          <a
            href="https://storyset.com/outdoors"
            rel="noreferrer"
            target="_blank"
            className="inline-block -translate-y-4 text-gray-200/60"
          >
            Outdoors illustrations by Storyset
          </a>
        </div>
      </div>
      <div className="mx-auto max-w-2xl lg:text-center">
        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-500 sm:text-4xl">
          What we offer
        </p>
      </div>
      <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.name} className="flex flex-col">
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-600">
                <feature.icon
                  className="h-5 w-5 flex-none text-gray-600"
                  aria-hidden="true"
                />
                {feature.name}
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-500">
                <p className="flex-auto">{feature.description}</p>
                <p className="mt-6">
                  <Link href="/signin">
                    <a className="text-sm font-semibold leading-6 text-gray-400">
                      Learn more <span aria-hidden="true">→</span>
                    </a>
                  </Link>
                </p>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

import React from "react";
import Image from "next/image";

export default function About() {
  return (
    <div
      className="mx-auto max-w-7xl sm:mt-56 sm:px-6 lg:px-8 lg:pt-6"
      id="about"
    >
      <div className="relative isolate px-6 py-20 sm:rounded-3xl sm:px-10 sm:py-24 lg:py-24 xl:px-24">
        <div className="text-center">
          <Image
            src="/img/storyset-1.svg"
            alt="Storyset 1"
            width={2000}
            height={1042}
          />
          <a
            href="https://storyset.com/outdoors"
            rel="noreferrer"
            target="_blank"
            className="inline-block -translate-y-20 text-gray-200/60"
          >
            Outdoors illustrations by Storyset
          </a>
        </div>
        <div className="mx-auto w-[600px] text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-500 sm:text-4xl">
            Understand how well your solar <br /> panels are performing
            <br />
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-400">
            Have you ever wondered how solar panels could change your energy
            consumption? SolarMetrix lets you easily compare different solar
            panels from different manufacturers and different combinations of
            them
          </p>
        </div>
      </div>
    </div>
  );
}

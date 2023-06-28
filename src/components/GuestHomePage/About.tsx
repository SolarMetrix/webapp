import React from "react";

export default function About() {
  return (
    <div className="mx-auto mt-[200px] max-w-7xl md:mt-[300px]" id="about">
      <div className="relative isolate px-6 sm:rounded-3xl">
        <div className="text-center">
          <img
            src="/img/storyset-1.svg"
            alt="Storyset 1"
            className="mx-auto h-auto w-[1000px]"
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
        <div className="mx-auto text-center sm:w-[80%] xl:w-[600px]">
          <h2 className="text-3xl font-bold tracking-tight text-gray-500 sm:text-4xl">
            Understand how well your solar panels are performing
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

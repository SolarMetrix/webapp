import React from "react";

export default function LogoCloud() {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mx-auto flex items-center gap-x-8 gap-y-12 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 sm:gap-y-14 lg:mx-0 lg:max-w-none lg:grid-cols-5">
        <img
          className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
          src="https://tailwindui.com/img/logos/158x48/transistor-logo-gray-400.svg"
          alt="Transistor"
          width={158}
          height={48}
        />
        <img
          className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
          src="https://tailwindui.com/img/logos/158x48/reform-logo-gray-400.svg"
          alt="Reform"
          width={158}
          height={48}
        />
        <img
          className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
          src="https://tailwindui.com/img/logos/158x48/tuple-logo-gray-400.svg"
          alt="Tuple"
          width={158}
          height={48}
        />
      </div>
    </div>
  );
}

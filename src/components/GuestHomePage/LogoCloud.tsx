import React from "react";

export default function LogoCloud() {
  return (
    <div className="mx-auto max-w-5xl px-6 lg:px-8">
      <div className="mx-auto flex justify-between gap-y-12 lg:max-w-none">
        <img
          className="max-h-12 w-full object-contain"
          src="https://tailwindui.com/img/logos/158x48/transistor-logo-gray-400.svg"
          alt="Transistor"
          width={158}
          height={48}
        />
        <img
          className="max-h-12 w-full object-contain"
          src="https://tailwindui.com/img/logos/158x48/reform-logo-gray-400.svg"
          alt="Reform"
          width={158}
          height={48}
        />
        <img
          className="max-h-12 w-full object-contain"
          src="https://tailwindui.com/img/logos/158x48/tuple-logo-gray-400.svg"
          alt="Tuple"
          width={158}
          height={48}
        />
      </div>
    </div>
  );
}

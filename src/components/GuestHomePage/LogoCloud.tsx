import Image from "next/image";

export default function LogoCloud() {
  return (
    <div className="mx-auto  px-6 lg:px-8">
      <div className="mx-auto flex justify-between gap-y-12 lg:max-w-none">
        <div className="flex flex-col items-center">
          <Image
            src="/img/FirstSolar_logo.svg"
            alt="FirstSolar logo"
            width={120}
            height={140}
          />
          <span className="text-lg text-gray-500 font-bold">480 watts</span>
          <span className="text-lg text-gray-500">19%</span>
        </div>
        <div className="flex flex-col items-center">
          <Image
            src="/img/Sunpower_logo.svg"
            alt="Sunpower logo"
            width={170}
            height={140}
          />
          <span className="text-lg text-gray-500 font-bold">440 watts</span>
          <span className="text-lg text-gray-500">22.8%</span>
        </div>
        <div className="flex flex-col items-center">
          <Image
            src="/img/JinkoSolar_logo.svg"
            alt="JinkoSolar logo"
            width={170}
            height={140}
          />
          <span className="text-lg text-gray-500 font-bold">535 watts</span>
          <span className="text-lg text-gray-500">21.16%</span>
        </div>
      </div>
    </div>
  );
}

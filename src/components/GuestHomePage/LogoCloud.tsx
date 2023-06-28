import Image from "next/image";

export default function LogoCloud() {
  return (
    <div className="mx-auto px-6 lg:px-8">
      <div className="mx-auto flex w-[80%] justify-around lg:max-w-none">
        <Image
          src="/img/FirstSolar_logo.svg"
          alt="FirstSolar logo"
          width={120}
          height={140}
        />
        <Image
          src="/img/Sunpower_logo.svg"
          alt="Sunpower logo"
          width={170}
          height={140}
        />
        <Image
          src="/img/JinkoSolar_logo.svg"
          alt="JinkoSolar logo"
          width={170}
          height={140}
        />
      </div>
    </div>
  );
}

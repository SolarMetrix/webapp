import Image from "next/image";

export default function LogoCloud() {
  return (
    <div className="mx-auto max-w-5xl px-6 lg:px-8">
      <div className="mx-auto flex justify-between gap-y-12 lg:max-w-none">
        <Image src="/img/FirstSolar_logo.svg" alt="FirstSolar logo" width={120} height={140} />
        <Image src="/img/Sunpower_logo.svg" alt="FirstSolar logo" width={170} height={140} />
        <Image src="/img/JinkoSolar_logo.svg" alt="FirstSolar logo" width={170} height={140} />
      </div>
    </div>
  );
}

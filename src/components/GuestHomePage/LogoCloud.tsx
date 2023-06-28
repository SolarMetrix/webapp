export default function LogoCloud() {
  return (
    <div className="mx-auto px-3 lg:px-8">
      <div className="mx-auto flex w-full flex-col items-center justify-around gap-y-24 sm:flex-row lg:w-[80%] lg:max-w-none">
        <img
          src="/img/FirstSolar_logo.svg"
          alt="FirstSolar logo"
          className="h-auto w-32"
        />
        <img
          src="/img/Sunpower_logo.svg"
          alt="Sunpower logo"
          className="h-auto w-44"
        />
        <img
          src="/img/JinkoSolar_logo.svg"
          alt="JinkoSolar logo"
          className="h-auto w-44"
        />
      </div>
    </div>
  );
}

import Link from "next/link";

export default function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav
        className="flex items-center justify-between px-3 py-6 sm:p-6 lg:px-16"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="/">
            <a className="-m-1.5 p-1.5">
              <span className="sr-only">SolarMetrix</span>
              <img
                src="/img/logo.svg"
                alt="SolarMetrix logo"
                className="h-auto w-44 sm:w-56"
              />
            </a>
          </Link>
        </div>
        <div className="flex justify-end md:flex-1">
          <Link href="/signin">
            <a className="text-md font-semibold leading-6 text-gray-600">
              Log in <span aria-hidden="true">&rarr;</span>
            </a>
          </Link>
        </div>
      </nav>
    </header>
  );
}

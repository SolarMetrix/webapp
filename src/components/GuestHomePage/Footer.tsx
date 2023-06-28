import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="mt-[250px] bg-white shadow-2xl">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-20 text-center sm:py-14 lg:px-8">
        <Link href="/">
          <a className="-m-1.5 p-1.5">
            <span className="sr-only">SolarMetrix</span>
            <Image
              src="/img/logo.svg"
              alt="SolarMetrix logo"
              width={200}
              height={40}
            />
          </a>
        </Link>
        <p className="mt-3 text-center text-xs leading-5 text-gray-500">
          &copy; 2023 SolarMetrix.
        </p>
      </div>
    </footer>
  );
}

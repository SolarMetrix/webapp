import Link from "next/link";

export default function Hero() {
  return (
    <div>
      <div className="relative isolate px-3 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 text-center sm:py-48 lg:py-56">
          <h1 className="text-4xl font-extrabold tracking-tight text-smMain-400 sm:text-5xl lg:text-6xl">
            Solar power insights <br /> at a glance
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Simplify your solar panel management, compare products across
            manufacturers & gain valuable insights through 30-day reports
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link href="/signin">
              <a className="rounded-md bg-smMain-400 px-7 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-smMain-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
                Get started
              </a>
            </Link>
            <a
              href="#about"
              className="text-md font-semibold leading-6 text-gray-400 transition hover:text-gray-500"
            >
              Learn more <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

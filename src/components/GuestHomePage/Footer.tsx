const navigation = [
  { name: "About", href: "#about" },
  { name: "Features", href: "#features" },
];

export default function Footer() {
  return (
    <footer className="mt-[250px] bg-white shadow-2xl">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-20 text-center sm:py-14 lg:px-8">
        <div className="mb-4 inline-block">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">SolarMetrix</span>
            <img className="h-8 w-auto" src="/img/logo.svg" alt="" />
          </a>
        </div>
        <nav
          className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12"
          aria-label="Footer"
        >
          {navigation.map((item) => (
            <div key={item.name} className="pb-6">
              <a
                href={item.href}
                className="text-sm leading-6 text-gray-600 hover:text-smMain-700"
              >
                {item.name}
              </a>
            </div>
          ))}
        </nav>
        <p className="mt-10 text-center text-xs leading-5 text-gray-500">
          &copy; 2023 SolarMetrics.
        </p>
      </div>
    </footer>
  );
}

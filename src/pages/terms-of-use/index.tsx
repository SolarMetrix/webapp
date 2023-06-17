import SEO from "../../components/SEO";

export default function TermsConditions() {
  return (
    <>
      <SEO
        url={`${process.env.NEXT_PUBLIC_WEB_APP_ENDPOINT}/terms-of-use`}
        title="Terms of Use"
        description="SolarMetrix - Terms of Use"
      />
      <div className="flex flex-col justify-center md:py-12">
        <div className="mx-auto px-4 sm:px-10 lg:w-[900px]">
          <h1 className="text-center text-3xl font-bold tracking-tight text-gray-600 md:text-4xl">
            Terms of Use
          </h1>
          <p className="mt-1 text-center italic text-gray-400">June 12, 2023</p>
        </div>
      </div>
    </>
  );
}

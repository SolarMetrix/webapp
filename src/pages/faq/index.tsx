import Link from "next/link";

import SEO from "../../components/SEO";

export default function FAQ() {
  return (
    <>
      <SEO
        url={`${process.env.NEXT_PUBLIC_WEB_APP_ENDPOINT}/faq`}
        title="FAQ"
        description="FAQ"
      />
      <section className="bg-gray-50 md:py-12 xl:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-16 gap-y-12 xl:grid-cols-2">
            <div>
              <div className="w-full xl:fixed xl:w-[550px]">
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">
                  FAQ
                </h3>
                <h1 className="mt-3 text-3xl font-bold text-gray-600 md:text-4xl">
                  Frequently Asked Questions
                </h1>
                <p>
                  Here you will find answers to a number of questions asked by
                  visitors and users of the platform.
                </p>
                <p>
                  If you cant find the answer to your question, you can send us
                  an email by clicking{" "}
                  <a
                    href="mailto:info@solarmetrix.com"
                    className="lhe font-medium"
                  >
                    here
                  </a>
                </p>
              </div>
            </div>
            <div>
              <QuestionAnswer question="Question" answer="Answer" />
              <div>
                <p className="mt-3 text-lg font-normal text-gray-600 sm:mt-8">
                  Read our
                  <Link href="/terms-of-use" prefetch={false}>
                    <a className="lhe text-gray-600">terms of use</a>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function QuestionAnswer({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-lg">
      <div className="px-6 py-5 sm:px-9 sm:py-8">
        <p className="text-xl font-bold text-gray-700">{question}</p>
        <p className="mt-6 text-base font-normal leading-7 text-gray-600">
          {answer}
        </p>
      </div>
    </div>
  );
}

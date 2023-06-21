import { useMutation } from "@tanstack/react-query";

import SEO from "../../components/SEO";
import useAuth from "../../context/AuthContext";
import getParsedCookies from "../../utils/cookie-parser";
import Loader from "../../components/HelperComponents/Loader";

export default function ReportsPage(): JSX.Element {
  const { user } = useAuth();

  return (
    <>
      <SEO
        url={`${process.env.NEXT_PUBLIC_WEB_APP_ENDPOINT}/reports`}
        description="Reports page"
        title="Reports"
      />
      <div className="px-3 md:px-0">
        <h1 className="inline-block text-2xl font-bold text-gray-600 md:text-3xl">
          Reports
        </h1>

        <div className="mt-10 max-w-[520px]"></div>
      </div>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const cookies = context.req.headers.cookie;
  const cookiesObj = getParsedCookies(cookies);

  if (
    !cookiesObj ||
    (cookiesObj && !Object.prototype.hasOwnProperty.call(cookiesObj, "sid"))
  ) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

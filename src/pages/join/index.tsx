import { useState } from "react";
import { useRouter } from "next/router";

import SEO from "../../components/SEO";
import { OAuthProvider } from "../../../types";
import getParsedCookies from "../../utils/cookie-parser";

export default function JoinPage() {
  const [providerLoading, setProviderLoading] = useState<boolean>(false);
  const router = useRouter();

  return (
    <>
      <SEO
        url={`${process.env.NEXT_PUBLIC_WEB_APP_ENDPOINT}/join`}
        title="Join"
        description="Join"
      />
      <div className="flex flex-col justify-center py-12 sm:mt-[50px]">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h1 className="text-center text-4xl font-bold tracking-tight text-gray-600">
            Sign in
          </h1>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const cookies = context.req.headers.cookie;
  const cookiesObj = getParsedCookies(cookies);

  if (cookiesObj && Object.prototype.hasOwnProperty.call(cookiesObj, "sid")) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

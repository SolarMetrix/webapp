import { useSpring, animated } from "react-spring";

import SEO from "../../components/SEO";
import getParsedCookies from "../../utils/cookie-parser";
import LogoCloud from "../../components/GuestHomePage/LogoCloud";

export default function ProductsPage(): JSX.Element {
  const springAnimation = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
  });

  return (
    <>
      <SEO
        url={`${process.env.NEXT_PUBLIC_WEB_APP_ENDPOINT}/projects`}
        description="Products page"
        title="Availabel Products"
      />
      <div className="px-3 md:px-0">
        <h1 className="text-2xl font-bold text-gray-600 md:text-3xl">
          Availabe Products
        </h1>

        <h2 className="block text-xl text-gray-400">
          We currently support 3 company products
        </h2>

        <animated.div style={springAnimation} className="mt-16">
          <LogoCloud />
        </animated.div>
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

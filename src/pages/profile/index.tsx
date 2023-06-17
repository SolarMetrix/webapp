import SEO from "../../components/SEO";
import ProfileData from "../../components/UserHomePage/ProfilePage/ProfileData";
import useAuth from "../../context/AuthContext";
import { IUser } from "../../../types";
import getParsedCookies from "../../utils/cookie-parser";

export default function ProfilePage(): JSX.Element {
  const { user } = useAuth();

  return (
    <>
      <SEO
        url={`${process.env.NEXT_PUBLIC_WEB_APP_ENDPOINT}/profile`}
        description="User profile page"
        title="Profile"
      />
      <div className="px-3 md:px-0">
        <h1 className="inline-block text-2xl font-bold text-gray-600 md:text-3xl">
          Profile
        </h1>

        <ProfileData user={user as IUser} />
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

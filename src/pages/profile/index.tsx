import { useMutation } from "@tanstack/react-query";

import SEO from "../../components/SEO";
import useAuth from "../../context/AuthContext";
import getParsedCookies from "../../utils/cookie-parser";
import PersonalInformation from "../../components/UserHomePage/ProfilePage/PersonalInformation";
import { deleteAccount } from "../../services/user.service";
import Loader from "../../components/HelperComponents/Loader";

export default function ProfilePage(): JSX.Element {
  const { user } = useAuth();

  const { mutate: deleteAccountMutation, isLoading: deleteAccountLoading } =
    useMutation(deleteAccount, {
      onSuccess: () => {
        localStorage.removeItem("auth");
        window.location.replace("/");
      },
    });

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

        <div className="mt-10 max-w-[520px]">
          <PersonalInformation user={user} />
          <div>
            <h2 className="text-xls inline-block text-gray-600 md:text-2xl">
              Danger Zone
            </h2>
            <div className="mt-3 w-full rounded-md p-3 ring-2 ring-red-300">
              <h3 className="font-semibold text-gray-600">Delete Account</h3>
              <span className="text-sm text-gray-600">
                Once you delete your account, there is no going back. <br /> The
                deletion process will start immediately when you click the
                button below.
              </span>
              <button
                className="mt-4 flex items-center rounded-md border border-gray-300 bg-gray-200/40 px-3 py-2 font-semibold text-red-600 transition hover:bg-red-700 hover:text-white"
                onClick={() => deleteAccountMutation()}
                disabled={deleteAccountLoading}
              >
                {deleteAccountLoading && <Loader color="text-red-600" />}
                <span>
                  {deleteAccountLoading ? "Deleting..." : "Delete forever"}
                </span>
              </button>
            </div>
          </div>
        </div>
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

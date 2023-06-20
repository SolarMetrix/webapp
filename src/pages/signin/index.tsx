import { useState } from "react";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";

import SEO from "../../components/SEO";
import getParsedCookies from "../../utils/cookie-parser";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../services/auth.service";
import Loader from "../../components/HelperComponents/Loader";

type Inputs = {
  email: string;
  password: string;
};

export default function JoinPage() {
  const [error, setError] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const { email, password } = data;
    setError("");
    return loginMutation({
      email,
      password,
    });
  };

  const { mutate: loginMutation, isLoading: loginLoading } = useMutation(
    login,
    {
      onSuccess: () => window.location.replace("/"),
      onError: (err: any) => setError(err.response.data.message),
    }
  );

  return (
    <>
      <SEO
        url={`${process.env.NEXT_PUBLIC_WEB_APP_ENDPOINT}/signin`}
        description="Sign in to your SolarMetrix account"
        title="Sign in"
      />
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Link href="/">
            <a>
              <img
                className="mx-auto h-10 w-auto"
                src="/img/logo.svg"
                alt=""
              />
            </a>
          </Link>
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-[480px] lg:mt-36">
          <h2 className="mb-4 mt-6 text-center text-3xl font-bold leading-9 tracking-tight text-smMain-500">
            Sign in
          </h2>
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-500"
                >
                  Email address
                </label>
                <div>
                  <input
                    type="email"
                    required
                    className="sm:text-md block w-full rounded-md border-0 py-2 text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 transition placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-400 sm:leading-6"
                    {...register("email", { required: true })}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-500"
                >
                  Password
                </label>
                <div>
                  <input
                    type="password"
                    required
                    className="sm:text-md block w-full rounded-md border-0 py-2 text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 transition placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-400 sm:leading-6"
                    {...register("password", { required: true })}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="text-md flex w-full items-center justify-center rounded-md bg-smMain-500 px-3 py-2.5 font-semibold leading-6 text-white shadow-sm transition hover:bg-smMain-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-smMain-600"
                >
                  {loginLoading && <Loader />}
                  <span>Sign in</span>
                </button>
              </div>
              {error && (
                <p
                  role="alert"
                  className="text-md mt-2 text-center text-red-400"
                >
                  {error}
                </p>
              )}
            </form>
          </div>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <Link href="/signup">
              <a className="font-semibold leading-6 text-smMain-500 hover:text-smMain-600">
                Register here
              </a>
            </Link>
          </p>
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

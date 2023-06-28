import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";

import SEO from "../../components/SEO";
import getParsedCookies from "../../utils/cookie-parser";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../services/user.service";
import Loader from "../../components/HelperComponents/Loader";

type Inputs = {
  email: string;
  password: string;
};

export default function SigninPage() {
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
      <div className="flex min-h-full flex-1 flex-col justify-center sm:px-6 lg:px-8">
        <div className="mx-auto inline-block sm:w-full sm:max-w-md">
          <Link href="/">
            <a className="mt-20 block w-full text-center">
              <Image
                src="/img/logo.svg"
                alt="SolarMetrix logo"
                width={250}
                height={40}
              />
            </a>
          </Link>
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-[480px] lg:mt-36">
          <div className="bg-white px-6 pb-12 pt-6 shadow sm:rounded-lg">
            <h2 className="mb-10 text-center text-3xl font-semibold leading-9 tracking-tight text-gray-500">
              Sign in
            </h2>
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
                    autoComplete="email"
                    autoFocus={true}
                    className="sm:text-md border-1 block w-full rounded-md border-gray-100 py-2 text-gray-600 shadow transition focus:border-gray-100 focus:shadow-md focus:ring-0 sm:leading-6"
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
                    className="sm:text-md border-1 block w-full rounded-md border-gray-100 py-2 text-gray-600 shadow transition focus:border-gray-100 focus:shadow-md focus:ring-0 sm:leading-6"
                    {...register("password", { required: true })}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="text-md flex w-full items-center justify-center rounded-md bg-smMain-500 px-3 py-2.5 font-semibold leading-6 text-white shadow-sm transition hover:bg-smMain-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-smMain-600"
                >
                  {loginLoading && <Loader size={5} />}
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

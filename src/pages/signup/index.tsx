import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import { useForm, SubmitHandler } from "react-hook-form";

import SEO from "../../components/SEO";
import Loader from "../../components/HelperComponents/Loader";
import getParsedCookies from "../../utils/cookie-parser";
import { createAccount } from "../../services/user.service";

type Inputs = {
  email: string;
  password: string;
};

export default function SignupPage() {
  const [error, setError] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const { email, password } = data;
    setError("");
    return registrationMutation({
      email,
      password,
    });
  };

  const { mutate: registrationMutation, isLoading: registrationLoading } =
    useMutation(createAccount, {
      onSuccess: () => window.location.replace("/"),
      onError: (err: any) => setError(err.response.data.message),
    });

  return (
    <>
      <SEO
        url={`${process.env.NEXT_PUBLIC_WEB_APP_ENDPOINT}/signin`}
        description="Create account"
        title="Sign up"
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
              Create account
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
                    className="sm:text-md border-1 block w-full rounded-md border-gray-100 py-2 text-gray-600 shadow transition focus:border-gray-100 focus:shadow-md focus:ring-0 sm:leading-6"
                    {...register("email", {
                      required: "Email is required",
                      minLength: 4,
                    })}
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
                    placeholder="Minimum 5 characters"
                    required
                    className="sm:text-md border-1 block w-full rounded-md border-gray-100 py-2 text-gray-600 shadow transition focus:border-gray-100 focus:shadow-md focus:ring-0 sm:leading-6"
                    {...register("password", {
                      required: "Password is required",
                      minLength: 5,
                    })}
                  />
                </div>
                {errors.password?.type === "minLength" && (
                  <p role="alert" className="mt-2 text-sm text-red-400">
                    Password must be at least 5 characters
                  </p>
                )}
              </div>

              <div>
                <button
                  type="submit"
                  className="text-md flex w-full items-center justify-center rounded-md bg-smMain-500 px-3 py-2.5 font-semibold leading-6 text-white shadow-sm transition hover:bg-smMain-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-smMain-600"
                >
                  {registrationLoading && <Loader size={5} />}
                  <span>Sign up</span>
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
            Already have an account?{" "}
            <Link href="/signin">
              <a className="font-semibold leading-6 text-smMain-500 hover:text-smMain-600">
                Sign in here
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

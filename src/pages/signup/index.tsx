import { useState } from "react";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { useForm, SubmitHandler } from "react-hook-form";

import SEO from "../../components/SEO";
import getParsedCookies from "../../utils/cookie-parser";
import { createAccount } from "../../services/user.service";

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

    return registrationMutation({
      email,
      password,
    });
  };

  const { mutate: registrationMutation, isLoading: registrationLoading } =
    useMutation(createAccount, {
      onSuccess: (data) => {},
    });

  return (
    <>
      <SEO
        url={`${process.env.NEXT_PUBLIC_WEB_APP_ENDPOINT}/signin`}
        description="Create account"
        title="Sign up"
      />
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Link href="/">
            <a>
              <img className="mx-auto h-10 w-auto" src="/img/logo.svg" alt="" />
            </a>
          </Link>
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-[480px] lg:mt-36">
          <h2 className="mb-4 mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-smMain-600">
            Create a new account
          </h2>
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-smMain-600"
                >
                  Email address
                </label>
                <div>
                  <input
                    type="email"
                    required
                    className="sm:text-md block w-full rounded-md border-0 py-2 text-smMain-600 shadow-sm ring-1 ring-inset ring-gray-300 transition placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-smMain-400 sm:leading-6"
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
                  className="block text-sm font-medium leading-6 text-smMain-600"
                >
                  Password
                </label>
                <div>
                  <input
                    type="password"
                    required
                    className="sm:text-md block w-full rounded-md border-0 py-2 text-smMain-600 shadow-sm ring-1 ring-inset ring-gray-300 transition placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-smMain-400 sm:leading-6"
                    {...register("password", {
                      required: "Password is required",
                      minLength: 5,
                    })}
                  />
                </div>
                {errors.password?.type === "minLength" && (
                  <p role="alert" className="mt-2 text-xs text-gray-400">
                    Password must be at least 5 characters
                  </p>
                )}
              </div>

              <div>
                <button
                  type="submit"
                  className="text-md flex w-full justify-center rounded-md bg-smMain-500 px-3 py-2.5 font-semibold leading-6 text-white shadow-sm transition hover:bg-smMain-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-smMain-600"
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link href="/signin">
              <a
                href="#"
                className="font-semibold leading-6 text-smMain-400 hover:text-smMain-500"
              >
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

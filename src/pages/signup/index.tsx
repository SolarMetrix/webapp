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
                    placeholder="Minimum 5 characters"
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
                  className="text-md flex w-full items-center justify-center rounded-md bg-smMain-500 px-3 py-2.5 font-semibold leading-6 text-white shadow-sm transition hover:bg-smMain-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-smMain-600"
                >
                  {registrationLoading && (
                    <div role="status">
                      <svg
                        aria-hidden="true"
                        className="mr-2 h-4 w-4 animate-spin fill-smMain-500 text-white"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                    </div>
                  )}
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

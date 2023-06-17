import { useEffect } from "react";
import NProgress from "nprogress";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";

import { fetchAuthUser } from "../services/auth.service";
import { FETCH_AUTH_USER_KEY } from "../utils/queryKeys";
import Footer from "./Footer";
// import SidebarWithLayout from "./UserHomePage/SidebarWithLayout";
// import GuestHeaderContent from "./GuestHomePage/HeaderContent";
import useAuth from "../context/AuthContext";
import DotsLoader from "./HelperComponents/DotsLoader";

export default function Layout({ children }: { children: any }) {
  const router = useRouter();
  const { isLoggedIn, setAuthUser } = useAuth();

  useEffect(() => {
    const handleRouteStart = () => NProgress.start();
    const handleRouteDone = () => NProgress.done();

    router.events.on("routeChangeStart", handleRouteStart);
    router.events.on("routeChangeComplete", handleRouteDone);
    router.events.on("routeChangeError", handleRouteDone);

    return () => {
      router.events.off("routeChangeStart", handleRouteStart);
      router.events.off("routeChangeComplete", handleRouteDone);
      router.events.off("routeChangeError", handleRouteDone);
    };
  }, []);

  /* 
    Although auth handling is mainly done in the Context, however 
    to render the right layout (guest vs auth) another call is fired here too. 
    Without this request, the guest layout is rendered first, 
    then if there is a signed in user, the auth layout is rendered finally, causing a bad UX.
  */
  const { status: authStatus } = useQuery(
    [FETCH_AUTH_USER_KEY],
    () => fetchAuthUser(),
    {
      onSuccess: (user: any) => {
        if (user) {
          localStorage.setItem("auth", "1");
          setAuthUser(user);
        } else {
          localStorage.removeItem("auth");
        }
      },
      staleTime: 1000 * 60 * 15,
      retry: 1,
    }
  );

  if (authStatus === "loading") {
    return <DotsLoader showLoadingText={false} />;
  }

  return (
    <>
      {isLoggedIn ? (
        // <SidebarWithLayout>{children}</SidebarWithLayout>
        <></>
      ) : (
        <>
          {/* <GuestHeaderContent /> */}
          <div className={`${isLoggedIn ? "pt-[150px]" : ""}`}>{children}</div>
          {/* <Footer /> */}
        </>
      )}
    </>
  );
}

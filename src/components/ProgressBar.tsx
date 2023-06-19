import { useEffect } from "react";
import NProgress from "nprogress";
import { useRouter } from "next/router";
// import 'nprogress/nprogress.css';

export default function ProgressBar() {
  const router = useRouter();

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

  return <></>;
}

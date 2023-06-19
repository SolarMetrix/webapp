import SEO from "../components/SEO";
import GuestHomePage from "../components/GuestHomePage/index";
// import UserHomePage from "../components/UserHomePage/index";
import useAuth from "../context/AuthContext";
import DotsLoader from "../components/HelperComponents/DotsLoader";

export default function Home(): JSX.Element {
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) {
    return <DotsLoader showLoadingText={false} />;
  }

  return (
    <>
      <SEO
        url={`${process.env.NEXT_PUBLIC_WEB_APP_ENDPOINT}`}
        description="Track your solar panels"
        title="SolarMetrix"
      />
      {isLoggedIn ? <span>ascascascas</span> : <GuestHomePage />}
    </>
  );
}

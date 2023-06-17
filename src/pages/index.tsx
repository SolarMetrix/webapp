import SEO from "../components/SEO";
import GuestHomePage from "../components/GuestHomePage/index";
// import UserHomePage from "../components/UserHomePage/index";
import useAuth from "../context/AuthContext";

export default function Home(): JSX.Element {
  const { isLoggedIn } = useAuth();

  return (
    <>
      <SEO
        url={`${process.env.NEXT_PUBLIC_WEB_APP_ENDPOINT}`}
        description="Track your solar panels"
        title="SolarMetrix"
      />
      <GuestHomePage />
      {/* {isLoggedIn ? <UserHomePage /> : <GuestHomePage />} */}
    </>
  );
}

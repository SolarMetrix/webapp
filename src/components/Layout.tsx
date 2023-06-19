import useAuth from "../context/AuthContext";
import SidebarWithLayout from "./UserHomePage/SidebarWithLayout";

export default function Layout({ children }: { children: any }) {
  const { isLoggedIn } = useAuth();

  return (
    <>
      {isLoggedIn ? (
        <SidebarWithLayout>{children}</SidebarWithLayout>
      ) : (
        <div>{children}</div>
      )}
    </>
  );
}

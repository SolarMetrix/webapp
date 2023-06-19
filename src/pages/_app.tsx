import { Hydrate, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";

const AuthJoinResult = dynamic(
  () => import("../components/HelperComponents/AuthJoinResult")
);
import { UIProvider } from "../context/UIContext";
import { AuthProvider } from "../context/AuthContext";
import { queryClient } from "../helpers/queryClient";
import "../../styles/globals.css";
import ProgressBar from "../components/ProgressBar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={(pageProps as any).dehydratedState}>
        <AuthProvider>
          <UIProvider>
            <ProgressBar />
            <Component {...pageProps} />
            <AuthJoinResult />
          </UIProvider>
        </AuthProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}

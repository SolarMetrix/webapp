import { Hydrate, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";

const AuthJoinResult = dynamic(
  () => import("../components/HelperComponents/AuthJoinResult")
);
import { UIProvider } from "../context/UIContext";
import { AuthProvider } from "../context/AuthContext";
import { queryClient } from "../helpers/queryClient";
import ProgressBar from "../components/ProgressBar";
import Layout from "../components/Layout";
import "../../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={(pageProps as any).dehydratedState}>
        <AuthProvider>
          <UIProvider>
            <ProgressBar />
            <Layout>
              <Component {...pageProps} />
              <AuthJoinResult />
            </Layout>
          </UIProvider>
        </AuthProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}

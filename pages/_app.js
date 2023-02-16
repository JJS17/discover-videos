import { useEffect, useState } from "react";
import "@/styles/globals.css";
import { Roboto } from "@next/font/google";
import { magic } from "../lib/magic-client";
import { useRouter } from "next/router";
import Loading from "@/components/loading/loading";
const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
});
export default function MyApp({ Component, pageProps }) {
  // const [isLoggedInState, setIsLoggedInState] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const handleLoggedIn = async () => {
      const isLoggedIn = await magic.user.isLoggedIn();
      if (isLoggedIn) {
        // route to /
        router.push("/");
      } else {
        // route to /login
        router.push("/login");
      }
    };
    handleLoggedIn();
  }, []);

  useEffect(() => {
    const handleComplete = () => {
      setIsLoading(false);
    };
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
    return () => {
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  return (
    <main className={roboto.className}>
      {isLoading ? <Loading /> : <Component {...pageProps} />}
    </main>
  );
}

import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Login.module.css";
import { magic } from "../lib/magic-client";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState(``);
  const [userMsg, setUserMsg] = useState(``);
  const [isLoading, setIsLoading] = useState(false);

  const handleOnChangeEmail = (e) => {
    e.preventDefault();
    setUserMsg(``);
    setEmail(e.target.value);
  };
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

  const handleLoginWithEmail = async (e) => {
    e.preventDefault();
    if (email) {
      if (email) {
        setIsLoading(true);
        try {
          const didToken = await magic.auth.loginWithMagicLink({
            email,
          });
          // console.log({ didToken });
          if (didToken) router.push(`/`);
        } catch (err) {
          setIsLoading(false);
          console.error(err);
        }
      } else {
        setIsLoading(false);
        setUserMsg(`Something went wrong logging in`);
      }
    } else {
      setIsLoading(false);
      setUserMsg(`Enter a valid email`);
    }
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix SignIn</title>
      </Head>
      <header className={styles.header}>
        <div className={styles.headerWrapper}>
          <Link className={styles.logoLink} href="/">
            <div className={styles.logoWrapper}>
              <Image
                priority="true"
                src="/static/icons/netflix.svg"
                alt="Netflix Logo"
                width={128}
                height={34}
              />
            </div>
          </Link>
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.mainWrapper}>
          <h1 className={styles.signinHeader}>Sign In</h1>
          <input
            className={styles.emailInput}
            type="text"
            placeholder="Email Address"
            onChange={handleOnChangeEmail}
          />
          <p className={styles.userMsg}>{userMsg}</p>
          <button className={styles.loginBtn} onClick={handleLoginWithEmail}>
            {isLoading ? `Loading.....` : `Sign In`}
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;

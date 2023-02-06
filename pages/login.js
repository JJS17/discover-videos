import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Login.module.css";
import { magic } from "../lib/magic-client";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState(``);
  const [userMsg, setUserMsg] = useState(``);
  console.log(magic);

  const handleOnChangeEmail = (e) => {
    e.preventDefault();
    setUserMsg(``);
    setEmail(e.target.value);
  };
  const handleLoginWithEmail = async (e) => {
    e.preventDefault();
    if (email) {
      if (email) {
        try {
          const didToken = await magic.auth.loginWithMagicLink({
            email,
          });
          console.log(didToken);
        } catch (err) {
          console.error(err);
        }
        // router.push(`/`);
      } else {
        setUserMsg(`Something went wrong logging in`);
      }
    } else {
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
            Sign In
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;

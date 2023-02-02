import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import styles from "./navbar.module.css";

const Navbar = ({ username }) => {
  const router = useRouter();
  const [showDropDown, setShowDropDown] = useState(false);
  const handleOnClickHome = (e) => {
    e.preventDefault();
    router.push("/");
  };
  const handleOnClickMyList = (e) => {
    e.preventDefault();
    router.push("/browse/my-list");
  };
  const handleDropDown = (e) => {
    e.preventDefault();
    setShowDropDown(!showDropDown);
  };
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Link href="/" className={styles.logoLink}>
          <div className={styles.logoWrapper}>
            <Image
              src="/static/icons/netflix.svg"
              alt="Netflix Logo"
              width={128}
              height={34}
            />
          </div>
        </Link>
        <ul className={styles.navItems}>
          <li className={styles.navItem} onClick={handleOnClickHome}>
            Home
          </li>
          <li className={styles.navItem2} onClick={handleOnClickMyList}>
            My List
          </li>
        </ul>
        <nav className={styles.navContainer}>
          <div>
            <button className={styles.usernameBtn} onClick={handleDropDown}>
              <p className={styles.username}>{username}</p>

              <Image
                src="/static/icons/expand_more_FILL0_wght100_GRAD0_opsz48.svg"
                alt="Expand Dropdown"
                width={32}
                height={32}
              />
            </button>
            {showDropDown && (
              <div className={styles.navDropdown}>
                <Link href="/login" className={styles.linkName}>
                  Sign Out
                </Link>
                <div className={styles.lineWrapper}></div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};
export default Navbar;

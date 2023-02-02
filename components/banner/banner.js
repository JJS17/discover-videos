import Image from "next/image";
import styles from "./banner.module.css";

const Banner = ({ title, subtitle, imgUrl }) => {
  const handleOnPlay = () => {
    console.log(`handleOnPlay`);
  };
  return (
    <div className={styles.container}>
      <div className={styles.leftWrapper}>
        <div className={styles.left}>
          <div className={styles.nseriesWrapper}>
            <p className={styles.firstLetter}>N</p>
            <p className={styles.series}>S E R I E S</p>
          </div>
          <h2 className={styles.title}>{title}</h2>
          <h3 className={styles.subTitle}>{subtitle}</h3>
          <div className={styles.playBtnWrapper}>
            <button className={styles.btnWithIcon} onClick={handleOnPlay}>
              <Image
                src="/static/icons/play_arrow_FILL1_wght400_GRAD0_opsz24.svg"
                alt="Play Icon"
                width={32}
                height={32}
              />
              <span className={styles.playText}>Play</span>
            </button>
          </div>
        </div>
      </div>
      <div
        className={styles.bannerImg}
        style={{
          backgroundImage: `url(${imgUrl})`,
          width: "100%",
          height: "100%",
          position: "absolute",
          backgroundSize: "cover",
          backgroundPosition: "50% 50%",
        }}
      ></div>
    </div>
  );
};
export default Banner;

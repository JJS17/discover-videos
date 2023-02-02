import Image from "next/image";
import styles from "./card.module.css";
import { useState } from "react";
import { motion } from "framer-motion";
import cls from "classnames";

const Card = ({
  imgUrl = "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bW92aWV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
  size = "medium",
  id,
}) => {
  const classMap = {
    large: styles.lgItem,
    medium: styles.mdItem,
    small: styles.smItem,
  };
  const [imgSrc, setImgSrc] = useState(imgUrl);
  const handleOnError = () => {
    console.log(`ERROR`);
    setImgSrc(
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bW92aWV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
    );
  };
  const scale = id === 0 ? { scaleY: 1.1 } : { scale: 1.1 };
  return (
    <div className={styles.container}>
      <motion.div
        className={cls(classMap[size], styles.imgMotionWrapper)}
        whileHover={{ ...scale }}
      >
        <Image
          className={styles.cardImg}
          src={imgSrc}
          alt={`${size} image`}
          fill="true"
          onError={handleOnError}
        />
      </motion.div>
    </div>
  );
};
export default Card;

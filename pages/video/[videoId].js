import Modal from "react-modal";
import { useRouter } from "next/router";
import clsx from "classnames";
import Navbar from "../../components/nav/navbar";

import styles from "../../styles/Video.module.css";
import { parseResp } from "../../lib/parse-utube-videos-resp";

Modal.setAppElement("#__next");

export async function getStaticProps({ params }) {
  const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${params.videoId}&key=${process.env.YOUTUBE_API_KEY}`;
  //   GET https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=Ks-_Mh1QhMc&key=[YOUR_API_KEY] HTTP/1.1

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });
    const data = await res.json();
    if (data?.error) {
      console.error(`Youtube API error ${data.error}`);
      return {};
    }
    const video = parseResp(data).length > 0 ? parseResp(data)[0] : {};

    return {
      props: {
        video,
      },
      // Next.js will attempt to re-generate the page:
      // - When a request comes in
      // - At most once every 10 seconds
      revalidate: 10, // In seconds
    };
  } catch (err) {
    console.error(`Something went wrong with video library, ${err}`);
    return {};
  }
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// the path has not been generated.
export async function getStaticPaths() {
  const listOfVideos = ["mYfJxlgR2jw", "4zH5iYM4wJo", "KCPEHsAViiQ"];
  // Get the paths we want to pre-render based on posts
  const paths = listOfVideos.map((videoId) => {
    return {
      params: { videoId },
    };
  });

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: "blocking" };
}

const Video = ({ video }) => {
  const {
    publishTime,
    title,
    description,
    channelTitle,
    statistics: { viewCount },
  } = video;
  const router = useRouter();
  const { videoId } = router.query;
  return (
    <div className={styles.container}>
      <Navbar />

      <Modal
        style={{
          overlay: { backgroundColor: "rgb(20,20,20)" },
          content: {},
        }}
        isOpen={true}
        contentLabel="Watch The Video"
        onRequestClose={() => router.back()}
        className={styles.modal}
        overlayClassName={styles.overLay}
      >
        <div>
          <iframe
            id="ytplayer"
            type="text/html"
            className={styles.videoPlayer}
            width="100%"
            height="360"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=0&origin=http://example.com&controls=0&rel=0`}
            frameborder="0"
          ></iframe>
          <div className={styles.modalBody}>
            <div className={styles.modalBodyContent}>
              <div className={styles.col1}>
                <p className={styles.publishTime}>{publishTime}</p>
                <p className={styles.title}>{title}</p>
                <p className={styles.description}>{description}</p>
              </div>
              <div className={styles.col2}>
                <p className={clsx(styles.subText, styles.subTextWrapper)}>
                  <span className={styles.textColor}>Cast: </span>
                  <span className={styles.channelTitle}>{channelTitle}</span>
                </p>
                <p className={clsx(styles.subText, styles.subTextWrapper)}>
                  <span className={styles.textColor}>View Count: </span>
                  <span className={styles.channelTitle}>{viewCount}</span>
                </p>
              </div>
            </div>
          </div>
          {/* {`Video ${videoId} `} */}
        </div>
      </Modal>
    </div>
  );
};
export default Video;

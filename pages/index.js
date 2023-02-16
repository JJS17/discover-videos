import { useEffect, useState } from "react";
import Head from "next/head";
// import Image from "next/image";
// import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import Banner from "../components/banner/banner";
import Navbar from "../components/nav/navbar";
import SectionCards from "../components/card/section-cards";
import { utubeVideoParsedData } from "../lib/parse-utube-videos-resp";
import { startFetchMyQuery } from "../lib/db/hasura";
// const inter = Inter({ subsets: ["latin"] });

// This gets called on every request
export async function getServerSideProps() {
  const disneyVideos = await utubeVideoParsedData(`disney trailers`);
  const travelVideos = await utubeVideoParsedData(`travel`);
  const productivityVideos = await utubeVideoParsedData(`productivity`);
  const popularVideos = await utubeVideoParsedData(`popular`);
  // Pass data to the page via props
  return {
    props: { disneyVideos, travelVideos, productivityVideos, popularVideos },
  };
}
startFetchMyQuery();

export default function Home({
  disneyVideos,
  travelVideos,
  productivityVideos,
  popularVideos,
}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix</title>
        <meta name="description" content="Discover videos" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.main}>
        <Navbar />
        <Banner
          videoId="4zH5iYM4wJo"
          title="Clifford the red big dog"
          subtitle="A cute movie"
          imgUrl="/static/images/clifford.webp"
        />
        <div className={styles.sectionWrapper}>
          <SectionCards title="Disney" size="large" videos={disneyVideos} />
          <SectionCards title="Travel" size="small" videos={travelVideos} />
          <SectionCards
            title="Productivity"
            size="medium"
            videos={productivityVideos}
          />
          <SectionCards title="Popular" size="small" videos={popularVideos} />
        </div>
      </div>
    </div>
  );
}

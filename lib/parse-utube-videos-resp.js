// import utubeResponse from "../data/utube-test.json";

export const utubeVideoParsedData = async (searchQuery) => {
  const setUrl = () => {
    if (searchQuery !== `popular`) {
      return `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${searchQuery}&type=video&key=${process.env.YOUTUBE_API_KEY}`;
    } else {
      return `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=25&regionCode=US&key=${process.env.YOUTUBE_API_KEY}`;
    }
  };
  try {
    const url = setUrl();
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });
    const data = await res.json();
    if (data?.error) {
      console.error(`Youtube API error ${data.error}`);
      return [];
    }
    const items = data["items"];
    if (items && items.length > 0) {
      const parsedData = items.map((item) => {
        const id = item.id?.videoId || item.id;
        const publishTime =
          item?.snippet?.publishTime || item?.snippet?.publishedAt;
        return {
          id,
          publishTime,
          title: item?.snippet?.title,
          description: item?.snippet?.description,
          imgUrl: item?.snippet?.thumbnails?.high?.url,
        };
      });
      return parsedData;
    }
  } catch (err) {
    console.error(`Something went wrong with video library, ${err}`);
    return [];
  }
  // Fetch data from external API
};

const collectLinksFromYoutubeLive = require("./collect-links-from-youtube-live")
const getYouTubeLinkMetadata = require("./get-youtube-link-metadata")
const { getLastScheduledEpisode, getEpisodeById } = require("./notion")

const main = async () => {
  const lastepisode = await getLastScheduledEpisode()
  console.log("lastepisode", lastepisode)
  const details = await getEpisodeById(lastepisode.id)
  console.log("details", details)
  // const youtube_id = "0x1a-7JK_co"
  // const youtube_metadata = await getYouTubeLinkMetadata(youtube_id)
  // const links = await collectLinksFromYoutubeLive(
  //   youtube_id,
  //   youtube_metadata.duration
  // )
  // console.log("links", links)
}

main()

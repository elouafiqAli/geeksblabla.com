const { YOUTUBE_API_KEY } = require("./constants")

function durationToSeconds(duration) {
  const timeParts = duration.slice(2).split("M")
  let hours = 0,
    minutes = 0,
    seconds = 0
  if (timeParts[0].includes("H")) {
    ;[hours, minutes] = timeParts[0].split("H")
    minutes = parseInt(minutes)
  } else {
    minutes = parseInt(timeParts[0])
  }
  seconds = parseInt(timeParts[1].slice(0, -1))
  return hours * 3600 + minutes * 60 + seconds
}

function extractDate(dateString) {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = date.getMonth() + 1 // add 1 to adjust for 0-indexed months
  const day = date.getDate()

  return `${year}-${month < 10 ? "0" : ""}${month}-${day < 10 ? "0" : ""}${day}`
}

/**
 * @param {string} id - YouTube video ID
 * @returns {object} - Youtube video metadata
 *
 *
 **/

const getYouTubeLinkMetadata = async (id = "0x1a-7JK_co") => {
  const link = `https://www.googleapis.com/youtube/v3/videos?id=${id}&part=snippet,contentDetails&key=${YOUTUBE_API_KEY}`
  let metadata = {}
  try {
    const results = await fetch(link)
    const resultsJson = await results.json()
    if (resultsJson.items.length >= 0) {
      const { items } = resultsJson
      const { snippet, contentDetails } = items[0]
      const { title, publishedAt } = snippet
      const { duration } = contentDetails
      metadata = {
        title,
        publishedAt: extractDate(publishedAt),
        duration: durationToSeconds(duration),
      }
    }
    return metadata
  } catch (error) {
    console.log("error", error)
    return null
  }
}

module.exports = getYouTubeLinkMetadata

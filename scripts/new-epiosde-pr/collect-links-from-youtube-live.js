// inspired by https://github.com/Schrodinger-Hat/youtube-to-anchorfm/blob/main/index.js
const puppeteer = require("puppeteer")

/*
A function to open a youtube live stream page and collect all the links from the chat
*/

const collectLinksFromYoutubeLive = async (id, duration) => {
  const url = `https://www.youtube.com/watch?v=${id}`
  const parts = getSecondsSnippets(duration)
  const allLinks = []
  const browser = await puppeteer.launch({
    executablePath:
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    headless: false,
    args: [
      "--disable-web-security",
      "--disable-features=IsolateOrigins,site-per-process",
    ],
  })
  const page = await browser.newPage()
  await page.setViewport({ width: 600, height: 1000 })
  for (const part of parts) {
    try {
      await page.goto(`${url}&t=${part}s`)
      await page.waitForSelector("#chatframe")
      await new Promise((r) => setTimeout(r, 10 * 500))
      const iframe = await page.frames().find((f) => f.name() === "chatframe")
      const links = await iframe.$$eval(
        "a.yt-simple-endpoint.yt-live-chat-text-message-renderer",
        (ll) => {
          const links = []
          ll.forEach((message) => {
            const link = message.href
            if (link) {
              links.push(link)
            }
          })
          return links
        }
      )
      console.log(`✅ Link collected at ${part}s:`, links.length)
      allLinks.push(...links.map((l) => getUrlFromYoutubeRedirect(l)))
    } catch (error) {
      console.log(`🚨 Error collecting link at ${part}s:`, error)
    }
  }
  const uniqueLinks = [...new Set(allLinks)]

  console.log("✅ Total link collected for this video :", uniqueLinks.length)
  await browser.close()
  return uniqueLinks
}

// collectLinksFromYoutubeLive(
//   "https://www.youtube.com/watch?v=0x1a-7JK_co&t=7355s"
// )

// https://www.youtube.com/live/0x1a-7JK_co?feature=share&t=7355

/**
 * get total video duration  and return an array of timestamps in seconds every 15 minutes
 * @param {number} duration : total video duration in seconds
 * @returns  {array} : an array of timestamps in seconds every 15 minutes
 */

const getSecondsSnippets = (duration = 9000) => {
  const snippets = []
  let i = duration - 60

  while (i > 0) {
    snippets.push(i)
    i = i - 15 * 60
  }
  return snippets.reverse()
}

const getUrlFromYoutubeRedirect = (link) => {
  const url = new URL(link)
  const searchParams = url.searchParams
  const sourceUrl = searchParams.get("q")
  if (sourceUrl) {
    return sourceUrl
  } else {
    return link
  }
}

module.exports = collectLinksFromYoutubeLive

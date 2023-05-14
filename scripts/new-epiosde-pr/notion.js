const { Client } = require("@notionhq/client")
const {
  NOTION_ACCESS_TOKEN,
  NOTION_EPISODE_DATABASE_ID,
} = require("./constants")

const NOTION_CLIENT = new Client({ auth: NOTION_ACCESS_TOKEN })

const getLastScheduledEpisode = async () => {
  const response = await NOTION_CLIENT.databases.query({
    database_id: NOTION_EPISODE_DATABASE_ID,
    filter: {
      property: "Status",
      select: {
        equals: "Scheduled",
      },
    },
    sorts: [
      {
        property: "Date",
        direction: "ascending",
      },
    ],
  })
  /**  @type {import("./notion-types").EpisodesNotionResponse} */
  const result = response.results[0]
  const id = result.id
  const title = result.properties.title.title[0].plain_text
  return { id, title }
}

/**
 *
 * @param {import("./notion-types").EpisodesNotionResponse} episode
 * @returns
 */
const normalizeEpisode = async (episode) => {
  const properties = episode.properties

  return {
    id: episode.id,
    title: properties.title.title[0].plain_text,
    date: properties.Date.date.start,
    category: properties["Category "].select.name,
    youtube: properties["Youtube URL"].url,
    hosts: properties.Hosts.relation.map((host) => host.id),
    guests: properties["Guests"].relation.map((guest) => guest.id),
  }
}

const getEpisodeById = async (id) => {
  const response = await NOTION_CLIENT.pages.retrieve({
    page_id: id,
  }) //as EpisodesNotionResponse
  return normalizeEpisode(response)
}

module.exports = {
  getLastScheduledEpisode,
  getEpisodeById,
}

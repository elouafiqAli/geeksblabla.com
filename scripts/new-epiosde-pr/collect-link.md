Steps to get links from reading youtube chat
Using API:

- first get the video id from the youtube link ex : https://www.youtube.com/watch?v=0x1a-7JK_co

- we need an API key to use youtube API, you can get one from here: https://console.developers.google.com/apis/credentials

API_KEY=AIzaSyBI6Lu700cchexp8f5pzgNg6cYq6JiTSVU

- then use this link to get chat id associated to the video:
  GET https://www.googleapis.com/youtube/v3/videos
  ?id=VIDEO_ID
  &part=contentDetails.duration
  &key=YOUR_API_KEY

We can do it with api, the only solution is to use puppeteer to get the chat from the youtube website and then parse it and get the urls from it.

using puppeteer:

- get the last episode from notion database and return the youtube link => id of the video

- collect guest links from notion database as well
- collect hosted by links from notion database as well
- Get video data from api : https://www.googleapis.com/youtube/v3/videos?id=0x1a-7JK_co&part=snippet,contentDetails&key=AIzaSyBI6Lu700cchexp8f5pzgNg6cYq6JiTSVU

we need duration, published time and duration

to get all link on the chat we need to run a loop for the duration every 30 minutes using youtube link with the time parameter and then get links and save them to an object.

last think we will use scrapper to get the link description and title and put it in the object and crete a yaml file and open a pull request to the repo.

use this to run the github action:

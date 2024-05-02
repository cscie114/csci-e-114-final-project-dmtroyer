const EleventyFetch = require("@11ty/eleventy-fetch");
const { setTimeout } = require("timers/promises");

module.exports = async function () {

	let url = "https://api.scryfall.com/cards/search?q=set%3Aotj&order=name";
  let cards = [];

  while (url) {
    const response = await EleventyFetch(url, {
      duration: "1d",
      type: "json",
    });
    // Pause for 100ms per Scryfall's request rate limit
    await setTimeout(100);

    cards = cards.concat(response.data);
    url = response.has_more ? response.next_page : null;
  }

  return cards;
};

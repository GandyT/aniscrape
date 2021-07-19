/* TEST */
const Config = require("../config.json");
const search = require("./anime/search.js");
const Fs = require("fs");

class AniScrape {
    constructor() {
        this.fetchGenre = search.fetchGenre;
    }

    scrapeAllAnime(output) {
        // output is a folder
        if (!output) throw new Error("[ERROR] Output not specified.");

        return new Promise((res, rej) => {
            let genres = Config.GENRES;
            let counter = 0;

            const getResults = () => {
                console.log(`[START] Fetching Anime for ${genres[counter]}`);

                this.fetchGenre(genres[counter])
                    .then(results => {
                        let file = results.map(e => e.toJson());

                        console.log(`[WRITE] Saving ${file.length} ${genres[counter]} anime to ${output + "/" + genres[counter] + ".json"}`);

                        Fs.writeFileSync(`${output}/${genres[counter]}.json`, JSON.stringify(file));

                        counter++;

                        if (counter >= genres.length) {
                            console.log(`[FIN]: Finished saving anime for all genres to ${output}`);
                            res();
                        } else {
                            setTimeout(() => getResults(), 3000);
                        }
                    });
            }

            getResults();
        });
    }
}

module.exports = AniScrape;
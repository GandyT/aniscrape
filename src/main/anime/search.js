const { default: axios } = require("axios");
const Config = require("../../config.json");
const Page = require("./page.js");

const fetchGenre = (genre) => {
    return new Promise((res, rej) => {
        if (!Config.GENRES.find(g => g.toLowerCase() == genre.toLowerCase())) {
            rej("[ERROR] Invalid Genre");
        }

        let genreUrl = `${Config.ENDPOINT}/anime/genre/${Config.GENRE_MAP[genre]}/${genre}`;
        let page = 1;
        let pageQuery = "";
        let results = [];

        let promise = undefined;

        const fetchPages = () => {

            return new Promise((resolve, reject) => {

                if (!promise) promise = resolve;

                console.log("[FETCH]: " + genreUrl + pageQuery);

                axios.get(genreUrl + pageQuery)
                    .then(response => {
                        results = results.concat(Page.parse(response.data));
                        page++;
                        pageQuery = `?page=${page}`;
                        let randomInterv = 5000 + (Math.random() * 5000);
                        console.log(`Next Fetch in ${randomInterv}ms`);
                        setTimeout(() => fetchPages(), randomInterv);
                    }).catch(() => {
                        console.log(`[FIN]: Fetched ${results.length} ${genre} anime over ${page} pages`);
                        promise();
                    });
            })
        }

        fetchPages()
            .then(() => {
                res(results);
            });
    })
}

module.exports = {
    fetchGenre: fetchGenre,
}
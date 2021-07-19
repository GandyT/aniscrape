const Config = require("../../config.json");

class Component {
    constructor(data) {
        this.data = data;

        /* GENRES */
        let genreStart = data.indexOf("data-genre=\"") + "data-genre=\"".length;
        let genreStr = "";

        for (let i = genreStart; ; ++i) {
            if (data[i] == "\"") break;

            genreStr += data[i];
        }

        this.genres = genreStr.trim().split(",");
        this.genres = this.genres.map(genreNumber => {
            for (let [key, value] of Object.entries(Config.GENRE_MAP)) {
                if (value == genreNumber) {
                    return key;
                }
            }

            return "Anime";
        });

        /* TITLE */
        let titleData = data.slice(data.indexOf("<h2 class=\"h2_anime_title\">") + "<h2 class=\"h2_anime_title\">".length);
        let titleArrowOne = titleData.indexOf(">");
        let titleArrowTwo = titleData.indexOf("</a>");

        this.title = titleData.slice(titleArrowOne + 1, titleArrowTwo).trim();

        /* IMAGEURL */
        let imageStart = data.slice(data.indexOf("<img") + "<img".length);
        let dataSrc = imageStart.slice(imageStart.indexOf("data-src=") + "data-src=".length);
        let lastQuote = dataSrc.slice(1).indexOf("\"");

        this.imgUrl = dataSrc.slice(1, lastQuote + 1).trim();

        /* DESCRIPTION */
        let descStart = data.slice(data.indexOf("<div class=\"synopsis js-synopsis\">") + "<div class=\"synopsis js-synopsis\">".length);
        let firstArrow = descStart.indexOf(">");
        let secondArrow = descStart.slice(firstArrow).indexOf("<");

        this.desc = descStart.slice(firstArrow + 1, secondArrow);
    }

    print() {
        let printStr = `\n[GENRES]: ${this.genres.join(", ")}\n` +
            `[TITLE]: ${this.title}\n` +
            `[IMG]: ${this.imgUrl}\n` +
            `[DESC]: ${this.desc}`;
        console.log(printStr);
    }

    toJson() {
        return {
            genres: this.genres,
            title: this.title,
            imgUrl: this.imgUrl,
            desc: this.desc
        }
    }
}

module.exports = Component;
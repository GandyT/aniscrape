// test
const Test = require("./tests/test.js");

const AniScrape = require("./src/main/AniScrape.js");

module.exports = {
    AniScrape: AniScrape
}

Test.run(module.exports);
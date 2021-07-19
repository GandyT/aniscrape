const Component = require("./Component.js");

const parse = (htmlPage) => {
    /* SPLIT INTO ANIME ELEMENTS */

    let mainData = htmlPage.slice(
        htmlPage.indexOf("<div class=\"js-categories-seasonal js-block-list tile mt16\">")
    )

    let comp = mainData.split("<div class=\"seasonal-anime js-seasonal-anime\"");
    comp.shift();

    comp = comp.map(e => new Component(e));

    return comp;
}

module.exports = {
    parse: parse
}

var Context = function () {
    this.jQuery = null
    this.window = null
    this.document = null
};

Context.prototype.loadHtml = function (html) {
    const { JSDOM } = require('jsdom')
    const jsdom = new JSDOM(html)
    const { window } = jsdom
    const { document } = jsdom.window
    global.window = window
    global.document = document

    this.window = window

    return true;
}


module.exports = new Context();
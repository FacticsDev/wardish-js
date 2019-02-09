
var Context = function () {
    this.jQuery = null
    this.window = null
    this.document = null
};

Context.prototype.loadHtml = function (html) {
    const { JSDOM } = require('jsdom')
    const jsdom = new JSDOM(html)
    const { window } = jsdom
    const { document } = window
    this.window = global.window = window
    this.document = global.document = document
    this.jQuery = global.$ = global.jQuery = require('jquery')(window)

    return true;
}


module.exports = new Context();
var assert = require('assert')
var context = require('./context')
var overlay = null;

describe("Overlay", function() {

    var html = `
        <html>
        <head>
          <meta charset="utf-8">
          <title>Mocha Tests</title>
        </head>
        <body>
        Test Html
        </body>
        </html>`

    it("Initialized overlay", function() {
        context.loadHtml(html)
        var $ = require('jquery')

        var overlay = require('../libs/Overlay')

        //CSSが挿入される
        assert.equal($('head style').text(), `
#wardish-js-overlay {
    display: none;
    width: 100%;
    height: 100%;
    text-align: center;
    position: fixed;
    top: 0;
    z-index: 99999;
    background: rgba(0, 0, 0, 0.5);
    cursor: not-allowed;
}

#wardish-js-overlay-inner {
    padding-top: 350px;
}

#wardish-js-overlay-loading-icon {
    font-size: 40px;
    color: #eee;
    padding-top: 0;
    vertical-align: middle;
    font-weight: bold;
}

#wardish-js-overlay-message {
    font-size: 18px;
    color: #eee;
    margin-top: 30px;
    vertical-align: middle;
    font-weight: bold;
}`)

        // HTMLが挿入される
        assert.equal($('#wardish-js-overlay').html(), '<div id="wardish-js-overlay-inner"><i class="fa fa-spinner fa-spin fa-3x fa-fw" id="wardish-js-overlay-loading-icon"></i><div id="wardish-js-overlay-message"></div></div>')
        assert.equal($('#wardish-js-overlay-inner').html(), '<i class="fa fa-spinner fa-spin fa-3x fa-fw" id="wardish-js-overlay-loading-icon"></i><div id="wardish-js-overlay-message"></div>')
        assert.equal($('#wardish-js-overlay-message').html(), '')
    })

    it("Get container", function() {
        context.loadHtml(html)
        var $ = require('jquery')

        var overlay = require('../libs/Overlay')

        var container = overlay.getContainer()
        assert.ok(container != null)
        assert.equal($(container).html(), '<div id="wardish-js-overlay-inner"><i class="fa fa-spinner fa-spin fa-3x fa-fw" id="wardish-js-overlay-loading-icon"></i><div id="wardish-js-overlay-message"></div></div>')
    })


    it("Show overlay with no message", function(done) {
        context.loadHtml(html)
        var $ = require('jquery')

        var overlay = require('../libs/Overlay')

        overlay.show()

        setTimeout(function () {
            assert.equal(overlay.getContainer().css('display'), 'block')

            done()
        }, 600)
    })


    it("Show overlay with message", function(done) {
        context.loadHtml(html)
        var $ = require('jquery')

        var overlay = require('../libs/Overlay')

        overlay.show('Test Message')

        setTimeout(function () {
            assert.equal(overlay.getContainer().css('display'), 'block')
            assert.equal(overlay.getMessageArea().text(), 'Test Message')
            done()
        }, 600)
    })




    it("Close overlay", function(done) {
        context.loadHtml(html)
        var $ = require('jquery')

        var overlay = require('../libs/Overlay')
        
        overlay.close()

        setTimeout(function () {

            assert.equal(overlay.getContainer().css('display'), 'none')
            assert.equal(overlay.getMessageArea().text(), '')

            done()
        }, 600)
    })
})
const assert = require('assert')
const context = require('./context')
const jquery = require('jquery')

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
        global.$ = (jquery)(context.window)

        var overlay = require('../libs/Overlay')
        overlay.init()

        //CSSが挿入される
        assert.ok($('head style').text() != null)

        // HTMLが挿入される
        assert.equal($('#wardish-js-overlay').html(), '<div id="wardish-js-overlay-inner"><i class="fa fa-spinner fa-spin fa-3x fa-fw" id="wardish-js-overlay-loading-icon"></i><div id="wardish-js-overlay-message"></div><i class="fa fa-spinner fa-spin fa-3x fa-fw" id="wardish-js-overlay-loading-icon"></i><div id="wardish-js-overlay-message"></div></div><div id="wardish-js-overlay-inner"></div>')
        assert.equal($('#wardish-js-overlay-inner').html(), '<i class="fa fa-spinner fa-spin fa-3x fa-fw" id="wardish-js-overlay-loading-icon"></i><div id="wardish-js-overlay-message"></div><i class="fa fa-spinner fa-spin fa-3x fa-fw" id="wardish-js-overlay-loading-icon"></i><div id="wardish-js-overlay-message"></div>')
        assert.equal($('#wardish-js-overlay-message').html(), '')
    })

    it("Get container", function() {
        context.loadHtml(html)
        global.$ = (jquery)(context.window)

        var overlay = require('../libs/Overlay')
        overlay.init()

        var container = overlay.getContainer()
        assert.ok(container != null)
        assert.equal($(container).html(), '<div id="wardish-js-overlay-inner"><i class="fa fa-spinner fa-spin fa-3x fa-fw" id="wardish-js-overlay-loading-icon"></i><div id="wardish-js-overlay-message"></div></div>')
    })


    it("Show overlay with no message", function(done) {
        context.loadHtml(html)
        global.$ = (jquery)(context.window)

        var overlay = require('../libs/Overlay')
        overlay.init()

        overlay.show()

        setTimeout(function () {
            assert.equal(overlay.getContainer().css('display'), 'block')

            done()
        }, 600)
    })


    it("Show overlay with message", function(done) {
        context.loadHtml(html)
        global.$ = (jquery)(context.window)

        var overlay = require('../libs/Overlay')
        overlay.init()

        overlay.show('Test Message')

        setTimeout(function () {
            assert.equal(overlay.getContainer().css('display'), 'block')
            assert.equal(overlay.getMessageArea().text(), 'Test Message')
            done()
        }, 600)
    })




    it("Close overlay", function(done) {
        context.loadHtml(html)
        global.$ = (jquery)(context.window)

        var overlay = require('../libs/Overlay')
        overlay.init()
        
        overlay.close()

        setTimeout(function () {

            assert.equal(overlay.getContainer().css('display'), 'none')
            assert.equal(overlay.getMessageArea().text(), '')

            done()
        }, 600)
    })
})
const assert = require('assert')
const context = require('./context')
const jquery = require('jquery')

describe("Message", function() {

    var html = `
        <html>
        <head>
          <meta charset="utf-8">
          <title>Mocha Tests</title>
        </head>
        <body>
        <div id="infoMessageBox"></div>
        <div id="errorMessageBox"></div>
        </body>
        </html>`

    it("Initialized message", function() {
        context.loadHtml(html)
        global.$ = (jquery)(context.window)


        var message = require('../libs/Message')
        assert.equal(message.infoBoxSelector, '#infoMessageBox')
        assert.equal(message.errorBoxSelector, '#errorMessageBox')
        assert.equal(message.inputFieldSelector, '.data-field')
        assert.equal(message.inputErrorClass, 'has-warning')
    })

    it("Show info message and fade out", function(done) {
        context.loadHtml(html) 
        global.$ = (jquery)(context.window)

        var message = require('../libs/Message')

        message.showInfoMessage('This is info message.')

        setTimeout(function () {
            var messageElm = $(message.infoBoxSelector)
            assert.equal(messageElm.css('display'), 'block')
            assert.equal(messageElm.text(), 'This is info message.')
            done()
        }, 600)



        setTimeout(function () {
            var messageElm = $(message.infoBoxSelector)
            assert.equal(messageElm.css('display'), 'none')
            assert.equal(messageElm.text(), '')
            done()
        }, 3000)
    })
})
var assert = require('assert')
var context = require('./context')

describe("index.js", function() {
    it("Success InputField require", function() {
        var utils = require('../index')

        assert.notEqual(utils.overlay, null)
        assert.notEqual(utils.overlay.show, null)
    })
    it("Success Overlay require", function() {
        var utils = require('../index')

        assert.notEqual(utils.overlay, null)
        assert.notEqual(utils.overlay.show, null)
    })
})
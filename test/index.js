var assert = require('assert')
var context = require('./context')

describe("index.js", function() {
    it("Success require", function() {
        var utils = require('../index')
        assert.notEqual(utils.input, null)
        assert.notEqual(utils.input.getData, null)
    })
})
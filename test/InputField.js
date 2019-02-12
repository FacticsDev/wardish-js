var assert = require('assert')
var context = require('./context')

describe("InputField", function() {
    var html = `
        <html>
        <head>
          <meta charset="utf-8">
          <title>Mocha Tests</title>
        </head>
        <body>
          <div id="sec1">
            <input type="text" class="data-field" id="prop1" value="Success1" />
          </div>

          <div id="sec2">
            <input type="text" class="search-field" id="prop2" value="Success2" />
          </div>

          <div id="sec3">
            <input type="text" class="data-field" id="prop3" value="Success3" />
          </div>

          <div id="sec4">
            <input type="text" class="data-field" prop="prop4" value="Success4" />
          </div>

          <div id="sec5">
            <input type="text" class="prop-field" id="prop5-1" value="Success5-1" />
            <textarea class="prop-field" id="prop5-2">Success5-2</textarea>
            <input type="hidden" class="prop-field" id="prop5-3" value="Success5-3" />
            <select id="prop5-4" class="prop-field">
            <option value="Success5-4-1">Success5-4-1</option>
            <option value="Success5-4-2" selected>Success5-4-2</option>

            <input type="radio" name="radioButton" class="prop-field" id="prop5-5-1" value="Success5-5-1" checked />
            <input type="radio" name="radioButton" class="prop-field" id="prop5-5-2" value="Success5-5-2" />
            <input type="radio" name="radioButton" class="prop-field" id="prop5-5-3" value="Success5-5-3" />
            </select>
          </div>
        </body>
        </html>`

    it("Has .data-field elements", function() {
        context.loadHtml(html)

        var inputField = require('../libs/InputField')
        assert.deepEqual(inputField.getData(),
            {
                prop1: 'Success1',
                prop3: 'Success3'
            }
        );
    })

    it("Has .search-field elements", function() {
        context.loadHtml(html)

        var inputField = require('../libs/InputField')
        assert.deepEqual(inputField.getData('.search-field'),
            {
                prop2: 'Success2'
            }
        );
    })

    it("Has #sec3 parent", function() {
        context.loadHtml(html)

        var inputField = require('../libs/InputField')
        assert.deepEqual(inputField.getData('#sec3 .data-field'),
            {
                prop3: 'Success3'
            }
        )
    })

    it("Has variable type of element", function() {
        context.loadHtml(html)

        var inputField = require('../libs/InputField')
        assert.deepEqual(inputField.getData('#sec5 .prop-field'),
            {
                'prop5-1': 'Success5-1',
                'prop5-2': 'Success5-2',
                'prop5-3': 'Success5-3',
                'prop5-4': 'Success5-4-2',
                'prop5-5-1': 'Success5-5-1'
            }
        )
    })
})
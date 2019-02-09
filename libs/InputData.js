var $ = require('jquery')

/**
 * input要素の入力値を取得するためのユーティリティー
 */
var InputData = function() {
};

/**
 * POSTするためのデータを生成します
 */
InputData.prototype.getData = function(selector, attrName) {
    if ( !selector ) selector = '.data-field'
    if ( !attrName ) attrName = 'id'

    var data = {}
    $(selector).each(function(){
        $this = $(this)
        var value = $this.val()

        //セレクトボックス
        if ( $this.is('select') ) {
            value = $this.find('option:selected').val()
        }
        //ラジオボタン
        if ( $this.is('input[type=radio]') ) {
            var name = $this.attr('name')
            $this = $('input[name=' + name + ']:checked')
            value = $this.val()
        }
        if ( $this.attr(attrName) ) {
            data[$this.attr(attrName)] = value
        }
    })
    return data
};

module.exports = new InputData()
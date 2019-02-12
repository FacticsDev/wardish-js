var $ = require('jquery')
/**
 * オーバーレイユーティリティ
 */
var Overlay = function () {

    this.containerSelector = 'wardish-js-overlay'
    this.contentAreaSelector = 'wardish-js-overlay-inner'
    this.loadingIconSelector = 'wardish-js-overlay-loading-icon'
    this.messageAreaSelector = 'wardish-js-overlay-message'
    
    this.init();
}

Overlay.prototype.init = function () {
    var container = this.getContainer();
    if (container.lenght > 0) {
        container.remove()
    }

    // Html
    $('<div/>').attr('id', this.containerSelector).css('display', 'none').appendTo('body')
    $('<div/>').attr('id', this.contentAreaSelector).appendTo(this.getContainer())
    $('<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>').attr('id', this.loadingIconSelector).appendTo(this.getContentArea())
    $('<div/>').attr('id', this.messageAreaSelector).appendTo(this.getContentArea())

    // CSS
    var util = require('util');
    var css = `
#%s {
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

#%s {
    padding-top: 350px;
}

#%s {
    font-size: 40px;
    color: #eee;
    padding-top: 0;
    vertical-align: middle;
    font-weight: bold;
}

#%s {
    font-size: 18px;
    color: #eee;
    margin-top: 30px;
    vertical-align: middle;
    font-weight: bold;
}`
    var formattedCSS = util.format(css, this.containerSelector, this.contentAreaSelector, this.loadingIconSelector, this.messageAreaSelector)
    $('<style/>').attr('id', this.messageAreaSelector).text(formattedCSS).appendTo('head')
}


Overlay.prototype.getContainer = function () {
    return $('#' + this.containerSelector)
}

Overlay.prototype.getContentArea = function () {
    return $('#' + this.contentAreaSelector)
}


Overlay.prototype.getMessageArea = function () {
    return $('#' + this.messageAreaSelector)
}

/**
 * オーバーレイを表示
 */
Overlay.prototype.show = function (message) {
    var container = this.getContainer()
    var messageArea = this.getMessageArea()
    if ( message ) {
        messageArea.html(message)
    }
    container.fadeIn()
}
/**
 * オーバーレイを非表示
 */
Overlay.prototype.close = function() {
    var container = this.getContainer()
    var messageArea = this.getMessageArea()
    container.fadeOut(function() {
        messageArea.text('')
    })
}


module.exports = new Overlay()
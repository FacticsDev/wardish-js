/**
 * 画面上にメッセージを表示するためのユーティリティー
 */
var Message = function() {
    this.infoBoxSelector = '#infoMessageBox';
    this.errorBoxSelector = '#errorMessageBox';

    this.inputFieldSelector = '.data-field'
    this.inputErrorClass = 'has-warning'
};

/**
 * 入力エラーを表示します
 */
Message.prototype.displayInputError = function (xhr, status, error, containerSelector) {
    if ( !containerSelector ) containerSelector = 'document'
    var $this = this;
    var res = $.parseJSON(xhr.responseText);

    $(containerSelector + ' ' + $this.inputFieldSelector)
        .removeClass($this.inputErrorClass)
        .popover('dispose');

    if ( xhr.status === 400 ) {
        if ( res.message ) {
            $this.showErrorMessage(res.message);
        }
        $.each( res.data, function(fieldId, fieldValue){

            //エラーがあれば表示
            if ( fieldValue['error'] ) {
                setTimeout(function(){
                    $(containerSelector + ' #' + fieldId)
                        .addClass($this.inputErrorClass)
                        .popover({
                            'toggle' : 'popover',
                            'trigger' : 'hover',
                            'container' : 'body',
                            'placement' : 'top',
                            'html' : true,
                            'content' : fieldValue['error'],
                        });
                    }, 300);
            }
        });
    } else if ( xhr.status != 200 ) {
        if ( res.message ) {
            $this.showErrorMessage(res.message);
        } else {
            $this.showErrorMessage('サーバー内でエラーが発生しました。<br />' + xhr.responseText);
        }
    }
}

Message.prototype.clearInputError = function(containerSelector) {
    if ( !containerSelector ) containerSelector = 'document'
    var $this = this;

    $this.hideErrorMessage();

    $(containerSelector + ' ' + $this.inputFieldSelector)
        .removeClass($this.inputErrorClass)
        .popover('dispose');
}

/**
 * Infoフェードイン
 */
Message.prototype.showInfoMessage = function(message) {
    if ( !message ) message = null
    var $this = this;

    var selector = $this.infoBoxSelector;
    $(selector).find('span.message').remove();
    if ( message ) {
        $(selector).append($('<span class="message">' + message + '</span>')).fadeIn(function(){
            setTimeout(function(){
                $(selector).fadeOut();
            }, 3000)
        });
    } else {
        var urlParams = getUrlParams();
        if ( urlParams.info_msg ) {
            $(selector).append($('<span class="message">' + decodeURIComponent(urlParams.info_msg) + '</span>')).fadeIn(function(){
                removeUrlParam('info_msg');
                setTimeout(function(){
                    $(selector).fadeOut();
                }, 3000)
            });
        }
    }
}

Message.prototype.hideInfoMessage = function () {
    var $this = this;

    var selector = $this.infoBoxSelector;
    $(selector).find('span.message').remove();
    $(selector).fadeOut();
};

/**
 * Errorフェードイン
 */
Message.prototype.showErrorMessage = function(message) {
    if ( !message ) message = null
    var $this = this;

    var selector = $this.errorBoxSelector;
    $(selector).find('span.message').remove();
    $(selector).append($('<span class="message">' + message + '</span>')).fadeIn(function(){
        // setTimeout(function(){
        //     $(selector).fadeOut();
        // }, 3000)
    });
}

Message.prototype.hideErrorMessage = function(message) {
    var $this = this;

    var selector = $this.errorBoxSelector;
    $(selector).find('span.message').remove();
    $(selector).fadeOut();
};

/**
 * URLパラメータを取得します.
 */
function getUrlParams() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function removeUrlParam(paramKey) {
    var urlQueryString = document.location.search;
    var pathname = document.location.pathname;
    var replaceQueryString = pathname;
    if (urlQueryString !== "") {

        // クエリストリング毎に分割
        var params = urlQueryString.slice(1).split("&");

        // クエリストリング確認用
        for (var i = 0; i < params.length; i++) {
            var param = params[i].split("=");
            var key = param[0];
            var value = param[1];

            // 該当するクエリストリングは無視
            if (key === paramKey || key === "") continue;

            // 新たにクエリストリングを作成
            if (replaceQueryString !== pathname) {
                replaceQueryString += "&";
            } else {
                replaceQueryString += "?";
            }

            replaceQueryString += key + "=" + value;
        }
    }

    // URLに新しいクエリストリングを付与
    history.replaceState('','',replaceQueryString);
}

module.exports = new Message();

javascript: var APIKEY = 'trnsl.1.1.20191229T171159Z.1c8e8e7908ec7585.bedb9463e1aa12faa0798882dc1742e44dc0ad53';
var FROM = 'en';
var TO = 'tr';
var yandexTranslateOrigin = 'https://translate.yandex.net';
var baseAPI = yandexTranslateOrigin + '/api/v1.5/tr.json';
var translateAPI = baseAPI + '/translate?key=' + APIKEY;
var withCors = (url)=>'https://cors-anywhere.herokuapp.com/' + url;
var maxCacheSize = 10000;
var cache = new Map();
async function translate(originalText, from=FROM, to=TO) {
    if (typeof originalText !== 'string' || originalText === '') {
        return '';
    }
    var sourceText = originalText.trim();
    var key = sourceText+from+to;
    if (cache.has(key)) {
        return cache.get(key);
    }
    if (cache.size >= maxCacheSize) {
        cache.clear();
    }
    var url = translateAPI+'&lang='+from+'-'+to+'&text='+encodeURIComponent(sourceText);
    var response = await fetch(withCors(url),{method:'POST',headers:{Origin:yandexTranslateOrigin}});
    var responseData = await response.json();
    var text = responseData.text[0];
    cache.set(key, text);
    return text;
}
function sleep(time) {
    return new Promise((resolve)=>setTimeout(resolve, time));
}
var urlx = "";
var open = window.XMLHttpRequest.prototype.open, send = window.XMLHttpRequest.prototype.send, onReadyStateChange;
function openReplacement(method, url, async, user, password) {
    var syncMode = async !== false ? 'async' : 'sync';
    urlx = url;
    return open.apply(this, arguments);
}
function sendReplacement(data, url) {
    if (urlx.search("https://engine.freerice.com/") > -1) {
        sleep(4000).then(()=>{
            if (this.onreadystatechange) {
                this._onreadystatechange = this.onreadystatechange;
            }
            this.onreadystatechange = onReadyStateChangeReplacement;
            return send.apply(this, arguments);
        }
        );
    }
    var button = document.querySelectorAll('.card-button');
    var title = document.querySelectorAll('.card-title');
    translate(title[0].innerText, 'en', 'tr').then((text)=>{
        title[0].innerText = title[0].innerText + "        " + text;
    }
    );
    button.forEach(function(entry) {
        translate(entry.innerText, 'en', 'tr').then((text)=>{
            entry.innerText = entry.innerText + "        " + text;
        }
        );
    });
}
function onReadyStateChangeReplacement() {
    if (this._onreadystatechange) {
        return this._onreadystatechange.apply(this, arguments);
    }
    
}
window.XMLHttpRequest.prototype.open = openReplacement;
window.XMLHttpRequest.prototype.send = sendReplacement;

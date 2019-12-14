fetch("https://wifi.kyk.gov.tr/sonHareketler.html", {
    "credentials": "include",
    "headers": {
        "accept": "application/xml, text/xml, */*; q=0.01",
        "accept-language": "tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "faces-request": "partial/ajax",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-requested-with": "XMLHttpRequest"
    },
    "referrer": "https://wifi.kyk.gov.tr/",
    "referrerPolicy": "no-referrer-when-downgrade",
    "body": "javax.faces.partial.ajax=true&javax.faces.source=sorguSonuclari&javax.faces.partial.execute=sorguSonuclari&javax.faces.partial.render=sorguSonuclari&sorguSonuclari=sorguSonuclari&sorguSonuclari_pagination=true&sorguSonuclari_first=0&sorguSonuclari_rows=400&sorguSonuclari_encodeFeature=true&localeChangeForm=localeChangeForm&javax.faces.ViewState=-7396764354279273152%3A-1143088503097531382",
    "method": "POST",
    "mode": "cors"
}).then(response=>response.text()).then((response)=>{
    //console.log(response);
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(response, "text/xml");
    //console.log(xmlDoc.getElementsByTagName('update')[0].textContent)
    var doc = document.implementation.createHTMLDocument();
    doc.write('<table role="grid"><thead id="sorguSonuclari_head"><tr role="row"><th id="sorguSonuclari:j_idt15" class="ui-state-default" role="columnheader"><span class="ui-column-title">Giriş Saati</span></th><th id="sorguSonuclari:j_idt17" class="ui-state-default" role="columnheader"><span class="ui-column-title">Yurt Adı</span></th><th id="sorguSonuclari:j_idt19" class="ui-state-default" role="columnheader"><span class="ui-column-title">İndirme(MB)</span></th><th id="sorguSonuclari:j_idt21" class="ui-state-default" role="columnheader"><span class="ui-column-title">Yükleme(MB)</span></th><th id="sorguSonuclari:j_idt23" class="ui-state-default" role="columnheader"><span class="ui-column-title">Süre(Sn)</span></th><th id="sorguSonuclari:j_idt25" class="ui-state-default" role="columnheader" style="width:35%"><span class="ui-column-title">Servis</span></th></tr></thead><tbody id="sorguSonuclari_data" class="ui-datatable-data ui-widget-content">' + xmlDoc.getElementsByTagName('update')[0].innerHTML + '</tbody></table>');
    var t = doc.getElementById("sorguSonuclari_data")
    var servis = "AYLIK 16GB KOTALI HIZ LIMITSIZ"
    var indirme = 0;
    var yukleme = 0;
    var d = new Date();
    var ay = (d.getMonth() + 1) < 10 ? "0" + (d.getMonth() + 1) : (d.getMonth() + 1);
    for (var key in t.rows) {
        if (key > -1)
            if (t.rows[key].childNodes[5].innerText == servis && t.rows[key].childNodes[0].innerText.split(".")[1] == ay) {
                indirme += parseInt(t.rows[key].childNodes[2].innerText);
                yukleme += parseInt(t.rows[key].childNodes[3].innerText);
            }
    }
    var kullanilan = ((indirme + yukleme) / 1024).toFixed(2) + " GB";
    var kalan = (((16 * 1024) - (indirme + yukleme)) / 1024).toFixed(2) + " GB";
    var site = '<!DOCTYPE html><html><head><title>KykWifi Kota Dostu</title><script type="text/javascript" src="https://raw.githubusercontent.com/loadingio/loading-bar/master/dist/loading-bar.js"></script><style type="text/css">html, body {height: 100%;}body{margin:0;padding:0;background-color:#D2D2D2;font:24px "Trebuchet MS", Arial, Helvetica, sans-serif;color:#333333;}.center-div{display: flex;align-items: center;justify-content: center;background-color: #ccc;border-radius: 3px;}.ldBar{position:relative;}.ldBar.label-center > .ldBar-label{position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);text-shadow:0 0 3px #fff}.ldBar-label:after{content:"%";display:inline}.ldBar.no-percent .ldBar-label:after{content:""}</style></head><body><div class="center-div"><h1>' + ay + '. Ayın Kullanımı</h1></div><div class="center-div"><h1>' + kullanilan + '</h1></div><div class="center-div"><h1>Kalan</h1></div><div class="center-div"><h1>' + kalan + '</h1></div><div class="center-div"><div class="ldBar label-center" data-value="50"  data-preset="circle"></div></div></html>';
    var popupWindow = window.open("", "", "menubar=0,scrollbars=0");
    popupWindow.document.write(site);
    popupWindow.document.close();
}
).catch(err=>console.log(err))

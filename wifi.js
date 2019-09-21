var t = document.getElementById("sorguSonuclari_data")
var servis = "AYLIK 16GB KOTALI HIZ LIMITSIZ"
var indirme=0;
var yukleme=0;
var d = new Date();
var ay= (d.getMonth()+1)<10 ? "0"+(d.getMonth()+1) : (d.getMonth()+1);
for (var key in t.rows){
if (key>-1)
if (t.rows[key].childNodes[5].innerText==servis && t.rows[key].childNodes[0].innerText.split(".")[1]==ay){
	indirme+=parseInt(t.rows[key].childNodes[2].innerText);
	yukleme+=parseInt(t.rows[key].childNodes[3].innerText);
}
}
var kullanilan=((indirme+yukleme)/1024).toFixed(2)+" GB";
var kalan = (((16*1024)-(indirme+yukleme))/1024).toFixed(2)+" GB";
var site='<!DOCTYPE html><html><head><title>KykWifi Kota Dostu</title><script type="text/javascript" src="https://raw.githubusercontent.com/loadingio/loading-bar/master/dist/loading-bar.js"></script><style type="text/css">html, body {height: 100%;}body{margin:0;padding:0;background-color:#D2D2D2;font:24px "Trebuchet MS", Arial, Helvetica, sans-serif;color:#333333;}.center-div{display: flex;align-items: center;justify-content: center;background-color: #ccc;border-radius: 3px;}.ldBar{position:relative;}.ldBar.label-center > .ldBar-label{position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);text-shadow:0 0 3px #fff}.ldBar-label:after{content:"%";display:inline}.ldBar.no-percent .ldBar-label:after{content:""}</style></head><body><div class="center-div"><h1>'+ay+'. Ayın Kullanımı</h1></div><div class="center-div"><h1>'+kullanilan+'</h1></div><div class="center-div"><h1>Kalan</h1></div><div class="center-div"><h1>'+kalan+'</h1></div><div class="center-div"><div class="ldBar label-center" data-value="50"  data-preset="circle"></div></div></html>';
var popupWindow = window.open("","","menubar=0,scrollbars=0");
popupWindow.document.write(site);
popupWindow.document.close();

/*https: //www.google.com/search?q=*/

habersiteleri=[
"trthaber.com",
"mynet.com",
"haberler.com",
"ensonhaber.com",
"ahaber.com.tr",
"ntv.com.tr",
"milliyet.com.tr",
"sondakika.com",
"internethaber.com",
"t24.com.tr",
"memurlar.net",
"yenisafak.com",
"star.com.tr",
"fotomac.com.tr",
"sabah.com.tr",
"hurriyet.com.tr",
"sozcu.com.tr",
"haber7.com",
"haberturk.com",
"cnnturk.com",
"aksam.com.tr",
"takvim.com.tr"]
var engelle="";
for (var key in habersiteleri){
    engelle+=" -site:"+habersiteleri[key];
}

javascript: if (document.URL.search("google.com") < 0) {
    alert("Haber Engelleyici BookMarklet");
    location.href = "https://google.com";
} else {
    location.href = "https://google.com/search?q=" + escape(prompt('Googleda arama yapin:').replace(" ", "+")) +engelle;
}
save();

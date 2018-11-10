javascript:
server = atob("aHR0cDovLzE1OS42NS4xNjcuMTkyOjgwODAvZ2V0LW1wMy8=");
//kodda gelistirme yapilabilir pc icin yerimlerine ekleyin sonra video sayfasinda calistirin.
//ornek link https://www.youtube.com/watch?v=fa2L-A2sS-4
function downloadURI(uri, name) {
    //https://stackoverflow.com/a/23013574/9218468
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    link.click();
}
if (document.location.host == "www.youtube.com") {
    id = document.location.search.replace("?v=", "");
    downloadURI(server + id, document.title + ".mp3")

} else {
    alert("Bu kod sadece youtube.com da çalışır.");
    var arama = escape("" + prompt('Arama Yapın:'));
    link = "https://www.youtube.com/results?search_query=" + arama + "&page=&utm_source=opensearch";
    location.href = link;
    alert("sarki sayfasina gelince tekrar calistir.");
}

var url = document.URL.indexOf("?")
var percorso = ""
function easy() {
    percorso += document.URL.slice(url)
    percorso += "&scelta=f" 
    console.log(percorso)
    window.location.href="../html/index.html"+percorso 
}
function normal() {
    percorso += document.URL.slice(url)
    percorso += "&scelta=n" 
    window.location.href="../html/index.html"+percorso 
}
function hard() {
    percorso += document.URL.slice(url)
    percorso += "&scelta=d" 
    window.location.href="../html/index.html"+percorso 
}
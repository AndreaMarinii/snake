var slider_rosso = document.getElementById("slider_rosso");
var slider_verde = document.getElementById("slider_verde");
var slider_blu = document.getElementById("slider_blu");

var rosso = 0;
var verde = 0;
var blu = 0;

slider_rosso.onchange = function () {
  rosso = slider_rosso.value;
  document.getElementById("colore").style.backgroundColor =
    "rgb(" + rosso + "," + verde + "," + blu + ")";
  valore_rosso_serpente = rosso;
};

slider_verde.onchange = function () {
  verde = slider_verde.value;
  document.getElementById("colore").style.backgroundColor =
    "rgb(" + rosso + "," + verde + "," + blu + ")";
  valore_verde_serpente = verde;
};

slider_blu.onchange = function () {
  blu = slider_blu.value;
  document.getElementById("colore").style.backgroundColor =
    "rgb(" + rosso + "," + verde + "," + blu + ")";
  valore_blu_serpente = blu;
};

function getcolor() {
  var colore = ""
  colore += "?r=" + rosso + "&v=" + verde + "&b=" + blu
  window.location.href="../html/snake_game.html"+colore
}
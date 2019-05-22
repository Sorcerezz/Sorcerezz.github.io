console.log("Die Website lädt noch!");
window.onload = function () {
    console.log("Die Website hat fertig geladen!");
    document.getElementById("b2").addEventListener("click", Inhalt);
};
function Inhalt() {
    console.log("Der Text des Knopfes hat sich verändert");
    document.getElementById("b2").innerHTML = "Hier steht was neues!";
}
//# sourceMappingURL=script.js.map
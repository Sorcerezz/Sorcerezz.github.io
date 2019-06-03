console.log("Wilkommen im Tutorium!"); /*console.log Wird in der Console angezeigt*/
window.onload = function () {
    window.alert("Schon gelernt?");
    console.log("Die Website ist fertig!");
    document.getElementById("b0").addEventListener("mouseover", B0);
    document.getElementById("b1").addEventListener("click", B1);
};
function B0() {
    document.getElementById("b0").innerHTML = "Gehovert!";
    console.log("Der Text von Knopf 0 hat sich verändert");
}
function B1() {
}
//# sourceMappingURL=script.js.map
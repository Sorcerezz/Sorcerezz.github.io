let S1 = "String";
let S2 = "Gnirts";
let N1 = 23542;
let N2 = 4234;
console.log("Die Website lädt noch!");
window.onload = function () {
    console.log("Die Website hat fertig geladen!");
    console.log("---------------------------------------------");
    Rechnung();
    Knopf7();
    document.getElementById("b1").addEventListener("click", B1); //Klick
    document.getElementById("b2").addEventListener("click", B2);
    document.getElementById("b3").addEventListener("click", B3p1);
    document.getElementById("b3").addEventListener("dblclick", B3p2); //Doppelklick
    document.getElementById("b4").addEventListener("click", B4);
    document.getElementById("b5").addEventListener("mouseover", B5); //Drüberfahren
    document.getElementById("b6").addEventListener("click", B6);
    document.getElementById("b7").addEventListener("click", B7);
};
function Rechnung() {
    console.log("- 1Rechungen zwischen Variablen:");
    console.log(S1 + S2);
    console.log(S2 + S1);
    console.log(S1 + N1);
    console.log(N2 + S1);
    console.log(S1 + N2);
    console.log(N1 + S1);
    console.log(S2 + N1);
    console.log(N2 + S2);
    console.log(S2 + N2);
    console.log(N1 + S2);
    console.log(N1 + N2);
    console.log("- Boolean abfrage"); //Optinal 3:
    console.log(Boolean(N1 > N2));
    console.log(Boolean(N1 < N2));
    console.log("---------------------------------------------");
}
function Knopf7() {
    let newButton = document.createElement("button");
    let position = document.getElementById("body");
    position.appendChild(newButton);
    newButton.innerHTML = "Klick mich!";
    newButton.id = "b6";
}
function B1() {
    console.log("Knopf 1 und seine Klasse haben sich verändert");
    document.getElementById("b1").innerHTML = "Meine Klasse hat sich verändert!";
    document.getElementById("b1").className = "classY";
}
function B2() {
    console.log("Knopf 2 hat sich verändert");
    document.getElementById("b2").innerHTML = "Hier steht was neues!";
}
function B3p1() {
    console.log("Knopf 3 hat sich verändert");
    document.getElementById("b3").innerHTML = "Und jetzt 2x!";
}
function B3p2() {
    console.log("Knopf 3 hat sich verändert");
    document.getElementById("b3").innerHTML = "Nochmal!";
}
function B4() {
    console.log("Knopf 4 hat sich verändert");
    document.getElementById("b4").innerHTML = "Musstest doch nicht klicken!";
}
function B5() {
    console.log("Knopf 5 / Nummer N1 hat sich verändert");
    document.getElementById("b5").innerHTML = "Ich hab N1 verändert!";
    let Number = N1;
    let newNumber = N1 + 900;
}
function B6() {
    console.log("Knopf 6 hat sich verändert / ein neuer Paragraph wurde erstellt");
    document.getElementById("b6").innerHTML = "Neuer Text erscheint!";
    let P = document.createElement("p");
    let position = document.getElementById("body");
    position.appendChild(P);
    P.innerHTML = "Ich wurde durch ein Script erstellt";
}
function B7() {
    console.log("Knopf 7 hat sich verändert / einen neuen Knopf X erstellt");
    document.getElementById("b7").innerHTML = "Ein neuer Knopf erscheint!";
    let newButton = document.createElement("button");
    let position = document.getElementById("body");
    position.appendChild(newButton);
    newButton.innerHTML = "Ich wurde durch ein Script erstellt";
    newButton.id = "bx";
}
//# sourceMappingURL=script.js.map
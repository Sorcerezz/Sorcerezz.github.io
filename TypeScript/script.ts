console.log("Die Website lädt noch!");

window.onload = function ()     //Wird Ausgeführt wenn die Seite geladen hat
{
    console.log("Die Website hat fertig geladen!");
    console.log("---------------------------------------------");
    Rechnung();
    Knopf6();
    document.getElementById("b1").addEventListener("click", B1);
    document.getElementById("b2").addEventListener("click", B2);
    document.getElementById("b3").addEventListener("click", B3p1);
    document.getElementById("b3").addEventListener("dblclick", B3p2);
    document.getElementById("b4").addEventListener("mouseover", B4);
    document.getElementById("b5").addEventListener("click", B5);
    document.getElementById("b6").addEventListener("click", B6);
}

function Rechnung () //Die gewünschte Rechnung ziwschen Strings und Nummern
{
    let S1: string = "String";
    let S2: string = "Gnirts";
    let N1: number = 23542;
    let N2: number = 234234;

    console.log ("Rechungen zwischen Variablen:")
    console.log (S1+S2)
    console.log (S2+S1)
    console.log (S1+N1)
    console.log (N2+S1)
    console.log (S1+N2)
    console.log (N1+S1)
    console.log (S2+N1)
    console.log (N2+S2)
    console.log (S2+N2)
    console.log (N1+S2)
    console.log (N1+N2)
    console.log("---------------------------------------------");
    
}

function Knopf6 ()  //Erstellt einen neuen nicht in der HTML Datei vorhandenen Knopf
{
    let newButton = document.createElement ("button");
    let position = document.getElementById ("body");
    position.appendChild(newButton);
    newButton.innerHTML = "Klick mich!";
    newButton.id = "b6";
}

function B1()
{
    console.log("Knopf 1 und seine Klasse haben sich verändert");
    document.getElementById("b1").innerHTML="Meine Klasse hat sich verändert!";

    document.getElementById("b1").className = "classY"
}
function B2()
{
    console.log("Knopf 2 hat sich verändert");
    document.getElementById("b2").innerHTML="Hier steht was neues!";
}
function B3p1()
{
    console.log("Knopf 3 hat sich verändert");
    document.getElementById("b3").innerHTML="Und jetzt 2x!";
}
function B3p2()
{
    console.log("Knopf 3 hat sich verändert");
    document.getElementById("b3").innerHTML="Nochmal!";
}
function B4()
{
    console.log("Knopf 4 hat sich verändert");
    document.getElementById("b4").innerHTML="Musstest doch nicht klicken!";
}
function B5() //Erstellt
{
    console.log("Knopf 5 hat sich verändert und ein neuer Paragraph wurde erstellt");
    document.getElementById("b5").innerHTML="Neuer Text erscheint!";

    let P = document.createElement ("p");
    let position = document.getElementById ("body");
    position.appendChild(P);
    P.innerHTML = "Ich wurde durch ein Script erstellt";
}
function B6() //Erstellt neue Knöpfe
{
    console.log("Knopf 6 hat sich verändert und einen neuen Knopf X erstellt");
    document.getElementById("b6").innerHTML="Ein neuer Knopf erscheint!";

    let newButton = document.createElement ("button");
    let position = document.getElementById ("body");
    position.appendChild(newButton);
    newButton.innerHTML = "Ich wurde durch ein Script erstellt";
    newButton.id = "bx";
}


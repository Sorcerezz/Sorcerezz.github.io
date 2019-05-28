console.log("Die Website lädt noch!");

window.onload = function ()     //Wird Ausgeführt wenn die Seite geladen hat
{
    console.log("Die Website hat fertig geladen!");
    document.getElementById("b2").addEventListener("click", Inhalt1)
    document.getElementById("b3").addEventListener("click", Inhalt2)
}

function Inhalt1()
{
    console.log("Der Text des Knopfes hat sich verändert");
    document.getElementById("b2").innerHTML="Hier steht was neues!"
}

function Inhalt2()
{
    console.log("Der Text des Knopfes hat sich verändert");
    document.getElementById("b3").innerHTML="Hier steht auch was neues!"
}


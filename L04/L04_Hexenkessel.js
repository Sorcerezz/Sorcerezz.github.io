"use strict";
var Hexenkessel;
(function (Hexenkessel) {
    window.addEventListener("load", handleLoad);
    let zutatenliste = [];
    let _name;
    let _wirkung;
    let _beschreibung;
    let _wDauer;
    let _temp;
    let _intensität;
    let _zDauer;
    let _konsistenz;
    let _farbe;
    let gesamtpreis = 0;
    function handleLoad(_event) {
        console.log("Vollständig geladen");
        let form1 = document.querySelector("form#Basis");
        form1.addEventListener("input", SpeicherForm);
        form1.addEventListener("change", SpeicherForm);
    }
    function SpeicherForm(_event) {
        console.log("SpeicherForm gestartet");
        RezeptVoschau;
    }
    function RezeptVoschau() {
        console.log("Rezept wird generiert");
        for (let i = 1; i < 5; i++) {
            let position = document.getElementById("Rezept");
            switch (i) {
                case 1:
                    let name = document.createElement("h3");
                    position.appendChild(name);
                    name.innerHTML = _name;
                case 2:
                    let wirkung = document.createElement("h3");
                    position.appendChild(wirkung);
                    wirkung.innerHTML = "Wirkung: " + _wirkung;
                case 3:
                    let beschreibung = document.createElement("h3");
                    position.appendChild(beschreibung);
                    beschreibung.innerHTML = "Beschreibung: " + _beschreibung;
                case 4:
                    let wirkungsdauer = document.createElement("h3");
                    position.appendChild(wirkungsdauer);
                    wirkungsdauer.innerHTML = "Wirkungsdauer: " + _wDauer + "Stunden";
                default:
                    break;
            }
        }
    }
})(Hexenkessel || (Hexenkessel = {}));
//# sourceMappingURL=L04_Hexenkessel.js.map
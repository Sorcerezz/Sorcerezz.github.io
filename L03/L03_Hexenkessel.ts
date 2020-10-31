namespace Hexenkessel {
    window.addEventListener("load", handleLoad);

    interface Zutat {
        Name: string;
        Anzahl: number;
        Preis: number;
    }

    let zutaten: Zutat[] = [{ Name: "graue haare", Anzahl: 1, Preis: 2 }, { Name: "schlangenschuppen", Anzahl: 1, Preis: 4 }, { Name: "drachenschuppen", Anzahl: 1, Preis: 6 }, { Name: "fingernägel", Anzahl: 1, Preis: 1 }, { Name: "rattenschwanz", Anzahl: 1, Preis: 2.3 }, { Name: "weissheitszähne", Anzahl: 1, Preis: 66 }, { Name: "getrockneter frosch", Anzahl: 1, Preis: 20 }, { Name: "einhornhorn", Anzahl: 1, Preis: 42 }, { Name: "phönixasche", Anzahl: 1, Preis: 69 }, { Name: "eulenfeder", Anzahl: 1, Preis: 20 }, { Name: "drachenwimpern", Anzahl: 1, Preis: 26 }, { Name: "wolfskralle", Anzahl: 1, Preis: 7 }, { Name: "schlangengift", Anzahl: 1, Preis: 5 }, { Name: "drachenurin", Anzahl: 1, Preis: 50 }, { Name: "jungfrauenblut", Anzahl: 1, Preis: 420 }, { Name: "malfeus tränen", Anzahl: 1, Preis: 9 }, { Name: "basilisken sabber", Anzahl: 1, Preis: 666 }, { Name: "einhornblut", Anzahl: 1, Preis: 20 }, { Name: "wasser", Anzahl: 1, Preis: 0.03 }, { Name: "vodka", Anzahl: 1, Preis: 1 }, { Name: "professoren schweiss", Anzahl: 1, Preis: 0.01 }, { Name: "rückenmark", Anzahl: 1, Preis: 50 }, { Name: "tintenfisch tinte", Anzahl: 1, Preis: 3 }, { Name: "studenten tränen", Anzahl: 1, Preis: 0.1 }];
    let zutatenliste: Zutat[] = [];

    let _name: string;
    let _wirkung: string;
    let _beschreibung: string;
    let _wDauer: number;
    let _temp: number;
    let _intensität: number;
    let _zDauer: number;
    let _konsistenz: string;
    let _farbe: string;

    let gesamtpreis: number = 0;

    function handleLoad(_event: Event): void {
        console.log("Vollständig geladen");

        let form1: HTMLFormElement = <HTMLFormElement>document.querySelector("form#Angaben");
        let form2: HTMLFormElement = <HTMLFormElement>document.querySelector("form#Enden");

        form1.addEventListener("input", SpeicherForm);
        form1.addEventListener("change", SpeicherForm);

        form2.addEventListener("input", SpeicherForm);
        form2.addEventListener("input", SpeicherForm);
    }

    function SpeicherForm(_event: Event): void {
        console.log("SpeicherForm gestartet");


        RezeptVoschau;
    }

    function RezeptVoschau(): void {
        console.log("Rezept wird generiert");

        for (let i: number = 1; i < 10; i++) {

            let position: HTMLElement = document.getElementById("Rezept");

            switch (i) {
                case 1:
                    let name: HTMLElement = document.createElement("h3");

                    position.appendChild(name);
                    name.innerHTML = _name;
                case 2:
                    let wirkung: HTMLElement = document.createElement("h3");

                    position.appendChild(wirkung);
                    wirkung.innerHTML = "Wirkung: " + _wirkung;
                case 3:
                    let beschreibung: HTMLElement = document.createElement("h3");

                    position.appendChild(beschreibung);
                    beschreibung.innerHTML = "Beschreibung: " + _beschreibung;
                case 4:
                    let wirkungsdauer: HTMLElement = document.createElement("h3");

                    position.appendChild(wirkungsdauer);
                    wirkungsdauer.innerHTML = "Wirkungsdauer: " + _wDauer + "Stunden";
                case 5:
                    let temperatur: HTMLElement = document.createElement("h3");

                    position.appendChild(temperatur);
                    temperatur.innerHTML = "Erhitzen / Abkühlen auf: " + _temp + "°C"
                case 6:
                    let intensität: HTMLElement = document.createElement("h3");

                    position.appendChild(intensität);
                    intensität.innerHTML = "Rühren mit Stufe " + _intensität + "Intensität";
                case 7:
                    let zubereitungsdauer: HTMLElement = document.createElement("h3");

                    position.appendChild(zubereitungsdauer);
                    zubereitungsdauer.innerHTML = "Zubereitungsdauer ca. " + _zDauer + "h";
                case 8:
                    let konsistenz: HTMLElement = document.createElement("h3");

                    position.appendChild(konsistenz);
                    konsistenz.innerHTML = "Konsistenz sollte " + _konsistenz + " sein";
                case 9:
                    let farbe: HTMLElement = document.createElement("h3");

                    position.appendChild(farbe);
                    farbe.innerHTML = "Endgültige Farbe: " + _farbe;
                default:
                    break;
            }
        }
    }
}

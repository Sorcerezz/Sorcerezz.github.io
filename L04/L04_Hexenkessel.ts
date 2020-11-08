namespace Hexenkessel {
    window.addEventListener("load", handleLoad);

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

        let form1: HTMLFormElement = <HTMLFormElement>document.querySelector("form#Basis");

        form1.addEventListener("input", SpeicherForm);
        form1.addEventListener("change", SpeicherForm);
    }

    function SpeicherForm(_event: Event): void {
        console.log("SpeicherForm gestartet");


        RezeptVoschau;
    }

    function RezeptVoschau(): void {
        console.log("Rezept wird generiert");

        for (let i: number = 1; i < 5; i++) {

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
                default:
                    break;
            }
        }
    }
}

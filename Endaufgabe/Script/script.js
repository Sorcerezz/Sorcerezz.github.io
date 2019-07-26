console.log("Die Seite lädt noch.");
/* ~~ Arrays ~~ */
let SpielerHand = [];
let GegnerHand = [];
let ZugDeck = [];
let AblageDeck = [];
/* ~~ Variablen ~~ */
let SpielerAmZug = true; // Gibt an ob der Player am Zug ist.
let GegnerHandSichtbar = false; // Gibt an ob die Karten des Computers sichtbar sind.
/* ~~ Onload ~~ */
window.onload = function () {
    console.log(" Die Webseite hat fertig geladen!");
    console.log("Das Spiel wird vorbereitet.");
    Generierung();
    ZugDeckMischen();
    Austeilen();
    ErneuereHTML();
    console.log("Du kannst jetzt spielen!");
    console.log("---------------------------------------------");
};
/* ~~ Funktionen ~~ */
/* ~~ Hintergrundfunktionen ~~ */
function Generierung() {
    let neuerKartenWert;
    let neueKartenFarbe;
    let neueKartenBesonderheit = "none";
    for (let k = 0; k < 2; k++) {
        switch (k) {
            case 0:
            case 1:
                neueKartenBesonderheit = "Plus 2";
                break;
        }
        let neueKarte = {
            KartenBesonderheit: neueKartenBesonderheit,
            KartenWert: 10,
            KartenFarbe: "Besonders"
        };
        ZugDeck.push(neueKarte);
    }
    for (let w = 1; w <= 9; w++) //Werte 1-9 je 4 Farben
     {
        for (let f = 0; f < 4; f++) {
            neuerKartenWert = w;
            switch (f) {
                case 0:
                    neueKartenFarbe = "Rot";
                    break;
                case 1:
                    neueKartenFarbe = "Lila";
                    break;
                case 2:
                    neueKartenFarbe = "Orange";
                    break;
                case 3:
                    neueKartenFarbe = "Grün";
                    break;
            }
            let neueKarte = {
                KartenBesonderheit: "none",
                KartenWert: neuerKartenWert,
                KartenFarbe: neueKartenFarbe
            };
            ZugDeck.push(neueKarte);
        }
    }
    console.log("- Die Karten wurden generiert.");
}
function ZugDeckMischen() {
    ZugDeck.sort //sortiert nach + / -
    (function (a, b) {
        return 0.5 - Math.random(); //zufällig + / - Zahl.
    });
    console.log("- Die Karten wurden gemischt.");
}
function Austeilen() {
    for (let i = 0; i < 8; i++) //Teilt 8 Karten aus
     {
        GegnerHand.push(ZugDeck[0]);
        ZugDeck.splice(0, 1);
        SpielerHand.push(ZugDeck[0]);
        ZugDeck.splice(0, 1);
    }
    AblageDeck.push(ZugDeck[0]);
    ZugDeck.splice(0, 1);
    console.log("- Die Karten wurden ausgeteilt.");
}
/* ~~ Vordergrundfunktionen ~~ */
function GeneriereGegnerHand(KartenNummer) {
    if (!GegnerHandSichtbar) //VersteckteKarten
     {
        let KartenDiv = document.createElement("div");
        KartenDiv.setAttribute("id", "GegnerKarte" + (KartenNummer + 1));
        KartenDiv.setAttribute("class", "VersteckteKarte");
        document.getElementById("GegnerHand").appendChild(KartenDiv);
    }
    else //SichtbareKarten
     {
        let KartenDiv = document.createElement("div");
        KartenDiv.setAttribute("id", "GegnerKarte" + (KartenNummer + 1));
        KartenDiv.setAttribute("class", "Karte");
        document.getElementById("GegnerHand").appendChild(KartenDiv);
        let tempCardValue = GegnerHand[KartenNummer].KartenWert + "";
        switch (GegnerHand[KartenNummer].KartenBesonderheit) {
            case "Plus 2":
                tempCardValue = "+2";
                break;
        }
        let AnzuzeigenderWert = document.createElement("p");
        AnzuzeigenderWert.innerHTML = tempCardValue + "";
        AnzuzeigenderWert.setAttribute("class", GegnerHand[KartenNummer].KartenFarbe);
        KartenDiv.appendChild(AnzuzeigenderWert);
    }
}
function GeneriereZugDeck() {
    let KartenDiv = document.createElement("div");
    KartenDiv.setAttribute("id", "ObersteKarte");
    KartenDiv.setAttribute("class", "VersteckteKarte");
    KartenDiv.addEventListener('click', function () { KarteZiehen(SpielerAmZug); }, false);
    document.getElementById("ZugDeck").appendChild(KartenDiv);
}
function GeneriereAblageDeck(KartenNummer) {
    let KartenDiv = document.createElement("div");
    KartenDiv.setAttribute("id", "AbgelegteKarte" + (KartenNummer + 1));
    KartenDiv.setAttribute("class", "Karte");
    document.getElementById("AblageDeck").appendChild(KartenDiv);
    let TempKartenWert = AblageDeck[KartenNummer].KartenWert + "";
    switch (AblageDeck[KartenNummer].KartenBesonderheit) {
        case "Plus 2":
            TempKartenWert = "+2";
            break;
    }
    let AnzuzeigenderWert = document.createElement("p");
    AnzuzeigenderWert.innerHTML = TempKartenWert + "";
    AnzuzeigenderWert.setAttribute("class", AblageDeck[KartenNummer].KartenFarbe);
    KartenDiv.appendChild(AnzuzeigenderWert);
}
function GeneriereSpielerHand(KartenNummer) {
    let KartenDiv = document.createElement("div");
    KartenDiv.setAttribute("id", "SpielerKarte" + (KartenNummer + 1));
    KartenDiv.setAttribute("class", "Karte");
    KartenDiv.addEventListener('click', function () { KarteSpielen(KartenNummer, SpielerAmZug); }, false);
    document.getElementById("SpielerHand").appendChild(KartenDiv);
    let TempKartenWert = SpielerHand[KartenNummer].KartenWert + ""; //was steht auf der Karte
    switch (SpielerHand[KartenNummer].KartenBesonderheit) {
        case "Plus 2":
            TempKartenWert = "+2";
            break;
    }
    let AnzuzeigenderWert = document.createElement("p");
    AnzuzeigenderWert.innerHTML = TempKartenWert + "";
    AnzuzeigenderWert.setAttribute("class", SpielerHand[KartenNummer].KartenFarbe);
    KartenDiv.appendChild(AnzuzeigenderWert);
}
function DreheGegnerHand() {
    GegnerHandSichtbar = !GegnerHandSichtbar;
    ErneuereHTML();
}
/* ~~ Hintergrundfunktionen ~~ */
function ErneuereHTML() {
    LoescheHTML();
    GeneriereHTML();
    console.log("HTML wurde erneuert.");
}
function LoescheHTML() {
    let LeerZuMachen = document.getElementById("SpielerHand");
    let children = LeerZuMachen.children;
    let childCount = children.length;
    for (let i = 0; i < childCount; i++) {
        if (LeerZuMachen.firstElementChild != null)
            LeerZuMachen.removeChild(LeerZuMachen.firstElementChild);
    }
    LeerZuMachen = document.getElementById("GegnerHand");
    children = LeerZuMachen.children;
    childCount = children.length;
    for (let i = 0; i < childCount; i++) {
        if (LeerZuMachen.firstElementChild != null)
            LeerZuMachen.removeChild(LeerZuMachen.firstElementChild);
    }
    LeerZuMachen = document.getElementById("ZugDeck");
    children = LeerZuMachen.children;
    childCount = children.length;
    for (let i = 0; i < childCount; i++) {
        if (LeerZuMachen.firstElementChild != null)
            LeerZuMachen.removeChild(LeerZuMachen.firstElementChild);
    }
    LeerZuMachen = document.getElementById("AblageDeck");
    children = LeerZuMachen.children;
    childCount = children.length;
    for (let i = 0; i < childCount; i++) {
        if (LeerZuMachen.firstElementChild != null)
            LeerZuMachen.removeChild(LeerZuMachen.firstElementChild);
    }
    console.log("- HTML wurde gelöscht.");
}
function GeneriereHTML() {
    for (let i = 0; i < GegnerHand.length; i++) {
        GeneriereGegnerHand(i);
    }
    for (let j = 0; j < SpielerHand.length; j++) {
        GeneriereSpielerHand(j);
    }
    for (let k = 0; k < AblageDeck.length; k++) {
        GeneriereAblageDeck(k);
    }
    GeneriereZugDeck();
    console.log("- HTML wurde erstellt.");
}
/* ~~ Spielfunktionen ~~ */
function KarteSpielen(GespielteKartenNummer, TempAmZug) {
    if (TempAmZug == true) //Spieler will legen
     {
        if ((SpielerHand[GespielteKartenNummer].KartenWert == AblageDeck[AblageDeck.length - 1].KartenWert) || // Gleicher Wert?
            (SpielerHand[GespielteKartenNummer].KartenFarbe == AblageDeck[AblageDeck.length - 1].KartenFarbe) || // Gleiche Farbe?
            (AblageDeck[AblageDeck.length - 1].KartenBesonderheit != "none") || // Zuletzt gelegte Karte ist eine Sonderkarte?
            (SpielerHand[GespielteKartenNummer].KartenBesonderheit != "none")) { //Sonderkarte? -> Funktion ausführen
            NutzeKartenBesonderheit(SpielerHand[GespielteKartenNummer], SpielerAmZug);
            AblageDeck.push(SpielerHand[GespielteKartenNummer]); //Ausspielen
            SpielerHand.splice(GespielteKartenNummer, 1);
            ErneuereHTML();
            if (SpielerHand.length < 1) //Keine Karten -> spiel beenden
             {
                Spielende(true);
            }
            else //Zugwechsel
             {
                setTimeout(GegnerAmZug, 350); //Verzögerung, wäre sonst zu schnell für den Menschen
            }
        }
    }
    else //Gegner will legen
     {
        if ((GegnerHand[GespielteKartenNummer].KartenWert == AblageDeck[AblageDeck.length - 1].KartenWert) ||
            (GegnerHand[GespielteKartenNummer].KartenFarbe == AblageDeck[AblageDeck.length - 1].KartenFarbe) ||
            (AblageDeck[AblageDeck.length - 1].KartenBesonderheit != "none") ||
            (GegnerHand[GespielteKartenNummer].KartenBesonderheit != "none")) { //Sonderkarte? -> Funktion ausführen
            NutzeKartenBesonderheit(GegnerHand[GespielteKartenNummer], SpielerAmZug);
            AblageDeck.push(GegnerHand[GespielteKartenNummer]); //Ausspielen
            GegnerHand.splice(GespielteKartenNummer, 1);
            ErneuereHTML();
            if (GegnerHand.length < 1) //Keine Karten -> spiel beenden
             {
                Spielende(false);
            }
            else //Zugwechsel
             {
                SpielerAmZug = true;
            }
        }
    }
}
function KarteZiehen(TempAmZug) {
    if (ZugDeck.length < 1) //ZugDeck leer -> Ablagestapel mischen 
     {
        NeuMischen();
        ErneuereHTML();
    }
    else if (TempAmZug == true) //Spieler zieht Karte -> Zugwechsel
     {
        SpielerHand.push(ZugDeck[0]);
        ZugDeck.splice(0, 1);
        setTimeout(GegnerAmZug, 350);
    }
    else //Gegner zieht Karte -> Zugwechsel
     {
        GegnerHand.push(ZugDeck[0]);
        ZugDeck.splice(0, 1);
        SpielerAmZug = true;
    }
    ErneuereHTML();
}
function GegnerAmZug() {
    SpielerAmZug = false;
    for (let i = 0; (i < GegnerHand.length) && (SpielerAmZug == false); i++) //Versucht jede Karte
     {
        KarteSpielen(i, SpielerAmZug);
    }
    if (SpielerAmZug == false) //Keine Karte legbar -> zieh eine
     {
        KarteZiehen(SpielerAmZug);
    }
    SpielerAmZug = true; //Zugwechsel
}
/* ~~ Optional ~~ */
function NutzeKartenBesonderheit(TempKarte, TempAmZug) {
    if (TempAmZug) // Wenn der Player am Zug ist.
     {
        switch (TempKarte.KartenBesonderheit) //+2 Karten auf die Hand
         {
            case "Plus 2":
                for (let i = 0; i < 2; i++) {
                    if (ZugDeck.length < 1)
                        NeuMischen();
                    GegnerHand.push(ZugDeck[0]);
                    ZugDeck.splice(0, 1);
                }
                break;
        }
    }
    else // Wenn der Computer am Zug ist.
     {
        switch (TempKarte.KartenBesonderheit) {
            case "Plus 2":
                for (let i = 0; i < 2; i++) {
                    if (ZugDeck.length < 1)
                        NeuMischen();
                    SpielerHand.push(ZugDeck[0]);
                    ZugDeck.splice(0, 1);
                }
                break;
        }
    }
    ErneuereHTML();
}
function NeuMischen() {
    let topCard = AblageDeck[AblageDeck.length - 1]; //Oberste/letzte Karte merken
    while (AblageDeck.length > 0) {
        ZugDeck.push(AblageDeck[AblageDeck.length - 1]);
        AblageDeck.pop();
    }
    AblageDeck.push(topCard);
    ZugDeckMischen();
}
function Spielende(Gewonnen) {
    if (Gewonnen) {
        alert("Du hast gewonnen! Nochmal spielen?");
        console.log("Du hast gewonnen!");
    }
    else {
        alert("Du hast verloren. Nochmal spielen?");
        console.log("Du hast verloren.");
    }
    while (GegnerHand.length > 0) //Arrays leeren
     {
        GegnerHand.pop();
    }
    while (SpielerHand.length > 0) {
        SpielerHand.pop();
    }
    while (ZugDeck.length > 0) {
        ZugDeck.pop();
    }
    while (AblageDeck.length > 0) {
        AblageDeck.pop();
    }
    Generierung();
    ZugDeckMischen();
    Austeilen();
    ErneuereHTML();
    SpielerAmZug = true;
}
//# sourceMappingURL=script.js.map
// ------- Variablen -------- //
let monsterHolder = "monsterHoldingCell"; // ID für das Haupt-Element, in welchem die Monster sich befinden werden. Wird vielleicht mehrfach in dem Skript gebraucht, deshalb einmalig definitiert.
let playerName = "Spielername"; // Ein paar globale Variablen, welche den Spieler darstellen.
let playerXP = 0; // Stellt die gesammelte Erfahrung des Spielers dar. - wenn der Spieler startet hat er keine Erfahrung
let playerXPperLevel = 500; // Da es nur einen Spieler gibt, ergibt sich noch nicht viel Sinn darin, für den Spieler ein interface (im Sinne der Programmierung) zu erstellen.
let playerItems = "Pfeil und Bogen";
// ------- Arrays -------- //
let prefix = ["Höllengesandte ", "Verbannte ", "Unheillvolle ", "Verfluchte ", "Albtraumhafte ", "Wütende ", "Verdorbene ", "Zerschlagene "]; // length = 8, da 8 Einträge. Von 0-7.
let monsterName = ["Valeana", "Rhaenys", "Visenya", "Alyssa", "Area", "Jocelyn", "Rhaella", "Helaena"]; // length = 8, da 8 Einträge. Von 0-7.
let suffix = [" Tochter der Leere", " die Gefallene", " Wächterin des Fegefeuers", " die Schlächterin", " die Rächerin", " die Hexe", " die Wut des Sturms", " die Schiesswütige"]; // length = 8, da hier 8 Einträge sind. Von 0-7.
let monsterModifers = ["Giftig", "Feuerfest", "Giftresistend", "Haut aus Stahl", "Aufgebracht", "Wachsam", "Schnell", "Wasserscheu", "Glühend", "Flink", "Aussersich"]; // Eine Reihe von zufälligen Verstärkern/Zusätzen für das Monster. length = 8, da 8 Einträge. Von 0-7.
let monsterWeapon = ["Gedankenkontrolle", "Blutbändigen", "Blick des Todes", "Versteinern", "Mummiefizierung", "Tanz des Todes", "Gesang der Verstummung", "Erstickender Kuss"]; // length = 8, da 8 Einträge. Von 0-7.
let monsterImage = ["Bilder/Monster (1).png", "Bilder/Monster (2).png", "Bilder/Monster (3).png", "Bilder/Monster (4).png", "Bilder/Monster (5).png", "Bilder/Monster (6).png", "Bilder/Monster (7).png", "Bilder/Monster (8).png"]; // length = 8, da 8 Einträge. Von 0-7.
// -- Initialisierung für viele/variable Anzahl an Monster --
let monsterArray = []; // Das Haupt-Array wurde erstellt und initialisiert!
//console.log(monsterArray ); // Gebe das Monster-Array einmal zu beginn aus. Es sollte leer sein.
// ----------- Funktionen ----------- //
window.onload = function () {
    document.getElementById("monsterSpawner").addEventListener("click", generateMonster, false);
    updatePlayerLevel(); // Zu Anfang wird durch eine Funktion ein HTML-Element mit Inhalt befüllt.
    console.log("" + document.getElementById("monsterSpawner").innerHTML);
};
console.log(document.getElementById("monsterSpawner").innerHTML);
// Die Hauptfunktion, um ein Monster zu erstellen. Wird von einem Button ausgerufen.
// Generiert ein neues Monster. Dieses wird zu dem Monster-Array hinzugefügt.
// Ruft eine Funktion auf, welche dann das entsprechende HTML erzeugt.
function generateMonster() {
    let RndMnstrNmbr = getRNGNumber(3) + 1; //Generiert eine Zahl zwischen 0-2 + 1
    if (RndMnstrNmbr == 1) //Wenn die Zahl = 1 ist
     {
        console.log("Eine Diva ist erschienen!");
    }
    else {
        console.log("Es sind " + RndMnstrNmbr + " Diven erschienen!");
    }
    for (let i = 0; i < RndMnstrNmbr; i++) //Wenn die Zahl kleiner als i ist erhöhe i um 1
     {
        let newMonsterDifficulty = generateMonsterDifficulty();
        let newMonsterAge = generateMonsterAge();
        let newMonsterWeapon = generatedMonsterWeapon();
        let newMonsterImage = generateMonsterImage();
        let newMonsterName = generateMonsterName();
        let newMonsterHP = generateMonsterHealthPoints();
        let newMonsterXP = generateMonsterXP();
        let newMonsterModifier = generateMonsterModifer();
        let newMonster = {
            monsterAge: newMonsterAge,
            monsterDifficulty: newMonsterDifficulty,
            monsterWeapon: newMonsterWeapon,
            monsterImage: newMonsterImage,
            monsterName: newMonsterName,
            monsterHealthPoints: newMonsterHP,
            monsterExperience: newMonsterXP,
            monsterModifier: newMonsterModifier,
        };
        monsterArray.push(newMonster); // Monster wird erst in diesem Schritt zu dem Array hinzugefügt 
    }
    updateHTML();
}
function updateHTML() {
    clearMonsterCell();
    monsterGenerateHTMLAll();
    console.log("Die Aktuelle Divenanzahl ist: " + getMonsterCount());
}
function getMonsterCount() {
    let monsterCnt_html = document.getElementById("wrapper").getElementsByTagName("div").length - 1; //Zählt die Div's innerhalb des Elements mit der ID "wrapper" - 1 (MonsterholdingCell)
    console.log("Im HTML Dokument befinden sich " + monsterCnt_html + " Div's von Diven");
    return monsterArray.length;
}
function clearMonsterCell() {
    let monsterHoldingDiv = document.getElementById("monsterHoldingCell");
    while (monsterHoldingDiv.firstChild) {
        monsterHoldingDiv.removeChild(monsterHoldingDiv.firstChild);
    }
}
function monsterGenerateHTMLAll() {
    for (let i = 1; i <= monsterArray.length; i++) {
        monsterGenerateHTML(i);
    }
}
// Generiert HTML-Elemente, welche dann einem Element untergeordnet werden. Erzeugt ebenfalls einen Event-Listener auf dem Button.
function monsterGenerateHTML(operator) {
    let holdingDiv = document.createElement("div"); // Erstelle ein neues HTML-Element vom typ <div>. Es ist jedoch noch nicht zu sehen!
    holdingDiv.setAttribute("id", "monster" + operator); // Die ID jedes neu-erstellten Monsters entspricht der aktuellen Array-Länge.
    holdingDiv.setAttribute("class", "monster"); // Klasse für Visuals.
    document.getElementById(monsterHolder).appendChild(holdingDiv); // Das HTML-Element muss erst noch zu einem Objekt hinzugefügt werden, in diesem Fall mit der id "monsterHoldingCell"
    let monsterName = document.createElement("p"); // Generiere einen <p>
    monsterName.innerHTML = monsterArray[operator - 1].monsterName; // Inhalt des <p>: Monster-Name des letzten Monsters im Array.
    holdingDiv.appendChild(monsterName); // Füge das <p> zum HTML-Dokument hinzu, indem es dem holding-Div angefügt wird.
    let monsterMod = document.createElement("p"); // Generiere einen <p>
    monsterMod.innerHTML = monsterArray[operator - 1].monsterModifier[0] + ", " + monsterArray[operator - 1].monsterModifier[1]; // Inhalt des <p>: Monster-Modifizierer null und eins
    holdingDiv.appendChild(monsterMod); // Füge das <p> zum HTML-Dokument hinzu, indem es dem holding-Div angefügt wird.
    let monsterWp = document.createElement("p");
    monsterWp.innerHTML = monsterArray[operator - 1].monsterWeapon;
    holdingDiv.appendChild(monsterWp);
    let monsterImg = document.createElement("img"); // Erstelle ein <img>-Element
    monsterImg.setAttribute("src", monsterArray[operator - 1].monsterImage); // Der Pfad für das Bild muss über setAttribute festgelegt werden. Der Bildpfad kann natürlich auch anders aussehen.
    monsterImg.setAttribute("alt", "Diva"); // Das alt für das Bild wird hier festgelegt.
    holdingDiv.appendChild(monsterImg); // Füge das Bild zu dem holding-div hinzu (<div>, welche ein paar Zeilen zuvor erstellt worden ist)
    let monsterBtn = document.createElement("BUTTON"); // Erstelle ein <button>-Element
    monsterBtn.innerHTML = "Monster bekämpfen!"; // Verändere den Inhalt des HTML-Elementes. Der genaue Text ist dabei euch überlassen.
    holdingDiv.appendChild(monsterBtn); // Füge den Button zu dem holding-div hinzu.
    // TODO: operator = 0!
    monsterBtn.addEventListener(// Füge dem Monster eine Funktion hinzu.
    'click', function () {
        fightMonster(operator - 1); // Wenn das Monster erstellt wird erhält die Funktion einen Parameter, welcher der aktuellen Anzahl entspricht.
    }, false); // Ignoriert das false.
}
// Muss mit einer Zahl aufgerufen werden: getRNGNumber(5); // Liefert eine ganze Zahl zwischen 0 bis 4 zurück.
function getRNGNumber(_maxNumber) {
    return Math.floor(Math.random() * _maxNumber); //Generiert eine Zahl zwischen 0 und 1, multipliziert mit maxNumber und rundet diese 
}
// Diese Funktion gibt einen zusammengewürfelten Namen zurück.
// Wird für die Monster-generierung verwendet!
// Liefert einen zusammengesetzten String zurück.
function generateMonsterName() {
    let generatedMonsterName = ""; // Erstelle einen leeren String für das Monster
    // Monster-Vorname
    // Mathematik! Hier wird eine zufällig-generierte Zahl benötigt.
    let rngNumber = getRNGNumber(prefix.length); // Der Rückgabewert der Funktion wird hier verwendet um den entsprechenden Teil des Namens (hier: Anfang) zu generieren.
    generatedMonsterName = prefix[rngNumber]; // Füge den Monsternamen zusammen: nimm aus dem entsprechenden Array mit der zufallsgenerierten Zahl den entsprechenden Eintrag.
    // Monster-Mittelname
    rngNumber = getRNGNumber(monsterName.length); // Der Rückgabewert der Funktion wird hier verwendet um den entsprechenden Teil des Namens (hier: Mitte) zu generieren.
    generatedMonsterName += monsterName[rngNumber]; // Füge den Monsternamen zusammen: nimm aus dem entsprechenden Array mit der ZUFALLSGENERIERTEN Zahl den entsprechenden Eintrag.
    // Monster-Titel
    rngNumber = getRNGNumber(suffix.length); // Der Rückgabewert der Funktion wird hier verwendet um den entsprechenden Teil des Namens (hier: Ende) zu generieren.
    generatedMonsterName += suffix[rngNumber]; // Füge den Monsternamen zusammen: nimm aus dem entsprechenden Array mit der zufallsgenerierten Zahl den entsprechenden Eintrag.
    return generatedMonsterName;
}
//Diese Funktion gibt die Waffe des Monsters aus                                            <-- Neu
//Liefert eine zufällig ausgewählte Waffe
function generatedMonsterWeapon() {
    let generatedMonsterWeapon = "";
    generatedMonsterWeapon = monsterWeapon[getRNGNumber(monsterWeapon.length)];
    return generatedMonsterWeapon;
}
// Wird für die Erstellung der Monster-Schwierigkeit aufgerufen.                                 <-- Neu 
// Liefert eine variierende Zahl zurück.
function generateMonsterDifficulty() {
    // Diese Funktion gibt eine zufällige ganze Zahl (zwischen 0 und 20) + 1 zurück.
    let tempMonsterDf = 1 + getRNGNumber(20);
    return tempMonsterDf;
}
// Wird für die Erstellung des Alters des Monsters aufgerufen.                                  <-- Neu
// Liefert eine variierende Zahl zurück.
function generateMonsterAge() {
    // Diese Funktion gibt eine zufällige ganze Zahl (zwischen 0 und 400) + 22 zurück.
    let tempMonsterAge = 22 + getRNGNumber(400);
    return tempMonsterAge;
}
//Wird für die Auswahl eines Bildes aufgerufen                                              <-- Neu
//Liefertein zufälliges Bild        
function generateMonsterImage() {
    let rngNumber = getRNGNumber(monsterImage.length);
    return monsterImage[rngNumber];
}
// Wird für die Monster-Lebenspunkte aufgerufen.
// Liefert eine variierende Zahl zurück.
function generateMonsterHealthPoints() {
    // Diese Funktion gibt eine zufällige ganze Zahl (zwischen 0 und 10) + 1 zurück.
    let tempMonsterHP = 1 + getRNGNumber(10);
    return tempMonsterHP;
}
// Wird für die Erstellung der Monster-Lebenspunkte aufgerufen.
// Liefert eine variierende Zahl zurück.
function generateMonsterXP() {
    // Diese Funktion gibt eine zufällige ganze Zahl (zwischen 0 und 500) + 100 zurück.             <-- von 350 auf 500 erhöht
    let tempMonsterXP = 100 + getRNGNumber(500);
    console.log("Die gespawnte Diva gibt " + tempMonsterXP + "xp!");
    return tempMonsterXP;
}
// Wird für die Erstellung der Monster-Modifizierer aufgerufen.
// Liefert ein Array mit zwei Einträgen zurück.
function generateMonsterModifer() {
    let tempMonsterMod = []; // Initialisiere ein leeres Array (verhindert Folge-Fehler)
    tempMonsterMod[0] = monsterModifers[getRNGNumber(monsterModifers.length)]; // Setze Schublade 0 des Arrays auf einen Wert.
    tempMonsterMod[1] = monsterModifers[getRNGNumber(monsterModifers.length)]; // Setze Schublade 1 des Arrays auf einen Wert.
    return tempMonsterMod; // Gebe das hier zusammengesetzte Array wieder zurück.
}
// Aufgerufen, wenn man auf den Button klickt.
// Der Spieler kämpft gegen das entsprechende Monster. Er erhält dann Erfahrungspunkte.
function fightMonster(_index) {
    console.log("Spieler kämpft gegen Monster und gewinnt!"); // Ohne Logik mit if/else ist so etwas wie ein Kampf nicht leicht umzusetzen.
    console.log("Das Monster weigert sich zu verschwinden."); // Wird nächste Stunde erweitert.
    playerXP += monsterArray[_index].monsterExperience; // _index ist in diesem Fall die Länge des Arrays - allerdings zählt der Computer beginnend von null, nicht eins! Deshalb _index-1.
    monsterArray.splice(_index, 1);
    updatePlayerLevel();
    updateHTML();
}
// Aufgerufen, um das HTML-Element, welches das Spieler-Level darstellt, zu erneuern.
function updatePlayerLevel() {
    let tempLevel = Math.floor(playerXP / playerXPperLevel); // Spieler-Level = XP / XPproLevel
    document.getElementById("xpCounter").innerHTML = "Player-Level: " + tempLevel + " (XP: " + playerXP % playerXPperLevel + " / " + playerXPperLevel + ")"; // Baue den String für die Spieler-Info zusammen
    console.log("Spieler " + playerName + " hat nun Level " + tempLevel + " mit " + playerXP + " (" + playerXPperLevel + " pro Level)"); // Spieler-Level in der Konsole.
}
//# sourceMappingURL=Dungeon-Script.js.map
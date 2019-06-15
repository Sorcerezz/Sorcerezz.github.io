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
let Images = ["Bilder/Monster (1).png", "Bilder/Monster (2).png", "Bilder/Monster (3).png", "Bilder/Monster (4).png", "Bilder/Monster (5).png", "Bilder/Monster (6).png", "Bilder/Monster (7).png", "Bilder/Monster (8).png"]; // length = 8, da 8 Einträge. Von 0-7.
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
/*Die Hauptfunktion, um ein Monster zu erstellen. Wird von einem Button ausgerufen.Generiert ein neues Monster. Dieses wird zu dem Monster-Array hinzugefügt.*/
function generateMonster() {
    let RandomMonster = getRNGNumber(3) + 1; //Generiert eine Zufällige Zahl zwischen 0-2+1
    console.log("Es ist/sind " + RandomMonster + " gespawnt");
    //for-Schleife führt den Code so oft aus wie die Zahl groß ist
    for (let i = 0; i < RandomMonster; i++) {
        let newMonsterDifficulty = generateMonsterDifficulty(); // Eigens-gebaute Funktion, welche eine Zahl zurück gibt.
        let newMonsterAge = generateMonsterAge();
        let newMonsterWeapon = generatedMonsterWeapon();
        let newImage;
        let newMonsterName = generateMonsterName(); // Eigens-gebaute Funktion, welche einen string zurück gibt.
        let newMonsterHP = generateMonsterHealthPoints(); // Eigens-gebaute Funktion, welche eine Zahl zurück gibt.
        let newMonsterXP = generateMonsterXP(); // Eigens-gebaute Funktion, welche eine Zahl zurück gibt.
        let newMonsterModifier = generateMonsterModifer(); // Eigens-gebaute Funktion, welche ein string-Array zurück gibt.
        let newMonster = {
            monsterAge: newMonsterAge,
            monsterDifficulty: newMonsterDifficulty,
            monsterWeapon: newMonsterWeapon,
            monsterImage: newImage,
            monsterName: newMonsterName,
            monsterHealthPoints: newMonsterHP,
            monsterExperience: newMonsterXP,
            monsterModifier: newMonsterModifier,
        };
        monsterArray.push(newMonster); // Monster wird erst in diesem Schritt zu dem Array hinzugefügt 
        if (monsterArray.length != 0) {
            console.log(monsterArray[monsterArray.length - 1].monsterExperience); // Man kann nur auf Array-Teile zugreifen, welche definiert sind.
        }
    }
    monsterGenerateHTML(); // Triggere die Generierung von HTML
}
function monsterGenerateHTML() {
    let holdingDiv = document.createElement("div"); // Erstelle ein neues HTML-Element vom typ <div>. Es ist jedoch noch nicht zu sehen!
    holdingDiv.setAttribute("id", "monster" + monsterArray.length);
    holdingDiv.setAttribute("class", "monster"); // Klasse für Visuals.
    document.getElementById(monsterHolder).appendChild(holdingDiv); // Das HTML-Element muss erst noch zu einem Objekt hinzugefügt werden, in diesem Fall mit der id "monsterHoldingCell"
    let monsterName = document.createElement("p"); // Generiere einen <p>
    monsterName.innerHTML = monsterArray[monsterArray.length - 1].monsterName; // Inhalt des <p>: Monster-Name des letzten Monsters im Array.
    holdingDiv.appendChild(monsterName); // Füge das <p> zum HTML-Dokument hinzu, indem es dem holding-Div angefügt wird.
    let monsterMod = document.createElement("p");
    monsterMod.innerHTML = monsterArray[monsterArray.length - 1].monsterModifier[0] + ", " + monsterArray[monsterArray.length - 1].monsterModifier[1]; // Inhalt des <p>: Monster-Modifizierer die unten definiert werden
    holdingDiv.appendChild(monsterMod);
    let monsterImg = document.createElement("img");
    monsterImg.setAttribute("src", Images[generatedImage()]);
    monsterImg.setAttribute("alt", "Diva");
    holdingDiv.appendChild(monsterImg);
    let monsterWp = document.createElement("p");
    monsterWp.innerHTML = monsterArray[monsterArray.length - 1].monsterWeapon;
    holdingDiv.appendChild(monsterWp);
    let monsterBtn = document.createElement("BUTTON"); // Erstelle ein <button>-Element
    monsterBtn.innerHTML = "Monster bekämpfen!";
    holdingDiv.appendChild(monsterBtn);
    let monsterCount = monsterArray.length; // Die aktuelle Anzahl vorhandener Monster, zudem auch die neue Zahl für das Monster-Array.
    console.log("Aktuelle Anzahl an Monstern: " + monsterCount + 1);
    monsterBtn.addEventListener(// Füge dem Monster eine Funktion hinzu.
    'click', function () {
        fightMonster(monsterCount); // Wenn das Monster erstellt wird erhält die Funktion einen Parameter, welcher der aktuellen Anzahl entspricht.
    }, false); // Ignoriert das false.
}
// Wird für den Zugriff auf eine zufällige Stelle in einem Array aufgerufen.
// [ ] Optionale Aufgabe: verkleinere diesen Code auf eine Zeile mit nur einem Semikolon!
// Muss mit einer Zahl aufgerufen werden: getRNGNumber(5); // Liefert eine ganze Zahl zwischen 0 bis 4 zurück.
function getRNGNumber(_maxNumber) {
    return Math.floor(Math.random() * _maxNumber); //Generiert eine Zahl zwischen 0 und 1, multipliziert mit maxNumber und rundet diese 
}
function generateMonsterName() {
    let generatedMonsterName = ""; // Erstelle einen leeren String für den Monsternamen
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
function generatedMonsterWeapon() {
    let generatedMonsterWeapon = "";
    generatedMonsterWeapon = monsterWeapon[getRNGNumber(monsterWeapon.length)];
    return generatedMonsterWeapon;
}
function generateMonsterDifficulty() {
    // Diese Funktion gibt eine zufällige ganze Zahl (zwischen 0 und 20) + 1 zurück.
    let tempMonsterDf = 1 + getRNGNumber(20);
    return tempMonsterDf;
}
function generateMonsterAge() {
    // Diese Funktion gibt eine zufällige ganze Zahl (zwischen 0 und 400) + 22 zurück.
    let tempMonsterAge = 22 + getRNGNumber(400);
    return tempMonsterAge;
}
function generatedImage() {
    let tempImage = getRNGNumber(Images.length);
    return tempImage;
}
function generateMonsterHealthPoints() {
    // Diese Funktion gibt eine zufällige ganze Zahl (zwischen 0 und 10) + 1 zurück.
    let tempMonsterHP = 1 + getRNGNumber(10);
    return tempMonsterHP;
}
function generateMonsterXP() {
    // Diese Funktion gibt eine zufällige ganze Zahl (zwischen 0 und 500) + 100 zurück.             <-- von 350 auf 500 erhöht
    let tempMonsterXP = 100 + getRNGNumber(500);
    return tempMonsterXP;
}
function generateMonsterModifer() {
    let tempMonsterMod = []; // Initialisiere ein leeres Array (verhindert Folge-Fehler)
    tempMonsterMod[0] = monsterModifers[getRNGNumber(monsterModifers.length)]; // Setze Schublade 0 des Arrays auf einen Wert.
    tempMonsterMod[1] = monsterModifers[getRNGNumber(monsterModifers.length)]; // Setze Schublade 1 des Arrays auf einen Wert.
    return tempMonsterMod; // Gebe das hier zusammengesetzte Array wieder zurück.
}
function fightMonster(_index) {
    console.log("Spieler kämpft gegen Monster und gewinnt!"); // Ohne Logik mit if/else ist so etwas wie ein Kampf nicht leicht umzusetzen.
    console.log("Das Monster weigert sich zu verschwinden."); // Wird nächste Stunde erweitert.
    playerXP += monsterArray[_index - 1].monsterExperience; // _index ist in diesem Fall die Länge des Arrays - allerdings zählt der Computer beginnend von null, nicht eins! Deshalb _index-1.
    updatePlayerLevel();
}
function updatePlayerLevel() {
    let tempLevel = Math.floor(playerXP / playerXPperLevel); // Spieler-Level = XP / XPproLevel
    document.getElementById("xpCounter").innerHTML = "Player-Level: " + tempLevel + " (XP: " + playerXP + " / " + playerXPperLevel + ")"; // Baue den String für die Spieler-Info zusammen
    console.log("Spieler " + playerName + " hat nun Level " + tempLevel + " mit " + playerXP + " (" + playerXPperLevel + " pro Level)"); // Spieler-Level in der Konsole.
}
//# sourceMappingURL=Dungeon-Script test.js.map
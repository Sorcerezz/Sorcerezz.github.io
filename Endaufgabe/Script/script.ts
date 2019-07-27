console.log("Die Seite lädt noch.")
/* ~~ Karte ~~ */
interface Karte 
{
    KartenBesonderheit : string;                                // Gibt an welche Spezialfunktion die Karte hat ("+2", oder "none")
    KartenWert : number;
    KartenFarbe : string;    
}

/* ~~ Arrays ~~ */
let SpielerHand : Karte[] = [];                           
let GegnerHand : Karte[] = [];
let ZugDeck : Karte[] = [];
let AblageDeck : Karte[] = [];
 
/* ~~ Variablen ~~ */
let SpielerAmZug : boolean = true;                            // Gibt an ob der Player am Zug ist.
let GegnerHandSichtbar : boolean = false;                       // Gibt an ob die Karten des Computers sichtbar sind.

/* ~~ Onload ~~ */
window.onload = function () 
{
    console.log(" Die Webseite hat fertig geladen!");
    console.log("Das Spiel wird vorbereitet.")
    Generierung();
    ZugDeckMischen();
    Austeilen();

    ErneuereHTML();
    console.log("Du kannst jetzt spielen!")
    console.log("---------------------------------------------");
} 

/* ~~ Funktionen ~~ */
    /* ~~ Hintergrundfunktionen ~~ */
function Generierung() 
{
    let neuerKartenWert : number;            
    let neueKartenFarbe : string;
    let neueKartenBesonderheit : string = "none";  
    // Schleifen die Karten mit den Werten 1-9, in vier verschiedenen Farben erzeugen.
    for(let w : number = 1; w <= 9; w++)
    {
        for(let f : number = 0 ; f < 4; f++)
        {
            neuerKartenWert = w;
            switch(f)
            {
                case 0: neueKartenFarbe = "Rot"; break;
                case 1: neueKartenFarbe = "Lila"; break;
                case 2: neueKartenFarbe = "Orange"; break;
                case 3: neueKartenFarbe = "Grün"; break;
            }
            let neueKarte: Karte = 
            {                                         
                KartenBesonderheit: "none",
                KartenWert: neuerKartenWert,
                KartenFarbe: neueKartenFarbe
            };
            ZugDeck.push(neueKarte);
        }                                  
    }
    for(let k : number = 0; k < 2; k++)
    {
        switch(k)
        {
            case 0: case 1: neueKartenBesonderheit = "Plus 2"; break;
        }
        let neueKarte: Karte = 
        {                                         
            KartenBesonderheit: neueKartenBesonderheit,
            KartenWert: 10,
            KartenFarbe: "Besonders"
        };
        ZugDeck.push(neueKarte);
    }
    console.log("- Die Karten wurden generiert.")             
}


function ZugDeckMischen()
{
    ZugDeck.sort                //sortiert nach + / -
    (function(a, b)
        {          
            return 0.5 - Math.random()          //zufällig + / - Zahl.
        }
    );
    console.log("- Die Karten wurden gemischt.")
}

function Austeilen()
{

    for(let i : number = 0; i < 8; i++)             //Teilt 8 Karten aus
    {
        GegnerHand.push(ZugDeck[0]);
        ZugDeck.splice(0, 1);
        
        SpielerHand.push(ZugDeck[0]);
        ZugDeck.splice(0, 1);
    }
    
    AblageDeck.push(ZugDeck[0]);
    ZugDeck.splice(0, 1);

    console.log("- Die Karten wurden ausgeteilt.")
}

    /* ~~ Vordergrundfunktionen ~~ */
function GeneriereSpielerHand(KartenNummer : number)
{
    let KartenDiv: HTMLElement = document.createElement("div");             
    KartenDiv.setAttribute("id", "SpielerKarte" + (KartenNummer + 1));                  
    KartenDiv.setAttribute("class", "Karte");    
    KartenDiv.addEventListener('click', function () { KarteSpielen(KartenNummer, SpielerAmZug); }, false); 
    document.getElementById("SpielerHand").appendChild(KartenDiv);                        
   
    let TempKartenWert : string = SpielerHand[KartenNummer].KartenWert + "";        //was steht auf der Karte
    switch(SpielerHand[KartenNummer].KartenBesonderheit)                            //Switch für ein case eigentlich nicht nötig - wusste aber nicht wie ich es sonst lösen soll, if hat nicht funktioniert
    {
        case "Plus 2" : TempKartenWert = "+2"; break;
    }

    let AnzuzeigenderWert: HTMLElement = document.createElement("p");               
    AnzuzeigenderWert.innerHTML = TempKartenWert +""; 
    AnzuzeigenderWert.setAttribute("class", SpielerHand[KartenNummer].KartenFarbe);
    KartenDiv.appendChild(AnzuzeigenderWert);
}

function GeneriereGegnerHand(KartenNummer : number)
{
    if(!GegnerHandSichtbar)             //VersteckteKarten
    {      
        let KartenDiv: HTMLElement = document.createElement("div");              
        KartenDiv.setAttribute("id", "GegnerKarte" + (KartenNummer + 1));                  
        KartenDiv.setAttribute("class", "VersteckteKarte");     
        document.getElementById("GegnerHand").appendChild(KartenDiv);  
    } 
    else                                //SichtbareKarten
    { 
        let KartenDiv: HTMLElement = document.createElement("div");              
        KartenDiv.setAttribute("id", "GegnerKarte" + (KartenNummer + 1));                  
        KartenDiv.setAttribute("class", "Karte");     
        document.getElementById("GegnerHand").appendChild(KartenDiv);   
        
        let tempCardValue: string = GegnerHand[KartenNummer].KartenWert + "";
        switch(GegnerHand[KartenNummer].KartenBesonderheit)
        {
            case "Plus 2": tempCardValue = "+2"; break;
        }
        
        let AnzuzeigenderWert: HTMLElement = document.createElement("p");               
        AnzuzeigenderWert.innerHTML = tempCardValue +""; 
        AnzuzeigenderWert.setAttribute("class", GegnerHand[KartenNummer].KartenFarbe);
        KartenDiv.appendChild(AnzuzeigenderWert);  
    }
}

function GeneriereAblageDeck(KartenNummer : number)
{  
    let KartenDiv: HTMLElement = document.createElement("div");              
    KartenDiv.setAttribute("id", "AbgelegteKarte" + (KartenNummer + 1));                  
    KartenDiv.setAttribute("class", "Karte");     
    document.getElementById("AblageDeck").appendChild(KartenDiv);    

    let TempKartenWert: string = AblageDeck[KartenNummer].KartenWert + "";
    switch(AblageDeck[KartenNummer].KartenBesonderheit)
    {
        case "Plus 2": TempKartenWert = "+2"; break;
    }
    
    let AnzuzeigenderWert: HTMLElement = document.createElement("p");               
    AnzuzeigenderWert.innerHTML = TempKartenWert +""; 
    AnzuzeigenderWert.setAttribute("class", AblageDeck[KartenNummer].KartenFarbe);
    KartenDiv.appendChild(AnzuzeigenderWert);
}

function GeneriereZugDeck()
{       
    let KartenDiv: HTMLElement = document.createElement("div");              
    KartenDiv.setAttribute("id", "ObersteKarte");                  
    KartenDiv.setAttribute("class", "VersteckteKarte");     
    KartenDiv.addEventListener('click', function () { KarteZiehen(SpielerAmZug); }, false); 
    document.getElementById("ZugDeck").appendChild(KartenDiv);
}

    /* ~~ Hintergrundfunktionen ~~ */
function GeneriereHTML() 
{
    for (let i: number = 0; i < GegnerHand.length; i++) 
    {
        GeneriereGegnerHand(i);
    }
    for (let j: number = 0; j < SpielerHand.length; j++) 
    {
        GeneriereSpielerHand(j);
    }
    for (let k: number = 0; k < AblageDeck.length; k++) 
    {
        GeneriereAblageDeck(k);
    }
    GeneriereZugDeck();
    console.log("- HTML wurde erstellt.")
}

function LoescheHTML() 
{      
    let LeerZuMachen: HTMLElement = document.getElementById("SpielerHand");
    let children: HTMLCollection = LeerZuMachen.children;
    let childCount: number = children.length;
    for (let i: number = 0; i < childCount; i++) 
    {                           
        if (LeerZuMachen.firstElementChild != null)                          
        LeerZuMachen.removeChild(LeerZuMachen.firstElementChild);
               
    }
    
    LeerZuMachen = document.getElementById("GegnerHand");
    children = LeerZuMachen.children;
    childCount = children.length;
    for (let i: number = 0; i < childCount; i++) 
    {                           
        if (LeerZuMachen.firstElementChild != null)                          
        LeerZuMachen.removeChild(LeerZuMachen.firstElementChild);       
    }

    LeerZuMachen = document.getElementById("ZugDeck");
    children = LeerZuMachen.children;
    childCount = children.length;
    for (let i: number = 0; i < childCount; i++) 
    {                           
        if (LeerZuMachen.firstElementChild != null)                          
        LeerZuMachen.removeChild(LeerZuMachen.firstElementChild);       
    }

    LeerZuMachen = document.getElementById("AblageDeck");
    children = LeerZuMachen.children;
    childCount = children.length;
    for (let i: number = 0; i < childCount; i++) 
    {                           
        if (LeerZuMachen.firstElementChild != null)                          
        LeerZuMachen.removeChild(LeerZuMachen.firstElementChild);       
    }
    console.log("- HTML wurde gelöscht.")
}

function ErneuereHTML()
{
    LoescheHTML();
    GeneriereHTML();
    console.log("HTML wurde erneuert.")
}

function KarteSpielen (GespielteKartenNummer : number, TempAmZug : boolean)     //Welche Karte gespielt werden soll und kann 
{                                              
    if (TempAmZug == true)      //Spieler will legen
    { 
        if((SpielerHand[GespielteKartenNummer].KartenWert == AblageDeck[AblageDeck.length - 1].KartenWert) ||  // Gleicher Wert?
            (SpielerHand[GespielteKartenNummer].KartenFarbe == AblageDeck[AblageDeck.length - 1].KartenFarbe) ||     // Gleiche Farbe?
            (AblageDeck[AblageDeck.length - 1].KartenBesonderheit != "none")||                                // Zuletzt gelegte Karte ist eine Sonderkarte?
            (SpielerHand[GespielteKartenNummer].KartenBesonderheit != "none"))
        {        //Sonderkarte? -> Funktion ausführen
            NutzeKartenBesonderheit(SpielerHand[GespielteKartenNummer],SpielerAmZug);

            AblageDeck.push(SpielerHand[GespielteKartenNummer]);        //Ausspielen
            SpielerHand.splice(GespielteKartenNummer, 1);
            ErneuereHTML();
            
            if (SpielerHand.length < 1)         //Keine Karten -> spiel beenden
            {
                Spielende(true);
            }
            else            //Zugwechsel
            {
                setTimeout(GegnerAmZug, 350);       //Verzögerung, wäre sonst zu schnell für den Menschen
            }    
        }
    } 
    else        //Gegner will legen
    {                     
        if ((GegnerHand[GespielteKartenNummer].KartenWert == AblageDeck[AblageDeck.length - 1].KartenWert) ||
            (GegnerHand[GespielteKartenNummer].KartenFarbe == AblageDeck[AblageDeck.length - 1].KartenFarbe) ||
            (AblageDeck[AblageDeck.length - 1].KartenBesonderheit != "none")||
            (GegnerHand[GespielteKartenNummer].KartenBesonderheit != "none"))
        {       //Sonderkarte? -> Funktion ausführen
            NutzeKartenBesonderheit(GegnerHand[GespielteKartenNummer],SpielerAmZug);

            AblageDeck.push(GegnerHand[GespielteKartenNummer]);             //Ausspielen
            GegnerHand.splice(GespielteKartenNummer, 1);
            ErneuereHTML();

            if (GegnerHand.length < 1)          //Keine Karten -> spiel beenden
            {   
                Spielende(false);
            }
            else            //Zugwechsel
            {
                SpielerAmZug = true;
            }
        }
    }
}

function KarteZiehen(TempAmZug : boolean)       //Karte ziehen
{
    if(ZugDeck.length < 1)      //ZugDeck leer -> Ablagestapel mischen 
    {
        NeuMischen();
        ErneuereHTML();
    }
    else if (TempAmZug == true)          //Spieler zieht Karte -> Zugwechsel
    {                    
        SpielerHand.push(ZugDeck[0]);
        ZugDeck.splice(0, 1);
        setTimeout(GegnerAmZug, 350);
    } 
    else                                //Gegner zieht Karte -> Zugwechsel
    {
        GegnerHand.push(ZugDeck[0]);
        ZugDeck.splice(0, 1);
        SpielerAmZug = true;
    }
    ErneuereHTML();
}

function GegnerAmZug()
{
    SpielerAmZug = false;
    for(let i : number = 0; (i < GegnerHand.length) && (SpielerAmZug == false); i++)        //Versucht jede Karte
    {
        KarteSpielen(i, SpielerAmZug);
    }
    if(SpielerAmZug == false)       //Keine Karte legbar -> zieh eine
    {
        KarteZiehen(SpielerAmZug);
    }
    SpielerAmZug = true;        //Zugwechsel
}







/////////////////////////////////////////////// ZUSATZ-FUNKTIONEN ///////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//---------------------------------------- Das Spiel wird beendet und ein neues Spiel wird begonnen ----------------------------------------//
// Parameter= Wurde das Spiel gewonnen oder Verloren
function Spielende( Gewonnen : boolean)
{
    if(Gewonnen)
    { 
        alert("Du hast gewonnen! Nochmal spielen?")
        console.log("Du hast gewonnen!")
    } 
    else
    {
        alert("Du hast verloren. Nochmal spielen?")
        console.log("Du hast verloren.")
    }

    while(GegnerHand.length > 0)    //Arrays leeren
    {
        GegnerHand.pop();
    }
    while(SpielerHand.length > 0) 
    {
        SpielerHand.pop();
    }
    while(ZugDeck.length > 0) 
    {
        ZugDeck.pop();
    }
    while(AblageDeck.length > 0) 
    { 
        AblageDeck.pop();
    }

    Generierung();
    ZugDeckMischen();
    Austeilen();
    ErneuereHTML();
    
    SpielerAmZug = true;
}

function NeuMischen()           //ZugDeck leer -> AblageDeck neu Mischen
{
    let topCard : Karte = AblageDeck[AblageDeck.length - 1];        //Oberste/letzte Karte merken

    while(AblageDeck.length > 0)
    {
        ZugDeck.push(AblageDeck[AblageDeck.length - 1])
        AblageDeck.pop();
    }
    AblageDeck.push(topCard);

    ZugDeckMischen();
}

function NutzeKartenBesonderheit(TempKarte : Karte, TempAmZug : boolean)
{
    if(TempAmZug)           // Wenn der Player am Zug ist.
    {        
        switch(TempKarte.KartenBesonderheit)        //+2 Karten auf die Hand
        {        
            case "Plus 2":
                for(let i : number = 0; i < 2; i++)
                {
                if(ZugDeck.length < 1)NeuMischen();
                GegnerHand.push(ZugDeck[0]);
                ZugDeck.splice(0, 1);
                }
            break;
        }

    } 
    else                        // Wenn der Computer am Zug ist.
    {                 
        switch(TempKarte.KartenBesonderheit)
        {
            case "Plus 2":
                for(let i : number = 0; i < 2; i++)
                {
                    if(ZugDeck.length < 1)NeuMischen();
                    SpielerHand.push(ZugDeck[0]);
                    ZugDeck.splice(0, 1);
                }
            break;
        }
    }
    ErneuereHTML();
}

function DreheGegnerHand()              //Verstecke die Karten
{
    GegnerHandSichtbar = !GegnerHandSichtbar;
    ErneuereHTML();
}

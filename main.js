
//Så här stora ska rutorna vara på spelplanen
let squareSize = 55;

let x;
let y;
let numHitsToWin
let aiNumHitsToWin
let playerCounter = 0

var checkIfThereIsBoat
var start;
/*
 *
 * id = "s78"
 * y = id[1];
 * x = id[2];
 * s-4-7
 * s-11-15  
 * Detta är vår spelplan. Den motsvaras av en helt vanlig array med siffror i.
 * Siffran 0 betyder att där finns vatten.
 * Siffran 1 betyder att där finns ett (hemligt!) skepp som ska sänkas. Alltså, från början är det hemligt för spelaren...
 *
 * Varje ruta på spelplanen har ett eget id som motsvarar ett index i den här arrayen.
 * <div id=0 class="square"><img src="water.jpg" width="50"/></div>
 * <div id=1 class="square"><img src="water.jpg" width="50"/></div>
 * <div id=2 class="square"><img src="water.jpg" width="50"/></div>
 */


startGame();

function startGame(){
    start = confirm('Vad vill du spela mot? [Avbryt] Easy AI [OK] Hard AI');
    console.log ("selected" + start);
    if (start === true){
        $("#vilkenAI").text("Du spelar mot Hard AI nu.")
    } else {
        $("#vilkenAI").text("Du spelar mot Easy AI nu.")
    }
    
}

let length = prompt('Hur många rader vill du ha?')
let width = prompt('hur många kolumner vill du ha?')

let playermap = createGrid(length, width)
let aimap = createGrid(length, width)

function createGrid(rows, cols) {

    //skapar basic array
    var array = [];
    for (var i = 0; i < rows; i++) {
        //här deklareras att varje element i arrayen ska vara en array
        array[i] = [];

        for (var j = 0; j < cols; j++) {
            array[i][j] = 0;
        }
    }

    return array;

}
//Leta upp HTML-elementet med id = "status". 
function updateStatus(newStatusText){
    $("#status").text(newStatusText);  //Sätt en ny text där: T ex: "Tyvärr, du missade! Skjut igen!"
}

//När man har träffat alla skeppsrutor har man vunnit...
//Så många skeppsrutor finns det på kartan?... vi kollar... 

//Bygg upp kartan på spelplanen. Det börjar med vatten överallt.
buildMapPlayer(length, width);
buildMapAi(length, width);
let answer = false
let ai = 0

while(answer == false){

    alert('Placera ut en båt genom att mata in koordinater i rutorna och trycka på "Go".')
    answer = true

}

//Updaterade funktionen för funktionen frågar fortfarande efter alla båtar placerades.
function placeShipAnswer(){

    if(answer == true){
        if (destroyerCounter !== 1 && submarineCounter !== 1 && cruiserCounter !== 1 && battleshipCounter !== 1){
            answer = confirm('Vill du placera ut en båt till?')}
        else if (destroyerCounter == 1 && submarineCounter == 1 && cruiserCounter == 1 && battleshipCounter == 1){
            alert('Du har inga fler båtar att placera ut')
            document.getElementById("x-coord").value = ''
            document.getElementById("y-coord").value = ''
        }
        else {}
    }

    if(answer == false){
        aiNumHitsToWin = getNumberOfShipsOnPlayerMap(playermap)
        aiPlaceShips()
        numHitsToWin = getNumberOfShipsOnAiMap(aimap)
    }
}

function someFunction(){
    placeShips()
    placeShipAnswer()
}


/*
 * När vi klickar på ett element som har class="square", anropa då funktionen som heter shoot()!
 */
$(".aisquare").click(shoot);


/*
 * Någon skjuter på en ruta.
 * Vi använder $(this) för att få reda på vilken ruta.
 * Vi använder $(this).attr('id') för att få reda på vilket ID rutan har.
 * Varje ruta har ett eget id som motsvarar ett index i arrayen map.
 */
function shoot(){
    console.log("shoot function!");

    //Vilket id är det på den rutan vi just nu har skjutit på... 
    let id1 = $(this).attr('id1');
    let id2 = $(this).attr('id2');
    console.log(aiNumHitsToWin + ' ' + numHitsToWin)
  
    //Kolla om den här platsen på kartan innehåller 1. Då är det ett skepp! 
    //T ex... ifall id är 7, då är det index = 7 i arrayen, alltså map[7].
    if (aimap[id1][id2] != '0' && aimap[id1][id2] != '*'  && aimap[id1][id2] != 'X'){
        aimap[id1][id2] = '*'
        //Ja, det var ett skepp!  
        $(this).html(`<img src="ship.jpg" width="${squareSize}" height="${squareSize}"/>`);  //Uppdatera bilden till ett skepp!
        updateStatus("Träff! Skjut igen!"); //Uppdatera status-texten.
        checkSunkenShips(id1, id2)
        numHitsToWin--; //Vi kommer ett steg närmare att vinna!
    }
    else if(aimap[id1][id2] == '0'){
        aimap[id1][id2] = 'X'
        $(this).html(`<img src="miss.jpg" width="${squareSize}" height="${squareSize}"/>`);
        updateStatus("Tyvärr, du missade. Skjut igen!");
    }
    else if(aimap[id1][id2] == '*' || aimap[id1][id2] == 'X'){
        updateStatus("Du har redan skjutit här! Försök en annan plats!");
        shoot();
    }

    if (numHitsToWin<=0){
        updateStatus("Grattis, du har klarat spelet!")
        alert('Grattis! Du har sänkt alla skepp!')
    }
    chooseAI()
}
function chooseAI(){
if (start === true){
    console.log ("Du spelar mot Hard AI");
    playerHardAI();
  
} else {
    console.log ("Du spelar mot Easy AI");
    playerEasyAI();
    
}
}

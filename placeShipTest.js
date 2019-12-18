let gridWidth = prompt("Ställ in bredden på planen:");
let gridHeight = prompt("Ställ in höjden på planen:");

var gameGrid = createGrid(gridHeight, gridWidth);

randomCells()



//skapar tvådimensionell array
function createGrid (rows, cols){

    //skapar basic array
    var array = [];
     for (var i = 0; i < rows; i++){
         //här deklareras att varje element i arrayen ska vara en array
          array[i] = [];

         for ( var j = 0; j < cols; j++){
             array[i][j] = 0;

         }
     }
     return array;

 }

 function placeShips(){
     
    shipPositionA = prompt("Ange var skeppet ska börja")
    firstShipArray = []
    firstShipArray = shipPositionA.split(",")
    
    shipPositionB = prompt("Ange var skeppet ska sluta")
    secondShipArray = []
    secondShipArray = shipPositionB.split(",")
    
    x1 = parseInt(firstShipArray[0])
    y1 = parseInt(firstShipArray[1])
    x2 = parseInt(secondShipArray[0])
    y2 = parseInt(secondShipArray[1])

        if (x1 == x2 ){
            
            gameGrid[x1].fill("B", y1, y2+1)
            console.table(gameGrid);
        }
        else if (y1==y2) {

                for(var i =x1; i<= x2 ;i++){
                gameGrid[i].splice(y1,1,"B");                
            }
            console.table(gameGrid);
        }
    }



function randomCells(){

     for (var i = 0; i < gridHeight ; i++){

         for ( var j = 0; j < gridWidth ; j++){

            gameGrid[i][j] = "[ ]";   

         }
     }
     //Kallar på funktionen som tar in skeppets koordinater

     //visar spelplanen
     console.table(gameGrid);
}
placeShips()
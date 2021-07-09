var FirstManTurn = true;
var PlayerTurn = true;
var WhoWinWhereRL,WhoWinWhereTD;                                                                                    
var align = false;
var alreadyAlignStop = false;
var canPutChest = false;
function PlayerChoose(thisBlock){
    if(thisBlock.innerHTML != 'O' && thisBlock.innerHTML != 'X')canPutChest = true;
    if(canPutChest && alreadyAlignStop){
        if(FirstManTurn){
            alert('X 已經贏了');
        }
        else{
            alert('O 已經贏了');
        }
    }
    else if(canPutChest && !alreadyAlignStop){
        putChest(thisBlock); 
        VSpc();
    }
    canPutChest = false;    
}
function putChest(thisBlock){
    if(FirstManTurn && canPutChest){
           thisBlock.innerHTML = 'O';
         FirstManTurn = false;
     }
    else if(!FirstManTurn && canPutChest){
          thisBlock.innerHTML = 'X';
         FirstManTurn = true;
      }
     else{
         alert("這格是"+thisBlock.innerHTML); 
     }
    CheckWinner(thisBlock);
}
function CheckWinner(thisBlock){
    var debug;
     if(playerWin() == "LeftToRight"){
         alert(thisBlock.innerHTML + "在" + WhoWinWhereRL + '橫列獲勝');
         align = true;
        debug = 1;
     }
     else if(playerWin() == "TopToDown"){
        alert(thisBlock.innerHTML + "在" + WhoWinWhereTD + '直列獲勝');
        align = true;
         debug = 2;
     }
     else if(playerWin() == "LeftTopToRightDown"){
         alert(thisBlock.innerHTML + "左上至右下斜線獲勝");
        align = true;
         debug = 3;
    }
     else if(playerWin() == "RightTopToLeftDown") {
         alert(thisBlock.innerHTML + "右上至左下斜線獲勝");
         align = true;
        debug = 4;
     }  
     if(align){
         align = false;
         alreadyAlignStop = true;
         document.getElementById('restart').innerHTML = "press 'G' to restart";
         var background = document.querySelector('.BG');
         if(FirstManTurn){
             background.style = "background-color:darkgray";
         }
         else{
             background.style = "background-color: rgb(220, 238, 255);";
         }
     }
     else{
        if(CheckifTheMapisFull()){
            alert('已無空位');
            console.log(thisBlock.innerHTML);
            document.getElementById('restart').innerHTML = "press 'G' to restart";
         }
     }
}
//ifPlarerWin
function playerWin(){
    var IdOfTheBlock;
    var character = new Array();
    for(var i = 0;i < 3;i ++){
        character[i] = new Array();
        for(var j = 0;j < 3;j ++){
            IdOfTheBlock = "map" + i + j;
            character[i][j] = document.getElementById(IdOfTheBlock).innerHTML;
        }
    }
    //LeftToRight
    var column = 1;
    for(var i = 0;i < 3;i ++){
        if(character[i][0] == 'O' || character[i][0] == 'X'){
            if(character[i][0] == character[i][1] && character[i][1] == character[i][2]){
                WhoWinWhereRL = '第' + column;
                return "LeftToRight";
            }
        }
        column++;
    }
    //TopToDown
    var row = 1;
    for(var i = 0;i < 3;i ++){
        if(character[0][i] == 'O' || character[0][i] == 'X'){
             if(character[0][i] == character[1][i] && character[1][i] == character[2][i]){
                 WhoWinWhereTD = '第' + row;
                 return "TopToDown";
             }
        }
        row++;
    }
    if(character[1][1] == 'O' || character[1][1] == 'X'){
         //LeftTopToRightDown
        if(character[0][0] == character[1][1] && character[1][1] == character[2][2]){
            return "LeftTopToRightDown";
        }
        //RightTopToLeftDown
        if(character[0][2] == character[1][1] && character[1][1] == character[2][0]){
            return "RightTopToLeftDown";
        }
    }
}
//clearMap
function clearMap(){
    var IdOfTheBlock;
    for(var i = 0;i < 3;i ++){
        for(var j = 0;j < 3;j ++){
            IdOfTheBlock = "map" + i + j;
            document.getElementById(IdOfTheBlock).innerHTML = "&nbsp;";
        }
    }
    FirstManTurn = true;
    document.getElementById('restart').innerHTML = '';
    document.querySelector('.BG').style="background-color: cornsilk;";
    alreadyAlignStop = false;
}
//pressGtoRestart pressTtoVSpc
function restartHotKey(){
    if (event.keyCode==71) {
		clearMap();
	}
}
document.onkeydown=restartHotKey;
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
function VSpc(){
    if(!alreadyAlignStop && !CheckifTheMapisFull()){
        var IdOfTheBlock;
        var character = new Array();
        for(var i = 0;i < 3;i ++){
            character[i] = new Array();
            for(var j = 0;j < 3;j ++){
                IdOfTheBlock = "map" + i + j;
                character[i][j] = document.getElementById(IdOfTheBlock).innerHTML;
            }
        }   
        var row,column;
        row = getRandomInt(3);column = getRandomInt(3);
        while(character[row][column] ==  'O' || character[row][column] == 'X'){
            row = getRandomInt(3);column = getRandomInt(3);
        };
        document.getElementById('map'+row+column).innerHTML = 'X';
        for(var i = 0;i < 3;i ++){
            console.log(character[i]);
        }
        FirstManTurn = true;
        playerWin();
        CheckWinner(document.getElementById('map'+row+column));
    }
}
function CheckifTheMapisFull(){
    var IdOfTheBlock;
    for(var i = 0;i < 3;i ++){
        for(var j = 0;j < 3;j ++){
            IdOfTheBlock = "map" + i + j;
            if(document.getElementById(IdOfTheBlock).innerHTML != 'O' && document.getElementById(IdOfTheBlock).innerHTML != 'X'){
                return false;
            }
        }
    }
    return true;
}
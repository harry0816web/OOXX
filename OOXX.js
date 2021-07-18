var FirstManTurn = true;
var WhoWinWhereRL,WhoWinWhereTD;                                                                                    
var align = false;
var turns = 1;
var alreadyAlignStop = false;
function PlayerChoose(thisBlock){
    var canPutChest = false;
    if(thisBlock.innerHTML != 'O' && thisBlock.innerHTML != 'X')canPutChest = true;
    if(canPutChest && alreadyAlignStop){
        if(FirstManTurn){
            alert('X 已經贏了');
        }
        else{
            alert('O 已經贏了');
        }
    }
    if(!alreadyAlignStop){
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
            if(turns == 9){
                alert('已無空位');
                console.log(turns); 
                document.getElementById('restart').innerHTML = "press 'G' to restart";
            }
        }
        turns++;
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
                break;
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
                 break;
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
    turns = 1;
    document.querySelector('.BG').style="background-color: cornsilk;";
    alreadyAlignStop = false;
}
//pressGtoRestart pressTtoVSpc
function restartHotKey(){
    if (event.keyCode==71) {
		clearMap();
	}
    // else if(event.keyCode==84){

    // }
}
document.onkeydown=restartHotKey;

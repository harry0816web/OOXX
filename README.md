# OOXX遊戲
## 首頁
* 可以選擇要單人模式(與電腦對局)，或是雙人模式
## 下棋判斷
### 若這格已是O或X，則不能放棋，顯示錯誤訊息
### 若可以放棋
* 若還沒連線，則呼叫放棋函式
* 若已連線，顯示獲勝訊息
```javascript
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
   ```
## 下棋函式
### 將此格的innerHTML設為O或X，已是否為先手的回合(FirstManTurn)判斷，做完後檢查是否獲勝。
```javascript
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
```
## 檢查獲勝
### 分別以直行、橫列、斜線的方式遍歷存放棋子的二維陣列
* 若有人獲勝，顯示按G重新遊玩的訊息
* 若無人獲勝，判斷棋盤是否滿了，若棋盤已滿，顯示按G重新遊玩訊息
```javascript
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
 ```

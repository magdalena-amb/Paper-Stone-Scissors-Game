'use strict'
window.onload = function() {
  reset();
};

var btnPaper = document.getElementById('paper');
var btnStone = document.getElementById('stone');
var btnScissors = document.getElementById('scissors');
var btnReset = document.getElementById('reset');
var output = document.getElementById('output');
var result = document.getElementById('result');
var totalRounds;

var player1;
var player2;
var p1Score;
var p2Score;
var gameOver= true;

function reset(){
  gameOver = false;
  p1Score = 0;
  p2Score = 0;
  btnPaper.disabled = false;
  btnStone.disabled = false;
  btnScissors.disabled = false;
  log('');
  result.innerHTML= p1Score + ':' + p2Score;
  totalRounds = window.prompt('How many rounds do you wish to play?');
};

function move2(){
    var num = Math.round(Math.random()*2+1);
    if (num===1){
      player2='paper';
    }
    if (num===2){
      player2='stone';
    }
    if (num===3){
      player2='scissors';
    }
  };

function log(text){
  output.innerHTML='';
  text=text.toUpperCase();
  output.insertAdjacentHTML('afterbegin',text);
  };

var playerMove= function(event){

if (this.id=='paper') {
  player1='paper';
}
if (this.id== 'stone') {
  player1 ='stone';
}
if (this.id=='scissors') {
  player1='scissors';
}
console.log(player1);
move2();
console.log(player2);

  if (player1==player2){
    log('Both Players draw the same!');
  }
  else if (player1=='paper' && player2=='stone'){
    log('YOU WON! you played PAPER, computer played ROCK');
    p1Score++;
  }
  else if (player1=='stone' && player2=='scissors'){
    log('YOU WON: you played ROCK, computer played SCISSORS');
    p1Score++;
  }
  else if (player1=='scissors' && player2=='paper'){
    log('YOU WON: you played scissors, computer played paper');
    p1Score++;
  }
  else if (player2=='paper' && player1=='stone'){
    log('COMPUTER WON: you played stone, computer played paper');
    p2Score++;
    
  }
  else if (player2=='stone' && player1=='scissors'){
    log('COMPUTER WON: you played scissors, computer played paper');
    p2Score++;
  }
  else if (player2=='scissors' && player1=='paper'){
    log('COMPUTER WON: you played paper, computer played scissors');
    p2Score++;  
  };
  result.innerHTML= p1Score + ':' + p2Score;

  if (p1Score==totalRounds || p2Score==totalRounds) {
    gameOver = true;
    btnPaper.disabled = true;
    btnStone.disabled = true;
    btnScissors.disabled = true;
    if (p1Score > p2Score){
      result.insertAdjacentHTML('afterend','YOU WON THE GAME!!!');
    }
    else {
      result.insertAdjacentHTML('afterend','COMPUTER WON THE GAME!!!');
    }
    log("Game over, please press the new game button!"); 
  };
};


btnPaper.addEventListener('click', playerMove);
btnStone.addEventListener('click', playerMove);
btnScissors.addEventListener('click', playerMove);
btnReset.addEventListener('click', reset); 
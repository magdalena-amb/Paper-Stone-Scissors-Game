'use strict'

// window.onload = function() {
//   reset();
// };
var params = {
  //playerName : '',
  totalRounds  : 0,
  roundsPlayed : 0,
  p1RoundScore : 0,
  p2RoundScore : 0,
  p1Score      : 0,
  p2Score      : 0,
  p1Move       : null,
  p2Move       : null,
  progress     : []
}
var buttons = Array.from(document.querySelectorAll('.player-move'));
var btnReset = document.getElementById('reset');
var output = document.getElementById('output');
var result = document.getElementById('result');

//modal //

var newGameModal = document.getElementById('newGameModal');

//var startBtn = document.getElementById('startBtn');
var gameOverModal = document.getElementById('gameOverModal');
//var newGameModal = document.getElementById('newGameModal');
var progressTable = document.getElementById('progressTable');

var modals = document.querySelectorAll('.modal');

for(var i = 0; i < modals.length; i++){
  modals[i].addEventListener('click', function(event){
    event.stopPropagation();
  });
}

var showModal = function(event, modal, content){
  event.preventDefault();
  document.querySelector('#modal-overlay').classList.add('show');
      
  for(var i = 0; i < modals.length; i++){
  modals[i].classList.remove('show');
  }
 
  modal.classList.add('show');
  if(content){
    modal.querySelector('.content').textContent = content;
  }
  
};

// var modalLinks = document.querySelectorAll('.show-modal');
// for(var i = 0; i < modalLinks.length; i++){
//   modalLinks[i].addEventListener('click', showModal);
// } 
var hideModal = function(event){
  event.preventDefault();
  document.querySelector('#modal-overlay').classList.remove('show');
};
var closeButtons = document.querySelectorAll('.modal .close');
for(var i = 0; i < closeButtons.length; i++){
  closeButtons[i].addEventListener('click', hideModal);
}
document.querySelector('#modal-overlay').addEventListener('click', hideModal);




function reset(){
  //gameOver.innerHTML='';
  params.playerName = '';
  params.p1Score = 0;
  params.p2Score = 0;
  params.p1RoundScore = 0;
  params.p2RoundScore = 0;
  params.roundsPlayed = 0;
  params.p1Move = null;
  params.p2Move = null;
  params.progress = [];
  buttons.forEach(function (item) {
    item.disabled = false;
  });
  var tableParams = Array.from(document.querySelectorAll('.tableParams'));
  if (tableParams){
    for(i = 0; i < tableParams.length; i++){
      tableParams[i].classList.add('hide');
    }
  }
  log('');
  result.innerHTML= params.p1Score + ':' + params.p2Score;
  params.totalRounds = window.prompt('How many rounds do you wish to play?');
};

function move2(){
    var num = Math.round(Math.random()*2+1);
    if (num===1){
      params.p2Move = 'paper';
    }
    if (num===2){
      params.p2Move = 'stone';
    }
    if (num===3){
      params.p2Move = 'scissors';
    }
  };

function log(text){
  output.innerHTML='';
  text=text.toUpperCase();
  output.insertAdjacentHTML('afterbegin',text);
  };

var playerMove= function(event){
  params.roundsPlayed++;
  
  console.log(params.roundsPlayed);

  params.p1Move = this.getAttribute('data-move');

console.log(params.p1Move);
move2();
console.log(params.p2Move);

  if (params.p1Move==params.p2Move){
    log('Both Players draw the same!');
    params.p1RoundScore = 0;
    params.p2RoundScore = 0;
  }
  else if (params.p1Move == 'paper' && params.p2Move == 'stone'){
    log('YOU WON! you played PAPER, computer played ROCK');
    params.p1Score++;
    params.p1RoundScore = 1;
    params.p2RoundScore = 0;
  }
  else if (params.p1Move == 'stone' && params.p2Move == 'scissors'){
    log('YOU WON: you played ROCK, computer played SCISSORS');
    params.p1Score++;
    params.p1RoundScore = 1;
    params.p2RoundScore = 0;
  }
  else if (params.p1Move == 'scissors' && params.p2Move == 'paper'){
    log('YOU WON: you played scissors, computer played paper');
    params.p1Score++;
    params.p1RoundScore = 1;
    params.p2RoundScore = 0;
  }
  else if (params.p2Move == 'paper' && params.p1Move == 'stone'){
    log('COMPUTER WON: you played stone, computer played paper');
    params.p2Score++;
    params.p1RoundScore = 0;
    params.p2RoundScore = 1;
    
  }
  else if (params.p2Move =='stone' && params.p1Move =='scissors'){
    log('COMPUTER WON: you played scissors, computer played paper');
    params.p2Score++;
    params.p1RoundScore = 0;
    params.p2RoundScore = 1;
  }
  else if (params.p2Move =='scissors' && params.p1Move == 'paper'){
    log('COMPUTER WON: you played paper, computer played scissors');
    params.p2Score++;
    params.p1RoundScore = 0;
    params.p2RoundScore = 1; 
  };
  result.innerHTML= `${params.p1Score} : ${params.p2Score}`;

  params.progress.push({
    tRoundsPlayed : params.roundsPlayed,
    tPlayer1Move  : params.p1Move,
    tPlayer2Move  : params.p2Move,
    tRoundScore   : `${params.p1RoundScore} : ${params.p2RoundScore}`,
    tTotalScore   :`${params.p1Score} : ${params.p2Score}`
  })
  console.log(params.progress);
  var index = params.roundsPlayed - 1;
  var tableRow = `
  <tr class='tableParams'>
    <td>${params.progress[index].tRoundsPlayed}</td>
    <td>${params.progress[index].tPlayer1Move}</td>
    <td>${params.progress[index].tPlayer2Move}</td>
    <td>${params.progress[index].tRoundScore}</td>
    <td>${params.progress[index].tTotalScore}</td>
</tr>
  `;
  progressTable.insertAdjacentHTML("afterend", tableRow);

  if (params.p1Score == params.totalRounds || params.p2Score==params.totalRounds) {
    buttons.forEach(function (item) {
      item.disabled = true;
    });
    var modalContent;
    if (params.p1Score > params.p2Score){
      //gameOver.innerHTML='YOU WON THE GAME!!!';
      modalContent = 'YOU WON THE GAME!!!';

    }
    else {
      //gameOver.innerHTML='COMPUTER WON THE GAME!!!';
      modalContent = 'COMPUTER WON THE GAME!!!';
    } 
    //log("Game over, please press the new game button!");
    showModal(event, gameOverModal, modalContent);
  };
  
};

buttons.forEach(function (item) {
  item.addEventListener('click', playerMove);
});

//var playerName = document.getElementById('name').value;
//console.log(playerName);
// function startGame(){
//   reset();
//   params.totalRounds = document.getElementById('rounds').value;
//   playerName = document.getElementById('name').value;
// }
btnReset.addEventListener('click', reset);
 //btnReset.addEventListener('click', showModal(newGameModal));
//startBtn.addEventListener('click', startGame); 
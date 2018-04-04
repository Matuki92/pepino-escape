'use strict'

function main(){
  var game;
  var canvas;
  var maxWidth;
  var maxHeight;
  var ctx;
  var name;

  // DOM ELEMENTS ==========================================

  var mainContentElement = document.getElementById('content');
  var musicSwitch = document.getElementById('music');
  var audioElement = document.getElementById('audio-element');
  var startButton;
  var restartButton;
  var splashElement;
  var canvasElement;
  var endGameElement;
  var finalScore;
  var inputElement;
  var ulElement;
  var scoreTable;

  function handleMusicSwitch(){
    if (musicSwitch.innerText == 'Mute'){
      musicSwitch.innerText = 'Unmute';
      audioElement.muted = false;
    }
    else{
      musicSwitch.innerText = 'Mute';
      audioElement.muted = true;
    }
  }
  musicSwitch.addEventListener('click', handleMusicSwitch);

  // HTML ==================================================

  function createHtml(html) {
    var div = document.createElement('div');
    div.innerHTML = html;
    return div.children[0];
  }

  // DESTROY FUNCTIONS =====================================

  function destroySplash() {
    startButton.removeEventListener('click', destroySplash);
    splashElement.remove();
    gameScreen();
  };
  function destroyCanvas() {
    canvas.removeEventListener('mousemove', destroyCanvas);
    canvasElement.remove();
    endGame();
  }
  function destroyEndGame() {
    restartButton.removeEventListener('click', destroyEndGame);
    endGameElement.remove();
    buildSplash();
  }

  // =======================================================
  // SPLASH SCREEN =========================================

  function inputHandler(event){

    if (event.key == 'Enter' && inputElement.value != ''){
      
      name = inputElement.value;

      startButton.setAttribute('style','display:default');
      inputElement.removeEventListener('keypress', inputHandler);
      inputElement.setAttribute('style', 'display:none');
    }  
  }

  function buildSplash() {
    splashElement = createHtml(`<div id="splash-container">   
      <h1>Game Title</h1>
      <p>Help Kiwi avoid the cucumbers by moving the pointer over the game screen.</p>
      <input id="insert-name" placeholder="Insert Your Name Here" style="display:default">
      <button id="start-button" style="display:none">Start Game</button>
  </div>`);
    mainContentElement.appendChild(splashElement);
    
    inputElement = document.getElementById('insert-name');
    startButton = document.getElementById('start-button');

    inputElement.addEventListener('keypress', inputHandler);
    startButton.addEventListener('click', destroySplash);
  }

  // GAME SCREEN ===========================================

  // MOUSE POS INSIDE CANVAS =====================

  function gameScreen(){
    canvasElement = createHtml(`<canvas id="canvas" width="1000" height="800"></canvas>`);
    mainContentElement.appendChild(canvasElement);
    
    // CANVAS ==
    canvas = document.getElementById('canvas');
    maxWidth = Number(canvas.getAttribute('width'));
    maxHeight = Number(canvas.getAttribute('height'));
    ctx = canvas.getContext('2d');
    // ========

    game = new Game(name, canvas, ctx, maxWidth, maxHeight);
    game.end(function(){
      destroyCanvas();
    });
    game.makeItRain();  
    
    game.frame();
  } 

  // END GAME =============================================

  function endGame(){
    endGameElement = createHtml(`<div id="endgame-container">
      <h1>Game Over</h1>
      <p>You scored
        <span id="final-score"></span> points.</p>
      <button id="restart-button">Back to Start</button>
    </div>`);
    mainContentElement.appendChild(endGameElement);
    
    restartButton = document.getElementById('restart-button');
    finalScore = document.getElementById('final-score');
    ulElement = document.getElementById('score-board');

    finalScore.innerText = game.player.score;

    scoreTable = createHtml('<li></li>');
    ulElement.appendChild(scoreTable);
    scoreTable.innerText = game.player.name + ' - ' + game.player.score + ' points';
    
    restartButton.addEventListener('click', destroyEndGame);
  }
  buildSplash();
}

// LOAD ==================================================

window.addEventListener('load', main);





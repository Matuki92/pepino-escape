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
  var ulElement = document.getElementById('score-board');
  var startButton;
  var restartButton;
  var splashElement;
  var canvasElement;
  var endGameElement;
  var finalScore;
  var inputElement;

  // BACKGROUND MUSIC =====================================

  function handleMusicSwitch(){
    if (musicSwitch.innerText == 'Unmute sound'){
      musicSwitch.innerText = 'Mute sound';
      audioElement.muted = false;
    }
    else{
      musicSwitch.innerText = 'Unmute sound';
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
  var scores = new Scores(ulElement, createHtml);

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
      <h1>Pepino Escape</h1>
      <p>Cucumbers have invaded the planet <br> and forced Kiwi to leave. <br>
      Avoid them by moving the pointer over the game screen.</p>
      <input id="insert-name" placeholder="Insert Your Name Here" style="display:default">
      <button id="start-button" style="display:none">Start Game</button>
  </div>`);
    mainContentElement.appendChild(splashElement);
    
    inputElement = document.getElementById('insert-name');
    startButton = document.getElementById('start-button');

    inputElement.addEventListener('keypress', inputHandler);
    startButton.addEventListener('click', destroySplash);

    scores.createBoard(ulElement, createHtml);
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

    function endCallback(){
      destroyCanvas();
    }
    game = new Game(name, canvas, ctx, maxWidth, maxHeight, endCallback);    
  } 

  // END GAME =============================================

  function endGame(){
    var pScore = game.player.score;
    var pName = game.player.name;

    endGameElement = createHtml(`<div id="endgame-container">
      <h1>Game Over</h1>
      <p>You scored
        <span id="final-score"></span> points.</p>
      <button id="restart-button">Back to Start</button>
    </div>`);
    mainContentElement.appendChild(endGameElement);
    
    restartButton = document.getElementById('restart-button');
    finalScore = document.getElementById('final-score');
    

    finalScore.innerText = game.player.score;

    scores.store(pName, pScore);
    
    restartButton.addEventListener('click', destroyEndGame);
  }
  buildSplash();
}

// LOAD ==================================================

window.addEventListener('load', main);





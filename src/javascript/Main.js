'use strict'

function main(){
  var game;
  var canvas;
  var maxWidth;
  var maxHeight;
  var ctx;

  // DOM ELEMENTS ==========================================

  var mainContentElement = document.getElementById('content');
  var startButton;
  var restartButton;
  var splashElement;
  var canvasElement;
  var endGameElement;
  var scoreElement;
  var audioElement;

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

  // Get mouse position inside canvas =====================

  function getMousePos(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  }

  // =======================================================
  // SPLASH SCREEN =========================================

  function buildSplash() {
    splashElement = createHtml(`<div id="splash-container">   
      <h1>Game Title</h1>
      <p>Help Kiwi avoid the cucumbers by moving the pointer over the game screen.</p>
      <button id="start-button">Start Game</button>
  </div>`);

    audioElement = createHtml();

    mainContentElement.appendChild(splashElement);
    startButton = document.getElementById('start-button');

    startButton.addEventListener('click', destroySplash);
  }

  // GAME SCREEN ===========================================
  function updatePosition() {
    var mousePos = getMousePos(canvas, event);

    game.player.updatePosition(mousePos);
  }

  function gameScreen(){
    canvasElement = createHtml(`<canvas id="canvas" width="1000" height="800"></canvas>`);
    mainContentElement.appendChild(canvasElement);
    
    canvas = document.getElementById('canvas');
    maxWidth = Number(canvas.getAttribute('width'));
    maxHeight = Number(canvas.getAttribute('height'));
    ctx = canvas.getContext('2d');

    game = new Game(ctx, maxWidth, maxHeight);
    
    game.end(function(){
      destroyCanvas();
    });

    game.makeItRain();  
    canvas.addEventListener('mousemove', updatePosition);
    
    game.draw();
  } 

  // END GAME =============================================

  function endGame(){
    endGameElement = createHtml(`<div id="endgame-container">
      <h1>Game Over</h1>
      <p>You scored
        <span id="score"></span> points.</p>
      <button id="restart-button">Back to Start</button>
    </div>`);

    mainContentElement.appendChild(endGameElement);
    restartButton = document.getElementById('restart-button');
    scoreElement = document.getElementById('score');
    scoreElement.innerText = game.player.score;

    restartButton.addEventListener('click', destroyEndGame);
  }
  
  buildSplash();
}

// LOAD ==================================================

window.addEventListener('load', main);





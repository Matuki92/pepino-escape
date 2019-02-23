'use strict'

const main = () => {

  // DOM ELEMENTS ==========================================

  const mainContentElement = document.getElementById('content'),
    musicSwitch = document.getElementById('music'),
    audioElement = document.getElementById('audio-element'),
    ulElement = document.getElementById('score-board');

  let name,
    game,

    inputElement,
    startButton,

    restartButton,
    finalScore,

    splashElement,
    canvasElement,
    endGameElement;

  // BACKGROUND MUSIC =====================================

  const handleMusicSwitch = () => {
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

  const createHtml = html => {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.children[0];
  }

  // DESTROY FUNCTIONS =====================================

  const destroySplash = () => {
    startButton.removeEventListener('click', destroySplash);
    splashElement.remove();
    gameScreen();
  };
  const destroyCanvas = () => {
    canvas.removeEventListener('mousemove', destroyCanvas);
    canvasElement.remove();
    endGame();
  }
  const destroyEndGame = () => {
    restartButton.removeEventListener('click', destroyEndGame);
    endGameElement.remove();
    buildSplash();
  }

  // =======================================================
  // SPLASH SCREEN =========================================
  const scores = new Scores(ulElement, createHtml);

  const inputHandler = (event) => {
    if (event.key == 'Enter' && inputElement.value != ''){
      name = inputElement.value;
      startButton.setAttribute('style','display:default');
      inputElement.removeEventListener('keypress', inputHandler);
      inputElement.setAttribute('style', 'display:none');
    }
  }

  const buildSplash = () => {
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

  const gameScreen = () => {
    audioElement.play();
    canvasElement = createHtml(`<canvas id="canvas" width="1000" height="800"></canvas>`);
    mainContentElement.appendChild(canvasElement);

    // CANVAS ==
    const canvas = document.getElementById('canvas'),
      maxWidth = Number(canvas.getAttribute('width')),
      maxHeight = Number(canvas.getAttribute('height')),
      ctx = canvas.getContext('2d');
    // ========

    const endCallback = () => {
      destroyCanvas();
    }
    game = new Game(name, canvas, ctx, maxWidth, maxHeight, endCallback);
  }

  // END GAME =============================================

  const endGame = () => {
    const pScore = game.player.score,
      pName = game.player.name;

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





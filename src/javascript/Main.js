'use strict'

const main = (loaded_data) => {

  // DOM ELEMENTS ==========================================

  const main_content_element = document.getElementById('content'),
    music_switch = document.getElementById('music'),
    audio_element = document.getElementById('audio-element'),
    ul_element = document.getElementById('score-board');

  let name,
    game,

    input_element,
    start_button,

    restart_button,
    final_score,

    splash_element,
    canvas_element,
    end_game_element;

  // BACKGROUND MUSIC =====================================

  const handle_music_switch = () => {
    if (music_switch.innerText == 'Sound Off'){
      music_switch.innerText = 'Sound On';
      audio_element.muted = false;
    }
    else{
      music_switch.innerText = 'Sound Off';
      audio_element.muted = true;
    }
  }

  music_switch.addEventListener('click', handle_music_switch);

  // HTML ==================================================

  const create_html = html => {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.children[0];
  }

  // DESTROY FUNCTIONS =====================================

  const destroy_splash = () => {
    start_button.removeEventListener('click', destroy_splash);
    splash_element.remove();
    game_screen();
  };
  const destroy_canvas = () => {
    canvas.removeEventListener('mousemove', destroy_canvas);
    audio_element.pause();
    audio_element.currentTime = 0;
    canvas_element.remove();
    end_game();
  }
  const destroy_end_game = () => {
    restart_button.removeEventListener('click', destroy_end_game);
    end_game_element.remove();
    build_splash();
  }

  // =======================================================
  // SPLASH SCREEN =========================================
  const scores = new Scores(ul_element, create_html);

  const input_handler = (event) => {
    if (event.key == 'Enter' && input_element.value != ''){
      name = input_element.value;
      start_button.setAttribute('style','display:default');
      input_element.removeEventListener('keypress', input_handler);
      input_element.setAttribute('style', 'display:none');
    }
  }

  const build_splash = () => {
    splash_element = create_html(`<div id="splash-container">
      <h1>Pepino Escape</h1>
      <p>Cucumbers have invaded the planet <br> forcing Kiwi to leave. <br>
      Avoid them by moving the pointer over the game screen.</p>
      <input id="insert-name" placeholder="Insert Your Name Here" style="display:default">
      <button id="start-button" style="display:none">Start Game</button>
  </div>`);
    main_content_element.appendChild(splash_element);

    input_element = document.getElementById('insert-name');
    start_button = document.getElementById('start-button');
    input_element.addEventListener('keypress', input_handler);
    start_button.addEventListener('click', destroy_splash);

    scores.create_board(ul_element, create_html);
  }

  // GAME SCREEN ===========================================

  // MOUSE POS INSIDE CANVAS =====================

  const game_screen = () => {
    audio_element.play();
    canvas_element = create_html(`<canvas id="canvas" width="1000" height="800"></canvas>`);
    main_content_element.appendChild(canvas_element);

    // CANVAS ==
    const canvas = document.getElementById('canvas'),
      max_width = Number(canvas.getAttribute('width')),
      max_height = Number(canvas.getAttribute('height')),
      ctx = canvas.getContext('2d');
    // ========

    const end_callback = () => {
      destroy_canvas();
    }
    game = new Game(name, canvas, ctx, max_width, max_height, end_callback, loaded_data.images, loaded_data.sounds);
  }

  // END GAME =============================================

  const end_game = () => {
    const p_score = game.player.score,
      p_name = game.player.name;

    end_game_element = create_html(`<div id="endgame-container">
      <h1>Game Over</h1>
      <p>You scored
        <span id="final-score"></span> points.</p>
      <button id="restart-button">Back to Start</button>
    </div>`);
    main_content_element.appendChild(end_game_element);

    restart_button = document.getElementById('restart-button');
    final_score = document.getElementById('final-score');
    final_score.innerText = game.player.score;
    scores.store(p_name, p_score);
    restart_button.addEventListener('click', destroy_end_game);
  }

  build_splash();
}

// LOAD ==================================================

window.onload = preload(main);





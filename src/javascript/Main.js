'use strict'

const main = (loaded_data) => {

  // DOM ELEMENTS ==========================================

  const main_content_element = document.getElementById('content'),
    music_switch = document.getElementById('music'),
    audio_element = document.getElementById('audio_element'),
    ul_element = document.getElementById('score_board');

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
    if (music_switch.innerText == 'Sound Off') {
      music_switch.innerText = 'Sound On';
      audio_element.muted = false;
    }
    else {
      music_switch.innerText = 'Sound Off';
      audio_element.muted = true;
    }
  }

  music_switch.addEventListener('click', handle_music_switch);

  // HTML ==================================================

  window.create_html = html => {
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

  const input_handler = (event) => {
    if (event.key == 'Enter' && input_element.value != ''){
      if (input_element.value.length > 10) {
        input_element.value = '';
        input_element.placeholder = 'Name is too long';
      } else {
        name = input_element.value;
        start_button.setAttribute('style','display:default');
        input_element.removeEventListener('keypress', input_handler);
        input_element.setAttribute('style', 'display:none');
      }
    }
  }

  const build_splash = () => {
    splash_element = create_html(`<div id="splash_container">
    <h1>Pepino Escape</h1>
    <p>Cucumbers have invaded the planet <br> forcing Kiwi to leave. <br>
    Avoid them by moving the pointer over the game screen.</p>
    <input id="insert_name" placeholder="Insert name and press Enter" style="display:default">
    <button id="start_button" style="display:none">Start Game</button>
  </div>`);
    main_content_element.appendChild(splash_element);

    input_element = document.getElementById('insert_name');
    start_button = document.getElementById('start_button');
    input_element.addEventListener('keypress', input_handler);
    start_button.addEventListener('click', destroy_splash);

    // get stored scores (function from Scores.js)
    draw_scores();
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

    end_game_element = create_html(`<div id="endgame_container">
      <h1>Game Over</h1>
      <p>You scored
        <span id="final_score"></span> points.</p>
      <button id="restart_button">Back to Start</button>
    </div>`);
    main_content_element.appendChild(end_game_element);

    restart_button = document.getElementById('restart_button');
    final_score = document.getElementById('final_score');
    final_score.innerText = game.player.score;

    if (window.localStorage[p_name]) {
      window.localStorage[p_name] = p_score;
    } else {
      window.localStorage.setItem(`pep_${p_name}`, p_score);
    }
    
    restart_button.addEventListener('click', destroy_end_game);
  }

  build_splash();
}

// LOAD ==================================================

window.onload = preload(main);





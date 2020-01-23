'use strict'

// TODO: Remove this useless way to retrieve stored scores
class Scores{

  constructor(ul_element, create_html) {
    this.storage = window.localStorage;

    this.ul_element = ul_element;
    this.create_html = create_html;
  }

  create_board() {
    this.clean_board(this.ul_element);
    this.sort_highest();
  }

  store(p_score, p_name) {
    this.storage.setItem(p_name, p_score);
  }

  clean_board() {
    while (this.ul_element.firstChild){
      this.ul_element.firstChild.remove();
    }
  }

  sort_highest() {
    let keys = Object.keys(this.storage),
    i, len = keys.length;

    const sorted = keys.sort(function(a, b){
      return b.length - a.length || a < b;
    });

    for (i = 0; i < 10; i++) {
      const k = sorted[i];

      this.draw_sorted(k, this.storage[k]);
    }
  }

  draw_sorted(k, key) {
    const score_board = this.create_html('<li class="score-row"></li>');
    if (key){
      this.ul_element.appendChild(score_board);
      score_board.innerText = key + ' = ' + k + ' Pts';
    }
  }
}
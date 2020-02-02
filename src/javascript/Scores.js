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

  store(p_name, p_score) {
    if (!p_name.match(/test/i)) {
      this.storage.setItem(p_name, p_score);
    }
  }

  clean_board() {
    while (this.ul_element.firstChild){
      this.ul_element.firstChild.remove();
    }
  }

  sort_highest() {
    const keys = Object.keys(this.storage).map(key => parseInt(key, 10));

    const sorted = keys.sort((a, b) => a - b).reverse();

    for (let i = 0; i < 10; i++) {
      const k = sorted[i];

      this.draw_sorted(k, this.storage[k]);
    }
  }

  draw_sorted(k, key) {
    const score_board = this.create_html('<li class="score_row"></li>');
    if (key){
      this.ul_element.appendChild(score_board);
      score_board.innerText = key + ' = ' + k + ' Pts';
    }
  }
}
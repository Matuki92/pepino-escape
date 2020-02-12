const draw_scores = () => {
  const storage = window.localStorage;
  const score_board_el = document.getElementById('score_board');

  // get keys from saved scores
  const filtered_keys = Object.keys(storage).filter(key => (key || '').match(/pep_/));

  if (!filtered_keys.length) { return; }

  // get the score that belongs to the name
  const scores = filtered_keys.map((key) => {
    return {
      name: key.split('pep_')[1],
      score: storage.getItem(key),
    };
  });

  // sort scores by number (descending)
  const sorted_scores = scores.sort((a, b) => a.score - b.score).reverse().splice(0, 9);

  // clear board
  Array.from(score_board_el.childNodes).forEach(el => el.remove());

  // Draw scores
  for (let i = 0; i < sorted_scores.length; i += 1) {
    const score = sorted_scores[i];

    const score_el = window.create_html(`
      <li class="score_row">
        ${score.name} = ${score.score} Pts
      </li>
    `);

    score_board_el.append(score_el);
  }
};
'use strict'

function Scores(ulElement, createHtml){
  var self = this;

  self.storage = window.localStorage;

  self.ulElement = ulElement;
  self.createHtml = createHtml;
}


Scores.prototype.createBoard = function(){
  var self = this;

  self.cleanBoard(self.ulElement);

  self.sortHighest();
}


Scores.prototype.store = function(pScore, pName){
  var self = this;

  self.storage.setItem(pName, pScore);
}


Scores.prototype.cleanBoard = function(){
  var self = this;

  while (self.ulElement.firstChild){
    self.ulElement.firstChild.remove();
  }
}


Scores.prototype.sortHighest = function(){
  var self = this;

    var keys = Object.keys(self.storage),
    i, len = keys.length;

  var sorted = keys.sort(function(a, b){
    return b.length - a.length || a < b;
  });

  for (i = 0; i < 10; i++) {
    var k = sorted[i];
    self.drawSorted(k, self.storage[k]);
  }
} 


Scores.prototype.drawSorted = function(k, key){
  var self = this;

  var scoreBoard = self.createHtml('<li class="score-row"></li>');
  if (!key.includes('test')){
    self.ulElement.appendChild(scoreBoard);
    scoreBoard.innerText = key + ' = ' + k + ' Pts'; 
  }
}
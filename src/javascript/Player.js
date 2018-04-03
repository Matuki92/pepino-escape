'use strict'

function Player(name, x, y){
  var self = this;

  self.name = name;
  self.x = x;
  self.y = y;

  self.width = 120;
  self.height = 300;
  self.lives = 3;
  self.score = 0;

  self.getImages();
}

Player.prototype.updatePosition = function(position){
  var self = this;

  self.x = position.x;
  self.y = position.y;
}

Player.prototype.getImages = function() {
  var self = this;

  self.image = new Image();
  self.image.src = './images/player-kiwi.png';

  self.playerFire = new Image();
  self.playerFire.src = './images/rocket-fire.gif';
}
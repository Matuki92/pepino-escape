'use strict'

function Obstacle(maxWidth, maxHeight){
  var self = this;

  self.width = 50;
  self.height = 150;

  self.startPosition = 0 - self.height / 2;

  self.x = null;
  self.y = self.startPosition;

  self.maxWidth = maxWidth;
  self.maxHeight = maxHeight;

  self.randomX();
  self.getImages();
}

Obstacle.prototype.update = function () {
  var self = this;

  if (self.y - self.height /2 >= self.maxHeight){
    self.y = self.startPosition;
    self.randomX();

    return true;
  }
  self.y += 12;
}

Obstacle.prototype.randomX = function(){
  var self = this;

  self.x = Math.floor(Math.random()*self.maxWidth);
}

Obstacle.prototype.getImages = function () {
  var self = this;

  self.image = new Image();
  self.image.src = './images/cucumber.png';
}


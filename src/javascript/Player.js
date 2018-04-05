'use strict'

function Player(name, canvas, ctx, x, y){
  var self = this;

  self.name = name;
  self.canvas = canvas;
  self.ctx = ctx;
  self.x = x;
  self.y = y;

  self.width = 120;
  self.height = 300;
  self.lives = 3;
  self.score = 0;

  self.meow = new Audio('./sound/meow.wav');

  self.playerFireAnimationFrame = 0;

  self.getImages();
}

Player.prototype.getImages = function() {
  var self = this;

  self.image = new Image();
  self.image.src = './images/player-kiwi.png';

  self.fireAnim = new Image();
  self.fireAnim.src = './images/fire-sprite.png';
}


Player.prototype.update = function(){
  var self = this;

  function handleMousePos(event){
    var rect = self.canvas.getBoundingClientRect();
    self.x = event.clientX - rect.left;
    self.y = event.clientY - rect.top;
    self.canvas.removeEventListener('mousemove', handleMousePos);
  } 

  self.canvas.addEventListener('mousemove', handleMousePos);
}

Player.prototype.drawFire = function () {
  var self = this;

  var cutPosition = self.playerFireAnimationFrame * 140;
  var fireX = self.x - 30;
  var fireY = self.y + 85;

  if (self.playerFireAnimationFrame === 11) {
    self.playerFireAnimationFrame = 0;
  }

  self.ctx.drawImage(self.fireAnim,
    cutPosition, 0, 140, 500,
    fireX, fireY, 50, 200);

  self.playerFireAnimationFrame++;
}

Player.prototype.draw = function(){
  var self = this;

  self.update();
  self.ctx.drawImage(self.image,
    self.x - self.width / 2,
    self.y - self.height / 2,
    self.width, self.height);
  self.drawFire();
}
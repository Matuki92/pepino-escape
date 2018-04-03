'use strict'

function Game(ctx, maxWidth, maxHeight){
  var self = this;

  self.ctx = ctx;
  self.maxWidth = maxWidth;
  self.maxHeight = maxHeight;
  
  self.player = new Player(maxWidth/2, maxHeight/2);
  self.obstacles = [];
}

Game.prototype.clearScreen = function(){
  var self = this;
  
  self.ctx.clearRect(0, 0, self.maxWidth, self.maxHeight);
}

Game.prototype.drawPlayer = function(){
  var self = this;

  self.ctx.drawImage(self.player.image,
      self.player.x - self.player.width /2,
      self.player.y - self.player.height /2,
      self.player.width, self.player.height);
}


Game.prototype.drawObstacle = function(obstacle){
  var self = this;

  self.ctx.drawImage(obstacle.image,
            obstacle.x - obstacle.width / 2,
            obstacle.y - obstacle.height / 2,
            obstacle.width, obstacle.height);
}


Game.prototype.updateStats = function(){
  var self = this;

  self.ctx.fillStyle = 'white';
  self.ctx.font = '40px Arial';
  self.ctx.fillText('Lives: ' + self.player.lives, 30, 40);
  self.ctx.fillText('Score: ' + self.player.score, self.maxWidth - 200, 40);

}


Game.prototype.draw = function(){
  var self = this;
  
  if (self.player.lives >= 0){

    self.clearScreen();
    self.updateStats();

    self.obstacles.forEach(function(obstacle){
      self.collisionCheck(obstacle);

      if (obstacle.update()){
        self.player.score += 10;
      }
     
      self.drawObstacle(obstacle);
    });

    self.drawPlayer();

    window.requestAnimationFrame(function(){
      self.draw(event);
    });
  }
  else{
    window.clearInterval(self.intervalId);
    self.callback();
  }
}

Game.prototype.end = function(callback){
  var self = this;

  self.callback = callback;
}


Game.prototype.makeItRain = function(){
  var self = this;

  function makeObstacle(){

    var obstacle = new Obstacle(self.maxWidth, self.maxHeight);
    self.obstacles.push(obstacle);

    if (self.obstacles.length === 10) {
      window.clearInterval(self.intervalId);
    }
  }

  self.intervalId = window.setInterval(makeObstacle, 3000);
}


Game.prototype.collisionCheck = function (obstacle) {
  var self = this;

  var collidesRight = obstacle.x - obstacle.width  / 2 + 35 < self.player.x + self.player.width / 2;
  var collidesLeft = obstacle.x + obstacle.width / 2 - 15> self.player.x - self.player.width / 2;
  var collidesTop = obstacle.y - obstacle.height / 2  + 15 < self.player.y + self.player.height / 2;
  var collidesBottom = obstacle.y + obstacle.height / 2 - 15 > self.player.y - self.player.height / 2;

  if (collidesLeft && collidesRight && collidesTop && collidesBottom){
       obstacle.randomX();
       obstacle.y = 0;
       self.player.lives--;

    self.ctx.fillStyle = 'rgb(143, 0, 0)';
       self.ctx.fillRect(0, 0, self.maxWidth, self.maxHeight);
  }
}
  


'use strict'

class Game{

  constructor(name, canvas, ctx, maxWidth, maxHeight, callback) {
    this.ctx = ctx;
    this.maxWidth = maxWidth;
    this.maxHeight = maxHeight;
    this.callback = callback;

    this.player = new Player( name, canvas, ctx, maxWidth/2, maxHeight/2);

    this.obstacles = [];

    this.playerFireAnimationFrame = 0;

    this.makeItRain();
    this.frame();
  }

  // DRAW FUNCTIONS ==============================================

  clearScreen() {
    this.ctx.clearRect(0, 0, this.maxWidth, this.maxHeight);
  }

  drawStats() {
    this.ctx.fillStyle = 'white';
    this.ctx.font = '40px Arial';
    this.ctx.fillText('Lives: ' + this.player.lives, 30, 40);
    this.ctx.fillText('Score: ' + this.player.score, this.maxWidth - 230, 40);
  }

  draw() {
    this.clearScreen();
    this.obstacles.forEach((obstacle) => {
      this.collisionCheck(obstacle);

      if (obstacle.update()) {
        this.player.score += 10;
      }

      obstacle.draw();
    });

    this.player.draw();
    this.drawStats();
  }

  // MAIN FRAMES FUNCTION =============================================
  frame() {
    if (this.player.lives >= 0){
      this.draw();
      window.requestAnimationFrame(() => {
        this.frame();
      });
    }
    else{
      window.clearInterval(this.intervalId);
      this.player.meow.pause();
      this.callback();
    }
  }

  // OBSTACLES ========================================================

  makeItRain() {
    const makeObstacle = () => {
      const obstacle = new Obstacle(this.ctx, this.maxWidth, this.maxHeight);
      this.obstacles.push(obstacle);

      if (this.obstacles.length === 10) {
        window.clearInterval(this.intervalId);
      }
    }

    this.intervalId = window.setInterval(makeObstacle, 3000);
  }

  // COLLISIONS =========================================================

  collisionCheck(obstacle) {
    const collidesRight = obstacle.x - obstacle.width  / 2 + 35 < this.player.x + this.player.width / 2;
    const collidesLeft = obstacle.x + obstacle.width / 2 - 15> this.player.x - this.player.width / 2;
    const collidesTop = obstacle.y - obstacle.height / 2  + 15 < this.player.y + this.player.height / 2;
    const collidesBottom = obstacle.y + obstacle.height / 2 - 15 > this.player.y - this.player.height / 2;

    if (collidesLeft && collidesRight && collidesTop && collidesBottom){
      obstacle.x = obstacle.randomX();
      obstacle.y = obstacle.startPosition;
      this.player.lives--;
      this.player.meow.play();
      this.player.meow.currentTime = 0.2;

      this.ctx.fillStyle = 'rgb(143, 0, 0)';
      this.ctx.fillRect(0, 0, this.maxWidth, this.maxHeight);
    }
  }

  // END =================================================================

  end(callback) {
    this.callback = callback;
  }




}
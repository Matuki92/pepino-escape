'use strict'

class Obstacle {

  constructor(ctx, maxWidth, maxHeight) {
    this.ctx = ctx;
    this.width = 50;
    this.height = 150;
    this.speed = 6;

    this.startPosition = 0 - this.height / 2;

    this.maxWidth = maxWidth;
    this.maxHeight = maxHeight;

    this.x = this.randomX();
    this.y = this.startPosition;

    this.getImages();
  }

  getImages() {
    this.image = new Image();
    this.image.src = './images/cucumber.png';
  }

  update() {
    if (this.y > this.maxHeight){
      this.y = this.startPosition;
      this.x = this.randomX();

      this.speed += 0.5;
      return true;
    }

    this.y += this.speed;
  }

  randomX(){
    return Math.floor(Math.random()*this.maxWidth);
  }

  draw(){
    this.ctx.drawImage(this.image,
      this.x - this.width / 2,
      this.y - this.height / 2,
      this.width, this.height);
  }
}
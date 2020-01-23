'use strict'

class Obstacle {

  constructor(ctx, max_width, max_height, images) {
    this.ctx = ctx;
    this.width = 50;
    this.height = 150;
    this.speed = 6;

    this.start_position = 0 - this.height / 2;

    this.max_width = max_width;
    this.max_height = max_height;
    this.images = images;

    this.x = this.random_x();
    this.y = this.start_position;

    this.get_loaded_data();
  }

  get_loaded_data() {
    // Set images
    this.image = this.images.filter(img => img.target === 'obstacle')[0].image;
  }

  update() {
    if (this.y > this.max_height){
      this.y = this.start_position;
      this.x = this.random_x();

      this.speed += 0.5;
      return true;
    }

    this.y += this.speed;
  }

  random_x(){
    return Math.floor(Math.random()*this.max_width);
  }

  draw(){
    this.ctx.drawImage(this.image,
      this.x - this.width / 2,
      this.y - this.height / 2,
      this.width, this.height);
  }
}
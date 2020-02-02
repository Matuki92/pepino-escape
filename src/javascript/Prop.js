'use strict'

class Prop {

  constructor(ctx, max_width, max_height, images, width, height, speed, type) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.speed;
    this.type;

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
    this.image = this.images.filter(img => img.target === this.type)[0].image;
  }

  random_x() {
    return Math.floor(Math.random() * this.max_width);
  }

  draw() {
    this.ctx.drawImage(this.image,
      this.x - this.width / 2,
      this.y - this.height / 2,
      this.width, this.height);
  }
}
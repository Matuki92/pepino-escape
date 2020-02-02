'use strict'

class Tuna_can extends Prop {

  constructor(ctx, max_width, max_height, images) {
    super(ctx, max_width, max_height, images, 80, 80, 4, 'tuna_can');
  }

  update() {
    if (this.collided || this.y > this.max_height) {
      return true;
    }

    this.y += this.speed;
  }
}
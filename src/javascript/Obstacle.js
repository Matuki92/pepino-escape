'use strict'

class Obstacle extends Prop {

  constructor(ctx, max_width, max_height, images) {
    super(ctx, max_width, max_height, images, 50, 150, 6, 'obstacle');
  }

  update() {
    if (this.y > this.max_height){
      this.y = this.start_position;
      this.x = this.random_x();

      this.speed += 0.1;
      return true;
    }

    this.y += this.speed;
  }
}
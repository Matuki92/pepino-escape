'use strict'

class Game{

  constructor(name, canvas, ctx, max_width, max_height, callback, images, sounds) {
    this.ctx = ctx;
    this.max_width = max_width;
    this.max_height = max_height;
    this.callback = callback;
    this.images = images;
    this.sounds = sounds;

    this.player = new Player(name, canvas, ctx, max_width/2, max_height/2, images, sounds);

    this.obstacles = [];

    this.player_fire_anim_frame = 0;

    this.mate_it_rain();
    this.frame();
  }

  // DRAW FUNCTIONS ==============================================

  clear_screen() {
    this.ctx.clearRect(0, 0, this.max_width, this.max_height);
  }

  draw_stats() {
    this.ctx.fillStyle = 'white';
    this.ctx.font = '40px Arial';
    this.ctx.fillText('Lives: ' + this.player.lives, 30, 40);
    this.ctx.fillText('Score: ' + this.player.score, this.max_width - 230, 40);
  }

  draw() {
    this.clear_screen();
    this.obstacles.forEach((obstacle) => {
      this.collision_check(obstacle);

      if (obstacle.update()) {
        this.player.score += 10;
      }

      obstacle.draw();
    });

    this.player.draw();
    this.draw_stats();
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
      window.clearInterval(this.interval_id);
      this.player.meow.pause();
      this.callback();
    }
  }

  // OBSTACLES ========================================================

  mate_it_rain() {
    const make_obstacle = () => {
      const obstacle = new Obstacle(this.ctx, this.max_width, this.max_height, this.images);
      this.obstacles.push(obstacle);

      if (this.obstacles.length === 10) {
        window.clearInterval(this.interval_id);
      }
    }

    this.interval_id = window.setInterval(make_obstacle, 3000);
  }

  // COLLISIONS =========================================================

  collision_check(obstacle) {
    const collides_right = obstacle.x - obstacle.width  / 2 + 35 < this.player.x + this.player.width / 2;
    const collides_left = obstacle.x + obstacle.width / 2 - 15> this.player.x - this.player.width / 2;
    const collides_top = obstacle.y - obstacle.height / 2  + 15 < this.player.y + this.player.height / 2;
    const collides_bottom = obstacle.y + obstacle.height / 2 - 15 > this.player.y - this.player.height / 2;

    if (collides_left && collides_right && collides_top && collides_bottom){
      obstacle.x = obstacle.random_x();
      obstacle.y = obstacle.start_position;
      this.player.lives--;

      if (!document.querySelector('#audio-element').muted) {
        this.player.meow.play();
        this.player.meow.currentTime = 0.2;
      }

      this.ctx.fillStyle = 'rgb(143, 0, 0)';
      this.ctx.fillRect(0, 0, this.max_width, this.max_height);
    }
  }

  // END =================================================================

  end(callback) {
    this.callback = callback;
  }
}
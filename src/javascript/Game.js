'use strict'

class Game {

  constructor(name, canvas, ctx, max_width, max_height, callback, images, sounds) {
    this.ctx = ctx;
    this.max_width = max_width;
    this.max_height = max_height;
    this.callback = callback;
    this.images = images;
    this.sounds = sounds;
    this.canvas = canvas;

    this.player = new Player(name, canvas, ctx, max_width/2, max_height/2, images, sounds);

    this.obstacles = [];
    this.powerup;

    this.player_fire_anim_frame = 0;

    this.init();
  }
  
  init() {
    const bg_stars_1 = this.images.filter(img => img.target === 'bg_space_1')[0].image;
    this.canvas.style.backgroundImage = `url("${bg_stars_1.src}")`;

    this.make_it_rain();
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
    
    if (this.player.score && this.player.score % 200 === 0 && !this.powerup) {
      this.make_powerup();
    }
    
    if (this.powerup) {
      this.collision_check(this.powerup);

      if (this.powerup.update()) {
        this.powerup = undefined;
      } else {
        this.powerup.draw();
      }
    }

    this.player.draw();
    this.draw_stats();
  }

  // MAIN FRAMES FUNCTION =============================================
  frame() {
    if (this.player.lives >= 0) {
      this.draw();
      window.requestAnimationFrame(() => {
        this.frame();
      });
    }
    
    else {
      window.clearInterval(this.interval_id);
      this.player.meow.pause();
      this.callback();
    }
  }

  // OBSTACLES ========================================================

  make_it_rain() {
    const make_obstacle = () => {
      const obstacle = new Obstacle(this.ctx, this.max_width, this.max_height, this.images);
      this.obstacles.push(obstacle);

      if (this.obstacles.length === 8) {
        window.clearInterval(this.interval_id);
      }
    }

    this.interval_id = window.setInterval(make_obstacle, 3000);
  }

  make_powerup() {
    const powerup = new Powerup(this.ctx, this.max_width, this.max_height, this.images);
    this.powerup = powerup;
  }

  // COLLISIONS =========================================================

  collision_check(prop) {
    const collides_right = prop.x - prop.width  / 2 + 35 < this.player.x + this.player.width / 2;
    const collides_left = prop.x + prop.width / 2 - 15> this.player.x - this.player.width / 2;
    const collides_top = prop.y - prop.height / 2  + 15 < this.player.y + this.player.height / 2;
    const collides_bottom = prop.y + prop.height / 2 - 15 > this.player.y - this.player.height / 2;

    if (collides_left && collides_right && collides_top && collides_bottom) {

      if (!document.querySelector('#audio-element').muted) {
        if (prop.type === 'obstacle') {
          this.player.meow.play();
          this.player.meow.currentTime = 0.2;
        } else if (prop.type === 'powerup') {
          this.player.tuna_can.play();
          this.player.tuna_can.currentTime = 0.2;
        }
      }

      // obstacle
      if (prop.type === 'obstacle') {
        prop.x = prop.random_x();
        prop.y = prop.start_position;
        this.player.lives--;
  
        this.ctx.fillStyle = 'rgb(143, 0, 0)';
        this.ctx.fillRect(0, 0, this.max_width, this.max_height);

        // powerup
      } else if (prop.type === 'powerup') {
        this.powerup.collided = true;
        this.player.lives++;

        this.ctx.fillStyle = 'rgb(0, 143, 0)';
        this.ctx.fillRect(0, 0, this.max_width, this.max_height);
      }
    }
  }

  // END =================================================================

  end(callback) {
    this.callback = callback;
  }
}
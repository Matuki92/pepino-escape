'use strict'

class Player {

  constructor(name, canvas, ctx, x, y, images, sounds) {
    this.name = name;
    this.canvas = canvas;
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.images = images;
    this.sounds = sounds;

    this.width = 120;
    this.height = 300;
    this.lives = 3;
    this.score = 0;

    this.player_fire_anim_frame = 0;

    this.get_loaded_data();
  }

  get_loaded_data() {
    // Set images
    this.player_main_image = this.images.filter(img => img.target === 'player_main')[0].image;
    this.player_fire_anim = this.images.filter(img => img.target === 'player_fire')[0].image;

    // Set sounds
    this.meow = this.sounds.filter(snd => snd.target === 'meow')[0].audio;
    this.tuna_can = this.sounds.filter(snd => snd.target === 'tuna_can')[0].audio;
  }

  update() {
    const handle_mouse_pos = (event) => {
        const rect = this.canvas.getBoundingClientRect();
        this.x = event.clientX - rect.left;
        this.y = event.clientY - rect.top;
        this.canvas.removeEventListener('mousemove', handle_mouse_pos);
    }

    this.canvas.addEventListener('mousemove', handle_mouse_pos);
  }

  draw_fire() {
    const cut_position = this.player_fire_anim_frame * 140;
    const fire_x = this.x - 30;
    const fire_y = this.y + 85;

    if (this.player_fire_anim_frame === 11) {
      this.player_fire_anim_frame = 0;
    }

    this.ctx.drawImage(this.player_fire_anim,
      cut_position, 0, 140, 500,
      fire_x, fire_y, 50, 200);

      this.player_fire_anim_frame++;
    }

    draw(){
      this.update();
      this.ctx.drawImage(this.player_main_image,
        this.x - this.width / 2,
        this.y - this.height / 2,
        this.width, this.height);
        this.draw_fire();
      }
    }
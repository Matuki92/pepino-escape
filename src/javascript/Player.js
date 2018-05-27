'use strict'

class Player {

  constructor(name, canvas, ctx, x, y) {
    this.name = name;
    this.canvas = canvas;
    this.ctx = ctx;
    this.x = x;
    this.y = y;

    this.width = 120;
    this.height = 300;
    this.lives = 3;
    this.score = 0;

    this.meow = new Audio('./sound/meow.wav');

    this.playerFireAnimationFrame = 0;

    this.getImages();
  }

  getImages() {
    this.image = new Image();
    this.image.src = './images/player-kiwi.png';

    this.fireAnim = new Image();
    this.fireAnim.src = './images/fire-sprite.png';
  }


  update(){
    const handleMousePos = (event) => {
        const rect = this.canvas.getBoundingClientRect();
        this.x = event.clientX - rect.left;
        this.y = event.clientY - rect.top;
        this.canvas.removeEventListener('mousemove', handleMousePos);
    }

    this.canvas.addEventListener('mousemove', handleMousePos);
  }

  drawFire() {
    const cutPosition = this.playerFireAnimationFrame * 140;
    const fireX = this.x - 30;
    const fireY = this.y + 85;

    if (this.playerFireAnimationFrame === 11) {
      this.playerFireAnimationFrame = 0;
    }

    this.ctx.drawImage(this.fireAnim,
      cutPosition, 0, 140, 500,
      fireX, fireY, 50, 200);

      this.playerFireAnimationFrame++;
    }

    draw(){
      this.update();
      this.ctx.drawImage(this.image,
        this.x - this.width / 2,
        this.y - this.height / 2,
        this.width, this.height);
        this.drawFire();
      }
    }
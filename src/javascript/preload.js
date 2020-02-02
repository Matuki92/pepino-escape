'use strict';

const preload = (start) => {

  const loading_element = document.querySelector('#loading');
  loading_element.style.display = 'block';

  let images_loaded = false;
  let image_error = false;

  let sounds_loaded = false;

  // IMAGES
  const images = [
    {
      target: 'bg_space_1',
      src: './images/bg_loop.gif',
    },
    {
      target: 'obstacle',
      src: './images/cucumber.png',
    },
    {
      target: 'player_main',
      src: './images/player_kiwi.png',
    },
    {
      target: 'player_fire',
      src: './images/fire_sprite.png',
    },
    {
      target: 'tuna_can',
      src: './images/tuna_can.png',
    },
  ];

  images.forEach((i) => {
    i.image = new Image();
    i.image.src = i.src;

    i.loaded = false;
    i.error = false;

    i.image.onload = () => i.loaded = true;
    i.image.onerror = () => i.error = true;
  });

  // AUDIO
  const sounds = [
    {
      target: 'meow',
      src: './sound/meow.wav',
    },
    {
      target: 'tuna_can',
      src: './sound/tuna_can.mp3',
    },
  ]

  sounds.forEach((s) => {
    s.audio = new Audio();
    s.audio.src = s.src;
    s.loaded = false;
    s.audio.oncanplaythrough = () => s.loaded = true;
  });

  const load_checker = setInterval(() => {

    if (!images_loaded) {
      let loaded_images_count = 0;
  
      images.forEach((i) => {
        image_error = i.error || false;
      
        if (i.loaded || i.error) {
          loaded_images_count += 1;
        }
      });
  
      if (loaded_images_count === images.length) {
        images_loaded = true;
      }
    }

    if (!sounds_loaded) {
      let loaded_sounds_count = 0;

      sounds.forEach((s) => {
        if (s.loaded || s.error) {
          loaded_sounds_count += 1;
        }
      });

      if (loaded_sounds_count === sounds.length) {
        sounds_loaded = true;
      }
    }
    
    if (images_loaded && sounds_loaded) {

      const data = {
        sounds,
        images
      }

      clearInterval(load_checker);
      loading_element.style.display = 'none';
      start(data);
    }
  }, 1000);
};
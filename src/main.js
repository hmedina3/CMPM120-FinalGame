/*
Hector Medina
Yongshi Sun

Game title: ?
Date completed: pending...

*/
let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [Menu, Play],
    physics: {
      default: 'arcade',
      arcade: {
        debug: false //debug put boxes over your objects w/ physics and velocity
      }
    }
}

  // reserve keyboard vars
let keyR, keySPACE, keyLEFT, keyRIGHT;

let game = new Phaser.Game(config); 

// define game settings
game.settings = {
  // 30 second timer
  gameTimer: 30000,
  shoe: false,
}
// global music variable
let music;

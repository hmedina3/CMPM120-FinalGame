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
    scene: [Menu, Options, Play],
    physics: {
      default: 'arcade',
      arcade: {
        debug: true //debug put boxes over your objects w/ physics and velocity
      }
    }
}

// score display
let scoreConfig = {
  fontFamily: 'Courier',
  fontSize: '28px',
  backgroundColor: '#a5c3cf',
  color: '#4b88b0',
  align: 'right',
  padding: {
      top: 3,
      bottom: 3,
  },
  fixedWidth: 100
}

// highscore display
let highScoreConfig = {
  fontFamily: 'Impact',
  fontSize: '35px',
  backgroundColor: '#545176',
  color: '#f0eae5',
  align: 'center',
  padding: {
      top: 15,
      bottom: 15,
  },
  fixedWidth: 350
}

// death scene display 
let deathConfig = {
  fontFamily: 'Courier',
  fontSize: '28px',
  backgroundColor: '#6B7177',
  color: '#d4d4d4',
  align: 'center',
  padding: {
      top: 3,
      bottom: 3,
  },
  fixedWidth: 500
}

  // reserve keyboard vars
let keyR, keySPACE, keyLEFT, keyRIGHT, keyUP, keyDOWN;

let game = new Phaser.Game(config); 

// define game settings
game.settings = {
  // 30 second timer
  gameTimer: 30000,
  playerSpeed: 200,
  EnemySpeed: 8,
  gameScore: 0,
  gameHealth: 100,
}
// global music variable
let music;



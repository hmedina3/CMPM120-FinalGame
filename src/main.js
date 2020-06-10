/*
Hector Medina
Yongshi Sun

Game title: Project Ezekiel
Date completed: 6/8/2020

*/

let config = {
    type: Phaser.AUTO,
    width: 800, //640
    height: 600, //480
    scene: [ Menu, Preloader, Play, BossPlay, Options, Credits, Tutorial, Death, Win, Play2],
    physics: {
      default: 'arcade',
      arcade: {
        debug: false //debug put boxes over your objects w/ physics and velocity
      }
    }
}

// global music variables 
let bgMusicPlaying = false;
let music = null;
let globalCount = 3;

// score display
let scoreConfig = {
  fontFamily: 'Courier',
  fontSize: '28px',
  backgroundColor: '#C3C3C3',
  color: 'black',
  align: 'center',
  padding: {
      top: 5,
      bottom: 5,
  },
  fixedWidth: 150
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
let keyR, keySPACE, keyLEFT, keyRIGHT, keyUP, keyDOWN, keyM;

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
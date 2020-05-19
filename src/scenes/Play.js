class Play extends Phaser.Scene {
     
    constructor() {
        super("playScene");
    }

    preload() {
        //background music
        this.load.audio('sfx_music_2', './assets/OrbitalColossus.mp3'); //https://opengameart.org/content/space-boss-battle-theme
        
        // SR-71 - main character
        this.load.image('SR-71','./assets/topdownfighter.png'); //https://opengameart.org/content/one-more-lpc-alternate-character

        //enemy
        this.load.image('enemy','./assets/skull_in_a_ufo_spacecraft.png'); //https://opengameart.org/content/skull-in-a-ufo-spacecraft

        //load sound effect
        //this.load.audio('sfx_power', './assets/powerup.wav'); //https://freesound.org/people/evan.schad/sounds/470768/
        this.load.audio('sfx_laser1', './assets/35684__jobro__laser7.wav'); //https://freesound.org/people/jobro/sounds/35684/ 
        this.load.audio('sfx_laser2', './assets/341236__sharesynth__laser00.wav'); //https://freesound.org/people/sharesynth/sounds/341236/
        
        //load images/tile sprites
        this.load.image('bullets','./assets/spr_bullet_strip.png'); //https://opengameart.org/content/sci-fi-space-simple-bullets 
        this.load.image('lasers','./assets/spr_bullet_strip02.png'); //https://opengameart.org/content/sci-fi-space-simple-bullets 

        //icons for power-ups

        //background picture
        this.load.image('background','./assets/bg_space_seamless.png'); //https://opengameart.org/content/space-background-7 
        
        //spritesheets
        this.load.spritesheet('basicAttack','./assets/spr_bullet_strip.png',{frameWidth: 18, frameheight: 20, startFrame: 0, endFrame: 20});
        
    }

    create()  {
        //place background
        this.background = this.add.tileSprite(0,0,640,480,'background').setOrigin(0,0);

        // background music 
        music = this.sound.add('sfx_music_2');
        let musicConfig = {
            mute: false,
            volume: 1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
          }
        music.play(musicConfig);

          // basic attack anims
        this.anims.create({
            key: 'base',
            frames: this.anims.generateFrameNumbers('basicAttack',{start:0, end: 2, first: 0}),
            framerate: 30,
           repeat: -1,
        });

        // enemies
        this.enemy1 = new Enemy(this, 500, -200,'enemy', 0, 10).setScale(.05,.05).setOrigin(0,0);
        this.physics.add.existing(this.enemy1);
        this.enemy1.body.setSize(1500,1050,0,0);// (x,y,[center])

        this.shooting = false;
        
        // Creating main character and adding to location x y
        this.player = new SR71(this, 100,300,'SR-71').setScale(.10, .10).setOrigin(0,0);
        // adding physics to SR-71
        this.physics.add.existing(this.player);
        // sets physics body
        this.player.body.setSize(1000,500,0,0);
        // spacebar for shooting
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE); 
        // bounded to screen
        this.player.setCollideWorldBounds(true);

        
        // define keyboard keys for movement
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        //keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)

        // create group to hold all our projectiles
        this.projectiles = this.add.group();

    }   // end of create function
   
    update() {
        // moves background
        this.background.tilePositionX += 0.2;

        // spacebar test
        if(Phaser.Input.Keyboard.JustDown(this.spacebar)){
            console.log("Firing for effect!");
            this.basicAttack();
        }
        // update all attacks
        for(let i = 0; i <this.projectiles.getChildren().length; i++){
            var attack = this.projectiles.getChildren()[i];
            attack.update();
        }
        // collision detection for attacks
        for(let k = 0; k < this.projectiles.getChildren().length; k++){
            this.one = this.projectiles.getChildren()[k];
            if(this.physics.overlap(this.one,this.enemy1) == true){
                this.enemy1.destroy();
            }
        }
       
        //generate random number
        let random = Math.random();

        //enemy shoots attacks at random 
        if(random <= .03 && this.shooting == false){ // for every 3% chance, the enemy will shoot a laser
            this.shooting = true;
            this.laser = this.add.tileSprite(this.enemy1.x,this.enemy1.y,90,67,'lasers');
            this.physics.add.existing(this.laser);
            this.laser.body.setSize(35,10,true);

        }

        //moving laser if enemy shot one
        if(this.shooting == true){
            this.laser.x -= 6;
            if(this.laser.x <= 0 && this.shooting == true){
                this.laser.x = -100;
                this.shooting = false;
            }
        }
        
        // move to death scene if health bar is 0
        if(this.timer <= 0 || this.player.y > game.config.height){
            this.gameOver = true;
            music.stop();
            this.add.text(game.config.width/2, game.config.height/6 + 50, 'YOU DIED',highScoreConfig).setOrigin(0.5);
        }
        if(this.physics.overlap(this.player,this.laser) == true){
            console.log("yes");
            //this.gameOver = true;
            music.stop();
            this.add.text(game.config.width/2, game.config.height/8 + 50, 'YOU DIED',highScoreConfig).setOrigin(0.5);
            // No highscore. Prehaps a time completed instead?
            this.add.text(game.config.width/2, game.config.height/4 + 50, 'Current Highscore: ' + localStorage.getItem("highscore"),highScoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 50, '← to Restart or → for Menu', deathConfig).setOrigin(0.5);

            // check for input during death scene
            if(Phaser.Input.Keyboard.JustDown(keyLEFT)){
                this.scene.restart(this.p1Score);
                game.settings.gameTimer = 15000;
                music.stop();
                //this.scene.restart(this.p1Score);
                this.scene.start('playScene');
            }
            if(Phaser.Input.Keyboard.JustDown(keyRIGHT)){
                music.stop();
                this.scene.start('menuScene');
            }
        
        }

        // when the player beats the boss level
        if(this.timer <= 0 || this.player.y > game.config.height){
            this.gameOver = true;
            music.stop();
            this.add.text(game.config.width/2, game.config.height/6 + 50, 'YOU WIN!',highScoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/8 + 50, 'YOU WIN!',highScoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/4 + 50, 'Current Highscore: ' + localStorage.getItem("highscore"),highScoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 50, '← to Restart or → for Menu', deathConfig).setOrigin(0.5);

            // check for input during end scene
            if(Phaser.Input.Keyboard.JustDown(keyLEFT)){
                this.scene.restart(this.p1Score);
                game.settings.gameTimer = 15000;
                music.stop();
                this.scene.start('playScene');
            }
            if(Phaser.Input.Keyboard.JustDown(keyRIGHT)){
                this.scene.start('menuScene');
                music.stop();
            }
        
        }
    
        this.enemy1.update();
        this.player.update();

    } // end of update function. 

    basicAttack(){
      var attack = new BasicAttack(this);
    }
    
   
}
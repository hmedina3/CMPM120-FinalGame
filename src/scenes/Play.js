class Play extends Phaser.Scene {
     
    constructor() {
        super("playScene");
    }

    preload() {
        //background music
        this.load.audio('sfx_music', './assets/OrbitalColossus.mp3'); //https://opengameart.org/content/space-boss-battle-theme
        
        // SR-71 - main character
        this.load.image('SR-71','./assets/topdownfighter.png'); //https://opengameart.org/content/one-more-lpc-alternate-character

        //load sound effect
        //this.load.audio('sfx_power', './assets/powerup.wav'); //https://freesound.org/people/evan.schad/sounds/470768/
        this.load.audio('sfx_laser1', './assets/35684__jobro__laser7.wav'); //https://freesound.org/people/jobro/sounds/35684/ 
        this.load.audio('sfx_laser2', './assets/341236__sharesynth__laser00.wav'); //https://freesound.org/people/sharesynth/sounds/341236/
        
        //load images/tile sprites
        this.load.image('bullets','./assets/spr_bullet_strip.png'); //https://opengameart.org/content/sci-fi-space-simple-bullets 
        this.load.image('lasers','./assets/spr_bullet_strip02.png'); //https://opengameart.org/content/sci-fi-space-simple-bullets 

        //enemy
        this.load.image('enemy','./assets/skull_in_a_ufo_spacecraft.png'); //https://opengameart.org/content/skull-in-a-ufo-spacecraft
        
        //icons for power-ups
        
        //background picture
        this.load.image('background','./assets/bg_space_seamless.png'); //https://opengameart.org/content/space-background-7 
        
        //spritesheets
        //this.load.spritesheet('coin','./assets/spin_coin_big_upscale_strip6.png',{frameWidth: 18, frameheight: 20, startFrame: 0, endFrame: 20});
        
    }

    create()  {
        //place background
        this.background = this.add.tileSprite(0,0,640,480,'background').setOrigin(0,0);

        //(x,y,width,height,key)
        // laser1 = game.add.tileSprite(0,0,200,200,'lasers');
        // laser2 = game.add.tileSprite(200,0,400,200,'lasers');

        // Creating main character and adding to location
        this.player = new SR71(this, 0, 300, 'SR-71').setScale(.15,.15).setOrigin(0,0);
        this.physics.add.existing(this.player); //adding physics to SR-71
        this.player.body.setSize(1000,450,0,0); //setting collision box size

        //enemies
        this.enemy1 = new Enemy(this, 500, -200,'enemy', 0, 10).setScale(.05,.05).setOrigin(0,0);
        this.physics.add.existing(this.enemy1);
        this.enemy1.body.setSize(1500,1050,0,0);// (x,y,[center])

        this.shooting = false;
        
        // define keyboard keys for movement
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        
      
    }   // end of create function
   
    update() {

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
        if(this.physics.overlap(this.player,this.laser) == true){
            console.log("yes");
            //this.gameOver = true;
            //this.bgm.stop();
            this.add.text(game.config.width/2, game.config.height/8 + 50, 'YOU DIED',highScoreConfig).setOrigin(0.5);
            // No highscore. Prehaps a time completed instead?
            this.add.text(game.config.width/2, game.config.height/4 + 50, 'Current Highscore: ' + localStorage.getItem("highscore"),highScoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 50, '← to Restart or → for Menu', deathConfig).setOrigin(0.5);

            // check for input during death scene
            if(Phaser.Input.Keyboard.JustDown(keyLEFT)){
                //this.scene.restart(this.p1Score);
                //game.settings.gameTimer = 15000;
                //this.bgm.destroy();
                this.scene.start('playScene');
            }
            if(Phaser.Input.Keyboard.JustDown(keyRIGHT)){
                this.scene.start('menuScene');
            }
        
        }

        // when the player beats the boss level
        if(this.timer <= 0 || this.player.y > game.config.height){
            this.gameOver = true;
            this.bgm.stop();
            this.add.text(game.config.width/2, game.config.height/8 + 50, 'YOU WIN!',highScoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/4 + 50, 'Current Highscore: ' + localStorage.getItem("highscore"),highScoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 50, '← to Restart or → for Menu', deathConfig).setOrigin(0.5);

            // check for input during end scene
            if(Phaser.Input.Keyboard.JustDown(keyLEFT)){
                this.scene.restart(this.p1Score);
                game.settings.gameTimer = 15000;
                this.bgm.destroy();
                this.scene.start('playScene');
            }
            if(Phaser.Input.Keyboard.JustDown(keyRIGHT)){
                this.scene.start('menuScene');
            }
        
        }

        this.enemy1.update();

    }
      


 }   // end of Play.js
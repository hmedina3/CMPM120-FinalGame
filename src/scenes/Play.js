class Play extends Phaser.Scene {
     
    constructor() {
        super("playScene");
    }

    preload() {
        //background music
        this.load.audio('sfx_music', './assets/OrbitalColossus.mp3'); //https://opengameart.org/content/space-boss-battle-theme 

        //load sound effect
        this.load.audio('sfx_power', './assets/powerup.wav'); //https://freesound.org/people/evan.schad/sounds/470768/
        this.load.audio('sfx_laser1', './assets/35684__jobro__laser7.wav'); //https://freesound.org/people/jobro/sounds/35684/ 
        this.load.audio('sfx_laser2', './assets/341236__sharesynth__laser00.wav'); //https://freesound.org/people/sharesynth/sounds/341236/
        
        //load images/tile sprites
        this.load.image('bullets','./assets/spr_bullet_strip.png'); //https://opengameart.org/content/sci-fi-space-simple-bullets 
        this.load.image('lasers','./assets/spr_bullet_strip02.png'); //https://opengameart.org/content/sci-fi-space-simple-bullets 
        
        //icons for U
        
        //background picture
        this.load.image('background','./assets/bg_space_seamless.png'); //https://opengameart.org/content/space-background-7 
        
        //spritesheets
        //this.load.spritesheet('coin','./assets/spin_coin_big_upscale_strip6.png',{frameWidth: 18, frameheight: 20, startFrame: 0, endFrame: 20});
        
    }

    create()  {

        //(x,y,width,height,key)
        laser1 = game.add.tileSprite(0,0,200,200,'lasers');
        laser2 = game.add.tileSprite(200,0,400,200,'lasers');
        
      
    }   // end of create function
   
    update() {
        
        // move to death scene if health bar is 0
        if(this.timer <= 0 || this.player.y > game.config.height){
            this.gameOver = true;
            this.bgm.stop();
            this.add.text(game.config.width/2, game.config.height/6 + 50, 'YOU DIED',highScoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/4 + 50, 'Current Highscore: ' + localStorage.getItem("highscore"),highScoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 50, '← to Restart or → for Menu', deathConfig).setOrigin(0.5);

            // check for input during death scene
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

        // when the player beats the boss level
        if(this.timer <= 0 || this.player.y > game.config.height){
            this.gameOver = true;
            this.bgm.stop();
            this.add.text(game.config.width/2, game.config.height/6 + 50, 'YOU WIN!',highScoreConfig).setOrigin(0.5);
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

    }
      


 }   // end of Play.js